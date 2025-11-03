"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const PaymentCompleteView = () => {
  return (
    <div className="container mx-auto max-w-md space-y-6 p-6">
      <h1 className="text-3xl font-bold">✅ 支払い完了画面</h1>
      <Card>
        <CardContent className="space-y-4 text-center p-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="text-xl font-semibold">支払いが完了しました</h2>
          <p className="text-muted-foreground">
            ご購入ありがとうございます。コンテンツをご確認いただけます。
          </p>
          <div className="mt-4 space-y-2">
            <Button className="w-full" asChild>
              <Link href="/purchase/history">購入履歴を見る</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/">ホームに戻る</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

