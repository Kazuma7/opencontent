import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import {
  AuthSessionData,
  authSessionDataSchema,
  authSessionOptions,
  defaultAuthSessionData,
  siweStatementSchema,
} from "@/lib/auth";
import { generateNonce, SiweMessage } from "siwe";
import z from "zod";
import { UserRepository } from "@/infrastructure/repository/userRepository";
import { db } from "@/infrastructure/firestore";
import { Address, isAddressEqual } from "viem";

const getSession = async () => {
  const session = await getIronSession<{ data: AuthSessionData }>(
    await cookies(),
    authSessionOptions
  );

  const parsed = authSessionDataSchema.safeParse(session.data ?? undefined);
  if (!parsed.success) session.data = defaultAuthSessionData;

  return session;
};

export const getSessionsAction = async () => {
  "use server";

  const session = await getSession();
  return { sessions: session.data.sessions };
};

export const getNonceAction = async () => {
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
};

export const signInWithEthActionParamsSchema = z.object({
  message: z.string(),
  signature: z.string(),
});

export const signInWithEthAction = async (
  params: z.infer<typeof signInWithEthActionParamsSchema>
) => {
  "use server";

  try {
    const userRepository = new UserRepository(db);

    const { message, signature } =
      signInWithEthActionParamsSchema.parse(params);

    const siweMessage = new SiweMessage(message);
    const fields = await siweMessage.verify({ signature });
    const statement = siweStatementSchema.parse(
      JSON.parse(fields.data.statement ?? "{}")
    );

    const session = await getSession();
    if (session.data.siweNonce !== fields.data.nonce) {
      return { success: false, message: "Invalid nonce" } as const;
    }

    let targetUser = await userRepository.findByWalletAddress(
      fields.data.address
    );
    if (!targetUser) {
      targetUser = {
        userId: crypto.randomUUID(),
        uniqueName: fields.data.address.slice(2),
        email: statement.email,
        walletAddress: fields.data.address,
        displayName: statement.displayname,
        description: statement.description,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await userRepository.save(targetUser);
    }

    const newSessions = [
      ...session.data.sessions.filter((s) => s.userId !== targetUser.userId),
      {
        userId: targetUser.userId,
        walletAddress: targetUser.walletAddress,
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
};

export const logoutActionParams = z.object({
  walletAddress: z.string(),
});

export const logout = async (params: z.infer<typeof logoutActionParams>) => {
  "use server";
  try {
    const session = await getSession();

    session.data.sessions = session.data.sessions.filter(
      (s) =>
        !isAddressEqual(
          params.walletAddress as Address,
          s.walletAddress as Address
        )
    );
    await session.save();
    return { success: true } as const;
  } catch (e) {
    console.error(e);
    return { success: false, message: "Internal Server Error" } as const;
  }
};
