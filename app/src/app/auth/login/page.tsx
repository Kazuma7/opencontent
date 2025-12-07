"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Address, Hex, isAddressEqual } from "viem";
import { useConnection } from "wagmi";

import { AuthLoginView } from "@/features/auth-login/views/AuthLoginView";
import { useSessionsQuery } from "@/hooks/auth";

export default function AuthLoginPage() {
  const router = useRouter();
  const { address, isConnected } = useConnection();
  const sessions = useSessionsQuery();

  const hasSessionForAddress =
    isConnected &&
    !!address &&
    sessions.data?.sessions.some((session) =>
      isAddressEqual(session.walletAddress as Address, address),
    );

  useEffect(() => {
    if (sessions.isLoading || sessions.isFetching) return;
    if (hasSessionForAddress) router.replace("/");
  }, [hasSessionForAddress, router, sessions.isFetching, sessions.isLoading]);

  if (hasSessionForAddress) return null;

  return <AuthLoginView />;
}
