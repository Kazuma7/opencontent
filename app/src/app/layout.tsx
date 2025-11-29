import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { config as wagmiConfig } from "@/lib/wagmi";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpenContent",
  description: "OpenContent - デジタルコンテンツ販売プラットフォーム",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const cookie = headerList.get("cookie");

  // 2. Cookie情報を基にWagmiの初期状態を復元
  const initialState = cookieToInitialState(wagmiConfig, cookie);

  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col`}
      >
        <Header />
        <Providers initialState={initialState}>
          <main className="flex-1">{children}</main>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
