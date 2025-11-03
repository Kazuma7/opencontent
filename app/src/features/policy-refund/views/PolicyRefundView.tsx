"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export const PolicyRefundView = () => {
  return (
    <div className="container mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">💬 返金ポリシー画面</h1>
      <Card>
        <CardHeader>
          <CardTitle>返金ポリシー</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-muted-foreground">
            <div>
              <h3 className="font-semibold text-foreground">返金可能な場合</h3>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>商品が記載と異なる場合</li>
                <li>技術的な問題でダウンロードできない場合</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">返金不可な場合</h3>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>ダウンロード後の返金</li>
                <li>単なる好みの問題による返金</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">返金手続き</h3>
              <p className="mt-2">
                返金をご希望の場合は、購入後7日以内にサポートまでお問い合わせください。
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>理解しました</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

