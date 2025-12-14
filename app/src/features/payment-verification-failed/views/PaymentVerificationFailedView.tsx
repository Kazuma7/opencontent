"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const PaymentVerificationFailedView = () => {
  return (
    <div className="container mx-auto max-w-md space-y-6 p-6">
      <h1 className="text-3xl font-bold">⚠️ 確認失敗</h1>
      <Card className="border-destructive">
        <CardContent className="space-y-4 text-center p-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <span className="text-3xl text-destructive">✗</span>
          </div>
          <h2 className="text-xl font-semibold text-destructive">
            確認できませんでした
          </h2>
          <p className="text-muted-foreground">
            また時間を空けて行ってください
          </p>
          <div className="mt-4 space-y-2">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/contents/1">商品詳細画面に戻る</Link>
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
