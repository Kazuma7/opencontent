import { createSafeActionClient } from "next-safe-action";
import { getSession } from "./auth";
import { z } from "zod";

export const actionClient = createSafeActionClient({
  handleServerError(e: Error, _utils): string {
    // const { clientInput, bindArgsClientInputs, metadata, ctx } = utils;
    console.error(e, "Action error");
    return e.message || "Internal Server Error";
  },
})
  .bindArgsSchemas([z.string().optional()])
  .use(async ({ bindArgsClientInputs: [walletAddress], next }) => {
    if (process.env.ENV === "local") {
      return next({
        ctx: {
          userId: "91b62235-e266-4f93-9ab3-a017ebcdc32e",
          walletAddress: "0x08e521b5A2ecC1E1e7cBfa12651c96F58C42C31D",
        },
      });
    }

    if (!walletAddress) {
      throw new Error("Unauthorized: walletAddress is required");
    }

    const session = await getSession();
    if (!session.data.sessions) {
      throw new Error("Unauthorized: session is missing");
    }

    if (session.data.sessions.length === 0) {
      throw new Error("Unauthorized: no active sessions");
    }

    const usedSession = session.data.sessions.find(
      (s) => s.walletAddress == walletAddress,
    );
    if (!usedSession) {
      throw new Error(
        "Unauthorized: walletAddress does not match any active session",
      );
    }

    return next({ ctx: usedSession });
  });
