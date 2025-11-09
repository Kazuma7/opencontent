import { Ctx } from "../model/ctx";
import { Content, Category, ContentModel } from "../model/content";
import { ContentRepository } from "@/infrastructure/repository/contentRepository";
import { db } from "@/infrastructure/firestore";

export class ContentService {
  constructor(private readonly contentRepo: ContentRepository) {}

  async getContents(
    ctx: Ctx,
    filters?: { category?: Category; tags?: string[]; search?: string },
  ): Promise<ContentModel[]> {
    return db.runTransaction(async (tx) => {
      return this.contentRepo.findPublicContents(filters, tx);
    });
  }

  async toggleLike(ctx: Ctx, contentId: string): Promise<void> {
    if (!ctx.userId) {
      throw new Error("Authentication required");
    }

    await db.runTransaction(async (tx) => {
      const content = await this.contentRepo.findById(contentId, tx);
      if (!content) {
        throw new Error("Content not found");
      }

      content.likes += 1;
      await this.contentRepo.save(content, tx);
    });
  }

  async toggleBookmark(ctx: Ctx, contentId: string): Promise<void> {
    if (!ctx.userId) {
      throw new Error("Authentication required");
    }

    await db.runTransaction(async (tx) => {
      const content = await this.contentRepo.findById(contentId, tx);
      if (!content) {
        throw new Error("Content not found");
      }

      content.bookmarks += 1;
      await this.contentRepo.save(content, tx);
    });
  }

  async getContentDetail(ctx: Ctx, contentId: string): Promise<ContentModel> {
    return db.runTransaction(async (tx) => {
      const content = await this.contentRepo.findById(contentId, tx);
      if (!content) {
        throw new Error("Content not found");
      }

      if (content.visibility !== "public" && content.userId !== ctx.userId) {
        throw new Error("Access denied");
      }

      return content;
    });
  }

  async getMyContents(ctx: Ctx): Promise<ContentModel[]> {
    if (!ctx.userId) {
      throw new Error("Authentication required");
    }

    return db.runTransaction(async (tx) => {
      return this.contentRepo.findByUserId(ctx.userId!, tx);
    });
  }

  async updateMyContent(
    ctx: Ctx,
    contentId: string,
    updates: Partial<Content>,
  ): Promise<ContentModel> {
    if (!ctx.userId) {
      throw new Error("Authentication required");
    }

    return db.runTransaction(async (tx) => {
      const content = await this.contentRepo.findById(contentId, tx);
      if (!content) {
        throw new Error("Content not found");
      }

      if (content.userId !== ctx.userId) {
        throw new Error("Access denied");
      }

      const updated = { ...content, ...updates };
      await this.contentRepo.save(updated, tx);

      return updated;
    });
  }
}
