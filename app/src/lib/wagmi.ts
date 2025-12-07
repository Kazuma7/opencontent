import { createConfig, http, cookieStorage, createStorage } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { inAppWalletConnector } from "@thirdweb-dev/wagmi-adapter";
import { createThirdwebClient, GetUserResult } from "thirdweb";

export const thirdwebClient = createThirdwebClient(
  process.env.THIRDWEB_SECRET_KEY
    ? { secretKey: process.env.THIRDWEB_SECRET_KEY }
    : { clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string },
);

export const pickUserName = (user: GetUserResult) =>
  user.profiles
    .map(
      (p) =>
        "name" in p.details &&
        typeof p.details.name === "string" &&
        p.details.name,
    )
    .find((name) => name) || "Unknown";

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
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
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
