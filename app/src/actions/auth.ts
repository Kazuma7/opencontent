import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import {
  AuthSessionData,
  authSessionDataSchema,
  authSessionOptions,
  NoneSessionData,
} from "@/lib/auth";
import { generateNonce } from "siwe";

export const getSession = async () => {
  const session = await getIronSession<{ data: AuthSessionData }>(
    await cookies(),
    authSessionOptions
  );

  const parsed = authSessionDataSchema.safeParse(session.data ?? undefined);
  if (!parsed.success) session.data = { type: "none" };

  return session;
};

export const nonceAction = async () => {
  "use server";

  const session = await getSession();
  const nonce = generateNonce();
  session.data = { type: "siwe-challenging", nonce };

  await session.save();

  return session;
};
