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
import { issueGasslessTransfer } from "@/actions/test-gassless-transfer";

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

  const { data } = useReadContract({
    address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address ?? zeroAddress],
  });

  const testGassLessTransfer = async () => {
    if (!address) return;
    const signed = await signGassLessTransfer({
      owner: address,
      chainId: 11155111,
      tokenAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
      transfers: [{ to: address, value: BigInt(10) }],
    });

    console.log("Signed params", signed);

    const result = await issueGasslessTransfer(signed);

    console.log("result", result);
  };

  if (isConnected) {
    return (
      <div className="grid gap-2">
        <p>Connected to {address}</p>
        <p>USDC Balance: {String(data)}</p>
        <div className="flex gap-2">
          <Button onClick={() => disconnect()}>Disconnect</Button>

          <Button onClick={() => testGassLessTransfer()}>Test Transfer</Button>
        </div>
      </div>
    );
  }
}
