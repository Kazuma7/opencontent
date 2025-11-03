"use server";

import { z } from "zod";
import { actionClient } from "@/lib/actionClient";

const greetInputSchema = z.object({
  name: z.string().min(1),
});

export const greetUser = actionClient
  .inputSchema(greetInputSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { userId } = ctx;
    const { name } = parsedInput;

    return {
      message: `こんにちは、${name}さん！`,
      userId,
      timestamp: new Date().toISOString(),
    };
  });
