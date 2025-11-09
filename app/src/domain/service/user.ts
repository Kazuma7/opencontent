import { Ctx } from "../model/ctx";
import { UserModel, Shop } from "../model/user";
import { UserRepository } from "@/infrastructure/repository/userRepository";
import { db } from "@/infrastructure/firestore";

export class UserService {
  constructor(private userRepo: UserRepository) {}

  async getUserProfile(ctx: Ctx, userId: string): Promise<UserModel> {
    return db.runTransaction(async (tx) => {
      const user = await this.userRepo.findById(userId, tx);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    });
  }

  async updateMyProfile(ctx: Ctx, updates: Partial<Shop>): Promise<UserModel> {
    if (!ctx.userId) {
      throw new Error("Unauthorized");
    }

    return db.runTransaction(async (tx) => {
      const user = await this.userRepo.findById(ctx.userId!, tx);
      if (!user) {
        throw new Error("User not found");
      }

      const updated = { ...user, ...updates };
      await this.userRepo.save(updated, tx);
      return updated;
    });
  }
}
