"use server";

import { z } from "zod";
import { actionClient } from "@/lib/actionClient";
import { db } from "@/infrastructure/firestore";
import { UserService } from "@/domain/service/user";
import { UserRepository } from "@/infrastructure/repository/userRepository";

const inputSchema = z.object({});

export const getUserProfile = actionClient
  .inputSchema(inputSchema)
  .action(async ({ ctx }) => {
    const userId = ctx.userId;
    console.log(ctx);
    const userRepository = new UserRepository(db);
    const userService = new UserService(userRepository);
    const repository = await userService.getUserProfile(ctx, userId);
    return repository;
  });
