import { userSchema } from "@/domain/model/user";
import type { SessionOptions } from "iron-session";
import { z } from "zod";

export const siweChallengingSessionDataSchema = z.object({
  type: z.literal("siwe-challenging"),
  nonce: z.string(),
});

export type SiweChallengingSessionData = z.infer<
  typeof siweChallengingSessionDataSchema
>;

export const loginedSessionDataSchema = z.object({
  type: z.literal("logined"),
  auth: {
    userId: userSchema.shape.userId,
    walletAddress: userSchema.shape.walletAddress,
  },
});

export type LoginedSessionData = z.infer<typeof loginedSessionDataSchema>;

export const noneSessionDataSchema = z.object({
  type: z.literal("none"),
});

export type NoneSessionData = z.infer<typeof noneSessionDataSchema>;

export const authSessionDataSchema = z.discriminatedUnion("type", [
  siweChallengingSessionDataSchema,
  loginedSessionDataSchema,
  noneSessionDataSchema,
]);

export type AuthSessionData = z.infer<typeof authSessionDataSchema>;

export const authSessionOptions: SessionOptions = {
  password: process.env.SESSION_KEY as string,
  cookieName: "auth-session-YEAH",

  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
