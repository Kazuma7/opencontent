"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const OrderDetailView = () => {
  return (
    <div className="container mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">📦 注文詳細画面</h1>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>購入詳細</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="h-24 w-24 bg-muted rounded flex items-center justify-center">
                <p className="text-xs text-muted-foreground">画像</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">商品タイトル</h3>
                <p className="text-muted-foreground">注文ID: #123456</p>
                <p className="mt-2 text-xl font-bold">¥1,000</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>ダウンロード</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full">ダウンロードリンク</Button>
            <p className="text-sm text-muted-foreground">
              有効期限: 2024年12月31日まで
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>支払い履歴</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">支払い方法</span>
              <span className="font-semibold">ETH</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">トランザクションID</span>
              <span className="font-mono text-sm">0x1234...5678</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">支払い日時</span>
              <span>2024年1月1日 12:00</span>
            </div>
          </CardContent>
        </Card>
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link href="/purchase/history">戻る</Link>
          </Button>
          <Button asChild>
            <Link href="/contents/1">商品詳細を見る</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
