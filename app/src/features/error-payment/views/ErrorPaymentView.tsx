"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const ErrorPaymentView = () => {
  return (
    <div className="container mx-auto max-w-md space-y-6 p-6">
      <h1 className="text-3xl font-bold">⚠️ 支払いエラー画面</h1>
      <Card className="border-destructive">
        <CardContent className="space-y-4 text-center p-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <span className="text-3xl text-destructive">✗</span>
          </div>
          <h2 className="text-xl font-semibold text-destructive">
            支払いに失敗しました
          </h2>
          <p className="text-muted-foreground">
            トランザクションの処理中にエラーが発生しました。
          </p>
          <div className="mt-4 rounded bg-muted p-4">
            <p className="text-sm font-semibold text-destructive">エラー内容</p>
            <p className="mt-1 text-sm text-muted-foreground">
              トランザクションが拒否されました。もう一度お試しください。
            </p>
          </div>
          <div className="space-y-2 pt-4">
            <Button variant="destructive" className="w-full" asChild>
              <Link href="/purchase/detail">購入詳細に戻る</Link>
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
