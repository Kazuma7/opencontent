import { shopSchema, userSchema } from "@/domain/model/user";
import type { SessionOptions } from "iron-session";
import { SiweMessage } from "siwe";
import { z } from "zod";

export const siweStatementSchema = z.object({
  email: z.email(),
  displayname: shopSchema.shape.displayName,
  description: shopSchema.shape.description,
});

export const authSessionDataSchema = z.object({
  siweNonce: z.string().nullable(),
  sessions: z.array(
    z.object({
      siwe: z.custom<SiweMessage>(),
      userId: z.string(),
      walletAddress: z.string(),
    })
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
