import { createConfig, http, cookieStorage, createStorage } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { inAppWalletConnector } from "@thirdweb-dev/wagmi-adapter";
import { createThirdwebClient, GetUserResult } from "thirdweb";

// 環境変数が設定されていない場合のフォールバック
const getThirdwebConfig = () => {
    if (process.env.THIRDWEB_SECRET_KEY) {
        return { secretKey: process.env.THIRDWEB_SECRET_KEY };
    }

    const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
    if (clientId) {
        return { clientId };
    }

    // ビルド時に環境変数が設定されていない場合のフォールバック
    // 本番環境では必ず環境変数を設定してください
    if (process.env.NODE_ENV === "production") {
        throw new Error(
            "THIRDWEB_SECRET_KEY or NEXT_PUBLIC_THIRDWEB_CLIENT_ID must be provided in production"
        );
    }

    // 開発環境ではダミーのclientIdを使用
    return { clientId: "dummy-client-id-for-build" };
};

export const thirdwebClient = createThirdwebClient(getThirdwebConfig());

export const pickUserName = (user: GetUserResult) =>
    user.profiles
        .map(
            (p) =>
                "name" in p.details &&
                typeof p.details.name === "string" &&
                p.details.name
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
