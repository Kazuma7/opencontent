"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const ProductListView = () => {
  return (
    <div className="container mx-auto max-w-6xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">🎨 商品管理画面</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/creator">ダッシュボード</Link>
          </Button>
          <Button asChild>
            <Link href="/creator/products/new">新規作成</Link>
          </Button>
        </div>
      </div>
      <div className="flex gap-4">
        <Button>公開中</Button>
        <Button variant="secondary">下書き</Button>
        <Button variant="secondary">非公開</Button>
      </div>
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">商品がありません</p>
        </CardContent>
      </Card>
    </div>
  );
};

