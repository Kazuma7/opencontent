import { z } from "zod";
import { timestampSchema } from "./base";
import { isAddress } from "viem";

/**
 * ユーザー認証情報スキーマ
 * Firebase AuthのUID、メールアドレス、ウォレットアドレスを管理
 */
export const userSchema = z.object({
  /** ショップ識別子（Firebase Auth UID） */
  userId: z.string().min(1),
  /** 名前(ユニーク名) - 一意な識別子 (例: shop_789) */
  uniqueName: z
    .string()
    .min(1)
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "ユニーク名は小文字英数字とアンダースコアのみ使用できます",
    }),
  /** メールアドレス */
  email: z.email(),
  /** ウォレットアドレス（0x...） */
  walletAddress: z
    .string()
    .refine((a) => isAddress(a), {
      message: "有効なウォレットアドレスを入力してください",
    }),
  /** アイコン画像URL */
  iconImage: z.string().url().optional(),
});

/**
 * ショップ情報スキーマ
 * ショップの表示情報やプロフィールを管理
 */
export const shopSchema = z.object({
  /** 名前(表示名) */
  displayName: z.string().min(1),
  /** 説明 */
  description: z.string(),
  /** 背景画像URL */
  backgroundImage: z.string().url().optional(),
  /** ウェブサイトURL */
  websiteUrl: z.string().url().optional(),
  /** お礼メッセージ */
  thanksMessage: z.string().optional(),
});

/**
 * ユーザーモデルスキーマ
 * UserSchema、ShopSchema、TimestampSchemaを結合
 */
export const userModelSchema = userSchema.and(shopSchema).and(timestampSchema);

/**
 * ユーザー型（認証情報のみ）
 */
export type User = z.infer<typeof userSchema>;

/**
 * ショップ型（ショップ情報のみ）
 */
export type Shop = z.infer<typeof shopSchema>;

/**
 * ユーザーモデル型（全フィールド統合）
 * Firestoreコレクション: users
 * ドキュメントID: Firebase Auth UID (userId)
 */
export type UserModel = z.infer<typeof userModelSchema>;
