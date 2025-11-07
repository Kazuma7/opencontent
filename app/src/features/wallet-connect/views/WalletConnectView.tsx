"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const WalletConnectView = () => {
  return (
    <div className="container mx-auto max-w-md space-y-6 p-6">
      <h1 className="text-3xl font-bold">🔗 別ウォレット接続画面</h1>
      <Card>
        <CardContent className="space-y-4 p-6">
          <p className="text-muted-foreground">別のウォレットを接続して支払いを行います</p>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start h-auto p-4">
              <div className="flex items-center gap-3 w-full">
                <div className="h-10 w-10 rounded bg-orange-100"></div>
                <div className="text-left">
                  <p className="font-semibold">MetaMask</p>
                  <p className="text-sm text-muted-foreground">ブラウザ拡張機能</p>
                </div>
              </div>
            </Button>
            <Button variant="outline" className="w-full justify-start h-auto p-4">
              <div className="flex items-center gap-3 w-full">
                <div className="h-10 w-10 rounded bg-blue-100"></div>
                <div className="text-left">
                  <p className="font-semibold">WalletConnect</p>
                  <p className="text-sm text-muted-foreground">モバイル対応</p>
                </div>
              </div>
            </Button>
            <Button variant="outline" className="w-full justify-start h-auto p-4">
              <div className="flex items-center gap-3 w-full">
                <div className="h-10 w-10 rounded bg-purple-100"></div>
                <div className="text-left">
                  <p className="font-semibold">Coinbase Wallet</p>
                  <p className="text-sm text-muted-foreground">モバイル・ブラウザ</p>
                </div>
              </div>
            </Button>
          </div>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/purchase/detail">キャンセル</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};


