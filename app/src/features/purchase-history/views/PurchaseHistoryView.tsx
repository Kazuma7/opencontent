"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const PurchaseHistoryView = () => {
  return (
    <div className="container mx-auto max-w-6xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">🧾 購入履歴画面</h1>
        <Button variant="outline" asChild>
          <Link href="/">ホームに戻る</Link>
        </Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 hover:bg-accent transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-muted rounded flex items-center justify-center">
                    <p className="text-xs text-muted-foreground">画像</p>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">購入商品 {i}</h3>
                    <p className="text-sm text-muted-foreground">2024年1月{i}日</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">¥1,000</p>
                    <p className="text-sm text-muted-foreground">完了</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/orders/${i}`}>詳細</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

