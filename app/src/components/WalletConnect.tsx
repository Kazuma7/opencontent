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
  const { address, isConnected } = useConnection();
  const { disconnect } = useDisconnect();

  const { data } = useReadContract({
    address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address ?? zeroAddress],
  });

  const testGassLessTransfer = () => {};

  if (isConnected) {
    return (
      <div>
        <p>Connected to {address}</p>
        <p>USDC Balance: {String(data)}</p>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }
}
