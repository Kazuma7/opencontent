import { shopSchema, userSchema } from "@/domain/model/user";
import { getIronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";
import { SiweMessage } from "siwe";
import { z } from "zod";

export const siweStatementSchema = z.object({
  email: z.email(),
  displayname: shopSchema.shape.displayName,
  description: shopSchema.shape.description,
});

export type SiweStatement = z.infer<typeof siweStatementSchema>;

export const authSessionDataSchema = z.object({
  siweNonce: z.string().nullable(),
  sessions: z.array(
    z.object({
      siwe: z.custom<SiweMessage>(),
      userId: z.string(),
      walletAddress: z.string(),
    }),
  ),
});

export type AuthSessionData = z.infer<typeof authSessionDataSchema>;

export const defaultAuthSessionData: AuthSessionData = {
  siweNonce: null,
  sessions: [],
};

export const authSessionOptions: SessionOptions = {
  password: process.env.SESSION_KEY as string,
  cookieName: "auth-session-YEAH",

  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export const getSession = async () => {
  const session = await getIronSession<{ data: AuthSessionData }>(
    await cookies(),
    authSessionOptions,
  );

  const parsed = authSessionDataSchema.safeParse(session.data ?? undefined);
  if (!parsed.success) session.data = defaultAuthSessionData;

  return session;
};
