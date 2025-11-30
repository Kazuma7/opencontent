import { redirect } from "next/navigation";

import { AuthLoginView } from "@/features/auth-login/views/AuthLoginView";
import { getSession } from "@/lib/auth";

export const revalidate = 0;

export default async function AuthLoginPage() {
  const session = await getSession();

  if (session.data.sessions.length > 0) {
    redirect("/");
  }

  return <AuthLoginView />;
}
