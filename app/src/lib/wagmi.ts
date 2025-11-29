import { createConfig, http, cookieStorage, createStorage } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { inAppWalletConnector } from "@thirdweb-dev/wagmi-adapter";
import { createThirdwebClient, defineChain as thirdwebChain } from "thirdweb";

export const thirdwebClient = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string,
});

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
