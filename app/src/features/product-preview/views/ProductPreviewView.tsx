"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ProductPreviewView = () => {
  return (
    <div className="container mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">👁 プレビュー確認画面</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">商品プレビュー</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video bg-muted flex items-center justify-center rounded">
            <p className="text-muted-foreground">プレビュー画像</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">商品タイトル</h3>
            <p className="mt-2 text-muted-foreground">
              商品説明がここに表示されます
            </p>
          </div>
          <div className="mt-4">
            <p className="text-lg font-semibold">価格: ¥1,000</p>
          </div>
        </CardContent>
      </Card>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/creator/products/1/edit">編集に戻る</Link>
        </Button>
        <Button
          variant="default"
          className="bg-green-500 hover:bg-green-600"
          asChild
        >
          <Link href="/creator/products/1/publish">公開する</Link>
        </Button>
      </div>
    </div>
  );
};
