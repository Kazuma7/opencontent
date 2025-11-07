import { z } from "zod";

/**
 * タイムスタンプスキーマ
 * Firestoreのドキュメント作成・更新日時を管理
 */
export const timestampSchema = z.object({
  /** 作成日時 */
  createdAt: z.date(),
  /** 更新日時 */
  updatedAt: z.date(),
});
