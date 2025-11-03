import { createSafeActionClient } from "next-safe-action";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/constants/auth";
import admin from "firebase-admin";

export const actionClient = createSafeActionClient({
  handleServerError(e: Error, _utils): string {
    // const { clientInput, bindArgsClientInputs, metadata, ctx } = utils;
    console.error(e, "Action error");
    return e.message || "Internal Server Error";
  },
}).use(async ({ next }) => {
  if (process.env.ENV === "local") {
    return next({ ctx: { userId: "local-dev-user-id" } });
  }

  const cookieStore = await cookies();
  const idToken = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!idToken) {
    throw new Error("Unauthorized: idToken is missing");
  }
  const decodedToken = await verifyIdToken(idToken);
  if (!decodedToken?.uid) {
    throw new Error(`Unauthorized: uid is missing in decoded token`);
  }
  const userId = decodedToken.uid;
  if (!userId) {
    throw new Error("Session is not valid!");
  }
  return next({ ctx: { userId } });
});

interface DecodedToken {
  uid: string;
  email?: string;
  emailVerified?: boolean;
  name?: string;
}

async function verifyIdToken(idToken: string): Promise<DecodedToken | null> {
  let app: admin.app.App;
  if (admin.apps.length > 0) {
    app = admin.apps[0] as admin.app.App;
  } else {
    app = admin.initializeApp({});
  }
  const adminAuth = admin.auth(app);
  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
      emailVerified: decodedToken.email_verified,
      name: decodedToken.name,
    };
  } catch (error) {
    console.error("ID token verification failed:", error);
    return null;
  }
}
