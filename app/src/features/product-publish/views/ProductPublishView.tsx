"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ProductPublishView = () => {
  return (
    <div className="container mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">🚀 公開実行画面</h1>
      <Card>
        <CardHeader>
          <CardTitle>商品を公開しますか？</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-muted-foreground">タイトル: 商品タイトル</p>
            <p className="text-muted-foreground">価格: ¥1,000</p>
            <p className="text-muted-foreground">ステータス: 下書き → 公開</p>
          </div>
          <div className="mt-6 flex gap-4">
            <Button variant="destructive" asChild>
              <Link href="/creator/products/1/preview">キャンセル</Link>
            </Button>
            <Button className="bg-green-500 hover:bg-green-600" asChild>
              <Link href="/creator/products">公開する</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

