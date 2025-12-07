"use server";

import { getUser } from "thirdweb/wallets";
import { getSession } from "@/lib/auth";
import { generateNonce, SiweMessage } from "siwe";
import z from "zod";
import { UserRepository } from "@/infrastructure/repository/userRepository";
import { db } from "@/infrastructure/firestore";
import { Address, isAddressEqual } from "viem";
import { pickUserName, thirdwebClient } from "@/lib/wagmi";

export async function getSessionsAction() {
  "use server";

  const session = await getSession();
  return { sessions: session.data.sessions };
}

export async function getNonceAction() {
  "use server";
  try {
    const session = await getSession();
    const siweNonce = generateNonce();
    session.data = { ...session.data, siweNonce };

    await session.save();

    return { success: true, siweNonce } as const;
  } catch (e) {
    console.error(e);
    return { success: false, message: "Internal Server Error" } as const;
  }
}

const signInWithEthActionParamsSchema = z.object({
  message: z.string(),
  signature: z.string(),
});

export async function signInWithEthAction(
  params: z.infer<typeof signInWithEthActionParamsSchema>,
) {
  "use server";

  try {
    const userRepository = new UserRepository(db);

    const { message, signature } =
      signInWithEthActionParamsSchema.parse(params);

    const siweMessage = new SiweMessage(message);
    const fields = await siweMessage.verify({ signature });

    const session = await getSession();
    if (session.data.siweNonce !== fields.data.nonce) {
      return { success: false, message: "Invalid nonce" } as const;
    }

    const user = await getUser({
      client: thirdwebClient,
      walletAddress: fields.data.address,
    });
    if (!user) return { success: false, message: "User not found" } as const;
    if (!user.email)
      return { success: false, message: "User email not found" } as const;

    let targetUser = await userRepository.findByWalletAddress(
      fields.data.address,
    );
    if (!targetUser) {
      targetUser = {
        userId: crypto.randomUUID(),
        uniqueName: fields.data.address.slice(2),
        email: user.email,
        walletAddress: fields.data.address,
        displayName: pickUserName(user),
        description: `Account created at ${new Date().toISOString()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await userRepository.save(targetUser);
    }

    const newSessions = [
      ...session.data.sessions.filter((s) => s.userId !== targetUser.userId),
      {
        userId: targetUser.userId,
        walletAddress: targetUser.walletAddress as string,
        siwe: fields.data,
      },
    ];
    session.data.sessions = newSessions;
    session.data.siweNonce = null;

    await session.save();

    return { success: true } as const;
  } catch (e) {
    console.error(e);
    return { success: false, message: "Internal Server Error" } as const;
  }
}

const logoutActionParams = z.object({
  walletAddress: z.string(),
});

export async function logout(params: z.infer<typeof logoutActionParams>) {
  "use server";
  try {
    const session = await getSession();

    session.data.sessions = session.data.sessions.filter(
      (s) =>
        !isAddressEqual(
          params.walletAddress as Address,
          s.walletAddress as Address,
        ),
    );
    await session.save();
    return { success: true } as const;
  } catch (e) {
    console.error(e);
    return { success: false, message: "Internal Server Error" } as const;
  }
}
