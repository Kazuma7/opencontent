"use client";

import { useConnection, useConnect, useDisconnect, useConnectors } from "wagmi";
import { Button } from "./ui/button";
import { preAuthenticate } from "thirdweb/wallets";
import { thirdwebClient } from "@/lib/wagmi";

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
  const { connect } = useConnect();
  const connectors = useConnectors();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div>
        <p>Connected to {address}</p>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }

  const thirdwebConnect = async () => {
    const inAppWallet = connectors.find((x) => x.id === "in-app-wallet");
    connect({
      connector: inAppWallet,
      strategy: "google",
    });
  };

  return (
    <div className="flex gap-4">
      {connectors.map((connector) => (
        <Button key={connector.uid} onClick={() => connect({ connector })}>
          {connector.name}
        </Button>
      ))}
      <Button onClick={thirdwebConnect}>thirdweb</Button>
    </div>
  );
}
