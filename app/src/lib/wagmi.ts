import { createConfig, http, cookieStorage, createStorage } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { inAppWalletConnector } from "@thirdweb-dev/wagmi-adapter";
import { createThirdwebClient, GetUserResult } from "thirdweb";
import { sepolia as thirdwebSepolia } from "thirdweb/chains";
import { createPublicClient } from "viem";

export const VIEM_CHAINS = [sepolia] as const;
export const THIRDWEB_CHAINS = [thirdwebSepolia];

export const thirdwebClient = createThirdwebClient(
  process.env.THIRDWEB_SECRET_KEY
    ? { secretKey: process.env.THIRDWEB_SECRET_KEY }
    : { clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string }
);

export const wagmiConfig = createConfig({
  chains: VIEM_CHAINS,
  ssr: true,
  connectors: [
    inAppWalletConnector({
      client: thirdwebClient,
      // smartAccounts: { sponsorGas: true, chain: thirdwebChain(sepolia) },
    }),
  ],
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [sepolia.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}

export const pickUserName = (user: GetUserResult) =>
  user.profiles
    .map(
      (p) =>
        "name" in p.details &&
        typeof p.details.name === "string" &&
        p.details.name
    )
    .find((name) => name) || "Unknown";

export const findThridWebChainById = (chainId: number) => {
  const chain = THIRDWEB_CHAINS.find(({ id }) => id === chainId);
  return chain ?? null;
};

export const findPublicClient = (chainId: number) => {
  const chain = VIEM_CHAINS.find(({ id }) => id === chainId);
  if (!chain) return null;
  const publicClient = createPublicClient({ chain, transport: http() });

  return publicClient;
};
