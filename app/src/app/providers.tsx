"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, type ReactNode, useState } from "react";
import { type State, WagmiProvider } from "wagmi";
import { wagmiConfig } from "@/lib/wagmi";

const queryClient = new QueryClient();

export const Providers: FC<{
  children: ReactNode;
  initialState?: State;
}> = ({ children, initialState }) => {
  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};
