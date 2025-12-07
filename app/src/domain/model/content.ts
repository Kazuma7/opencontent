import { z } from "zod";
import { timestampSchema } from "./base";

// 価格情報スキーマ（複数通貨対応）
export const priceSchema = z.object({
  amount: z.number().positive("金額は正の数である必要があります"),
  currency: z.string().min(1, "通貨は必須です"),
  contractAddress: z.string().min(1, "コントラクトアドレスは必須です"),
  chainId: z.number().int("チェーンIDは整数である必要があります"),
});

// カテゴリスキーマ
export const categorySchema = z.enum([
  "wallpaper",
  "model3d",
  "illustration",
  "ebook",
]);

// 公開フラグスキーマ
export const visibilitySchema = z.enum([
  "draft",
  "public",
  "private",
  "limited",
  "archived",
]);

// コンテンツスキーマ
export const contentSchema = z.object({
  contentId: z.string().min(1, "コンテンツIDは必須です"),
  userId: z.string().min(1, "ユーザーIDは必須です"),
  name: z.string().min(1, "名前は必須です"),
  description: z.string(),
  thumbnailImages: z.array(z.string().url("有効なURLである必要があります")),
  storagePath: z.string().min(1, "ストレージパスは必須です"),
  category: categorySchema,
  subcategory: z.string().optional(),
  tags: z.array(z.string()),
  prices: z.array(priceSchema).min(1, "少なくとも1つの価格情報が必要です"),
  affiliateRate: z
    .number()
    .min(0, "アフィリエイト割合は0以上である必要があります")
    .max(100, "アフィリエイト割合は100以下である必要があります"),
  isAffiliateEnabled: z.boolean(),
  likes: z.number().nonnegative("いいね数は0以上である必要があります"),
  bookmarks: z
    .number()
    .nonnegative("ブックマーク数は0以上である必要があります"),
  isAdult: z.boolean(),
  visibility: visibilitySchema,
  publishStartAt: z.date(),
  publishEndAt: z.date().optional(),
  saleStartAt: z.date(),
  saleEndAt: z.date().optional(),
});

// スキーマ結合
export const contentModelSchema = contentSchema.and(timestampSchema);

// コンテンツ作成用入力スキーマ
export const createContentInputSchema = contentSchema.omit({
  contentId: true, // uuidv7で自動生成
  userId: true, // ctxから取得
  likes: true, // デフォルト: 0
  bookmarks: true, // デフォルト: 0
  affiliateRate: true, // デフォルト: 0
  isAffiliateEnabled: true, // デフォルト: false
  isAdult: true, // デフォルト: false
  visibility: true, // デフォルト: 'draft'
  publishStartAt: true, // デフォルト: new Date()
  saleStartAt: true, // デフォルト: new Date()
});

// 型エクスポート
export type Price = z.infer<typeof priceSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Visibility = z.infer<typeof visibilitySchema>;
export type Content = z.infer<typeof contentSchema>;
export type ContentModel = z.infer<typeof contentModelSchema>;
export type CreateContentInput = z.infer<typeof createContentInputSchema>;
