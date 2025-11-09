"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export const AuthLoginView = () => {
  return (
    <div className="container mx-auto max-w-md space-y-6 p-6">
      <h1 className="text-3xl font-bold">🔐 ログイン画面</h1>
      <Card>
        <CardHeader>
          <CardTitle>ログイン</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input id="email" type="email" placeholder="user@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <Input id="password" type="password" />
          </div>
          <Button className="w-full">ログイン</Button>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-2 text-muted-foreground">
                または
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Button variant="outline" className="w-full">
              Googleでログイン
            </Button>
            <Button variant="outline" className="w-full">
              Twitterでログイン
            </Button>
          </div>
          <div className="mt-4">
            <Label className="mb-2 text-sm font-semibold">ウォレット接続</Label>
            <Button variant="secondary" className="w-full">
              MetaMaskを接続
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
