"use client";

import {
  getNonceAction,
  getSessionsAction,
  signInWithEthAction,
} from "@/actions/auth";
import { thirdwebClient } from "@/lib/wagmi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { SiweMessage } from "siwe";
import { preAuthenticate } from "thirdweb/wallets";
import { Account, Address, isAddressEqual } from "viem";
import {
  useAccount,
  useConnect,
  useConnection,
  useConnectors,
  useDisconnect,
  useSignMessage,
} from "wagmi";

export const useSessionsQuery = () => {
  const query = useQuery({
    queryKey: ["sessions"],
    queryFn: () => getSessionsAction(),
  });

  return query;
};

export const useThirdwebConnect = () => {
  const { connect } = useConnect();
  const connectors = useConnectors();

  const thirdwebConnector = connectors.find((x) => x.id === "in-app-wallet");

  const sendVerificationCode = useMutation({
    mutationFn: async (email: string) => {
      await preAuthenticate({
        client: thirdwebClient,
        strategy: "email",
        email,
      });
    },
  });

  const loginWithEmail = (email: string, verificationCode: string) => {
    if (!thirdwebConnector) return;
    connect({
      connector: thirdwebConnector,
      strategy: "email",
      email,
      verificationCode,
    } as { connector: typeof thirdwebConnector });
  };

  const loginWithGoogle = () => {
    if (!thirdwebConnector) return;
    connect({
      connector: thirdwebConnector,
      strategy: "google",
    });
  };

  const loginWithGithub = () => {
    if (!thirdwebConnector) return;
    connect({
      connector: thirdwebConnector,
      strategy: "github",
    });
  };

  return {
    sendVerificationCode,
    loginWithEmail,
    loginWithGoogle,
    loginWithGithub,
  };
};

export const useSiweLogin = () => {
  const sessions = useSessionsQuery();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  const siwe = useMutation({
    mutationFn: async (params: { address: Address; chainId: number }) => {
      const { address, chainId } = params;
      const nonceResult = await getNonceAction();

      if (!nonceResult.success) throw new Error(nonceResult.message);

      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: chainId,
        nonce: nonceResult.siweNonce,
      });

      const signature = await signMessageAsync({
        account: address,
        message: message.prepareMessage(),
      });

      const loginResult = await signInWithEthAction({
        message: message.toMessage(),
        signature,
      });

      if (!loginResult.success) throw new Error(loginResult.message);
    },
    onSuccess: () => {
      sessions.refetch();
    },
    onError: () => {
      sessions.refetch();
      disconnect();
    },
  });

  return { siwe };
};

export const useAutoSiweLogin = () => {
  const sessions = useSessionsQuery();
  const { address, chainId } = useConnection();

  const { siwe } = useSiweLogin();

  useEffect(() => {
    if (!address || !chainId || sessions.isLoading) return;

    const alreadySignIned = sessions.data?.sessions.some((s) =>
      isAddressEqual(s.walletAddress as Address, address)
    );
    if (alreadySignIned) return;

    if (siwe.isPending) return;
    siwe.mutate({ address, chainId });
  }, [sessions, siwe, address, chainId]);
};
