import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // サーバーコンポーネントで外部パッケージとして扱う
    serverExternalPackages: ["thread-stream"],

    // Turbopack用の設定（空の設定でエラーを回避）
    turbopack: {},

    // Webpack用の設定（Turbopackが無効な場合のフォールバック）
    webpack: (config, { isServer }) => {
        // node_modules内のテストファイルや開発用ファイルを除外
        config.resolve = config.resolve || {};

        // thread-streamのtestディレクトリを無視
        config.resolve.alias = {
            ...config.resolve.alias,
            "thread-stream/test": false,
            "thread-stream/bench": false,
        };

        // テストファイルを含むパスを無視
        config.module = config.module || {};
        config.module.rules = config.module.rules || [];

        return config;
    },
};

export default nextConfig;
