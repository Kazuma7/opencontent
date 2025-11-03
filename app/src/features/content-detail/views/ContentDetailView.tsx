"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ContentDetailView = () => {
  return (
    <div className="container mx-auto max-w-4xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">🖼 コンテンツ詳細画面</h1>
        <Button variant="outline" asChild>
          <Link href="/contents">一覧に戻る</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="aspect-square bg-muted flex items-center justify-center rounded">
              <p className="text-muted-foreground">商品画像</p>
            </div>
          </CardHeader>
        </Card>
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">商品タイトル</h2>
            <p className="mt-2 text-3xl font-bold text-green-600">¥1,000</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>説明</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                ここに商品の説明が表示されます。商品の詳細な情報や特徴を記載します。
              </p>
            </CardContent>
          </Card>
          <div className="flex gap-2">
            <Button asChild size="lg">
              <Link href="/purchase/detail">購入する</Link>
            </Button>
            <Button variant="outline" size="lg">
              お気に入り
            </Button>
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Button variant="link" size="sm" asChild>
              <Link href="/policy/terms">利用規約</Link>
            </Button>
            <Button variant="link" size="sm" asChild>
              <Link href="/policy/refund">返金ポリシー</Link>
            </Button>
            <Button variant="link" size="sm" asChild>
              <Link href="/policy/age-check">年齢確認</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

