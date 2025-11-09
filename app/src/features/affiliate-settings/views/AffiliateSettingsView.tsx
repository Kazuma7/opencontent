"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const AffiliateSettingsView = () => {
  return (
    <div className="container mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">🤝 アフィリエイト設定画面</h1>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>紹介率設定</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rate">紹介率 (%)</Label>
              <Input
                id="rate"
                type="number"
                min="0"
                max="100"
                placeholder="10"
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>アフィリエイトリンク</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="affiliate-link">リンク</Label>
              <Input
                id="affiliate-link"
                type="text"
                placeholder="https://example.com/affiliate/..."
                readOnly
              />
            </div>
            <Button>新しいリンクを生成</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>成果レポート</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">レポートデータがありません</p>
          </CardContent>
        </Card>
        <Button>保存</Button>
      </div>
    </div>
  );
};
