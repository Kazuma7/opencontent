"use client";

import {
  useConnection,
  useConnect,
  useDisconnect,
  useConnectors,
  useReadContract,
} from "wagmi";
import { Button } from "./ui/button";
import { preAuthenticate } from "thirdweb/wallets";
import { thirdwebClient } from "@/lib/wagmi";
import { erc20Abi, zeroAddress } from "viem";
import { useSignGassLessTransfer } from "@/hooks/gassless-transfer";
import { ar } from "zod/v4/locales";
import {
  getTransactionHash,
  getTransferStatus,
  issueGasslessTransfer,
} from "@/actions/test-gassless-transfer";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

type OAuthOption =
  | "email"
  | "jwt"
  | "wallet"
  | "phone"
  | "auth_endpoint"
  | "iframe_email_verification"
  | "iframe"
  | "passkey"
  | "backend";

export function WalletConnect() {
  const { address, isConnected, chainId } = useConnection();
  const { disconnect } = useDisconnect();

  const { signGassLessTransfer } = useSignGassLessTransfer();

  const [message, setMessage] = useState<string | null>();
  const [transferId, setTransferId] = useState<string | null>(null);

  const { data: usdcBalance } = useReadContract({
    address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address ?? zeroAddress],
  });

  const { data: transferStatus } = useQuery({
    queryKey: ["transfer-status", transferId],
    enabled: !!transferId,
    refetchInterval: 200,
    queryFn: ({ queryKey: [_, transferId] }) => {
      if (!transferId) return null;
      return getTransferStatus({ transferId });
    },
  });

  const { data: transactionHash } = useQuery({
    queryKey: ["transfer-hash", transferId],
    enabled: !!transferId,
    queryFn: ({ queryKey: [_, transferId] }) => {
      if (!transferId) return null;
      return getTransactionHash({ transferId });
    },
  });

  const testGassLessTransfer = async () => {
    if (!address) return;
    setMessage("署名中");
    setTransferId(null);
    const signed = await signGassLessTransfer({
      owner: address,
      chainId: 11155111,
      tokenAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
      transfers: [{ to: address, value: BigInt(10) }],
    });

    console.log("Signed params", signed);
    setMessage("ガスレストランザクション送信中");
    const result = await issueGasslessTransfer(signed);

    console.log("result", result);
    if (!result.success) return setMessage(`Error ${result.message}`);

    setMessage("トランザクション送信完了");
    setTransferId(result.transferId);
  };

  if (isConnected) {
    return (
      <div className="grid gap-2">
        <p>Connected to {address}</p>
        <p>USDC Balance: {String(usdcBalance)}</p>
        <p>Transfer Progress: {message}</p>
        <p>Thirdweb Transaction Status: {transferStatus?.status}</p>
        <p>Transaction hash: {transactionHash?.txHash}</p>
        <div className="flex gap-2">
          <Button onClick={() => disconnect()}>Disconnect</Button>

          <Button onClick={() => testGassLessTransfer()}>Test Transfer</Button>
        </div>
      </div>
    );
  }
}
