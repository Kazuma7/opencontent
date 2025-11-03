"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ShopSettingsView = () => {
  return (
    <div className="container mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">🏪 ショップ設定画面</h1>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>プロフィール</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="shop-name">ショップ名</Label>
              <Input
                id="shop-name"
                type="text"
                placeholder="ショップ名を入力"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shop-description">説明</Label>
              <textarea
                id="shop-description"
                className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
                rows={5}
                placeholder="ショップの説明を入力"
              />
            </div>

            {/* 画像アップロード（プロフィール枠内） */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cover-image-in-profile">カバー画像</Label>
                <Input id="cover-image-in-profile" type="file" accept="image/*" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-image-in-profile">プロフィール画像</Label>
                <Input id="profile-image-in-profile" type="file" accept="image/*" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>SNSリンク</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                type="url"
                placeholder="https://twitter.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                type="url"
                placeholder="https://instagram.com/..."
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>お礼メッセージ</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
              rows={3}
              placeholder="購入者へのお礼メッセージを入力"
            />
          </CardContent>
        </Card>
        <Button>保存</Button>
      </div>
    </div>
  );
};

