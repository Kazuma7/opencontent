"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const AccountSettingsView = () => {
  return (
    <div className="container mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">⚙️ アカウント設定画面</h1>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>パスワード変更</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">現在のパスワード</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">新しいパスワード</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">新しいパスワード（確認）</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button>パスワードを変更</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>認証情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wallet">ウォレットアドレス</Label>
              <Input
                id="wallet"
                type="text"
                placeholder="0x..."
                readOnly
              />
            </div>
          </CardContent>
        </Card>
        <Button variant="destructive">ログアウト</Button>
      </div>
    </div>
  );
};

