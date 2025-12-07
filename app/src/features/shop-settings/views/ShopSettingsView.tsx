"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAction } from "next-safe-action/hooks";
import { useConnection } from "wagmi";
import { getUserProfile } from "../actions";
import { useEffect, useRef } from "react";

export const ShopSettingsView = () => {
  const { address } = useConnection();
  const { execute, result, isPending, hasErrored } = useAction(
    getUserProfile.bind(null, address),
  );
  console.log(result);

  const prevAddressRef = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (address && address !== prevAddressRef.current) {
      execute({});
      prevAddressRef.current = address;
    }
  }, [address, execute]);

  if (isPending) {
    return (
      <div className="container mx-auto max-w-4xl space-y-6 p-6">
        <h1 className="text-3xl font-bold">🏪 ショップ設定画面</h1>
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (hasErrored) {
    return (
      <div className="container mx-auto max-w-4xl space-y-6 p-6">
        <h1 className="text-3xl font-bold">🏪 ショップ設定画面</h1>
        <Card>
          <CardContent className="py-12">
            <div className="space-y-4 text-center">
              <p className="text-destructive">
                エラーが発生しました: {result?.serverError}
              </p>
              <Button onClick={() => execute({})}>再試行</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                defaultValue={result?.data?.displayName ?? ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shop-description">説明</Label>
              <textarea
                id="shop-description"
                className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
                rows={5}
                placeholder="ショップの説明を入力"
                defaultValue={result?.data?.description ?? ""}
              />
            </div>

            {/* 画像アップロード（プロフィール枠内） */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cover-image-in-profile">カバー画像</Label>
                <Input
                  id="cover-image-in-profile"
                  type="file"
                  accept="image/*"
                />
                {result?.data?.backgroundImage && (
                  <p className="text-xs text-muted-foreground">
                    現在の画像: {result.data.backgroundImage}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-image-in-profile">
                  プロフィール画像
                </Label>
                <Input
                  id="profile-image-in-profile"
                  type="file"
                  accept="image/*"
                />
                {result?.data?.iconImage && (
                  <p className="text-xs text-muted-foreground">
                    現在の画像: {result.data.iconImage}
                  </p>
                )}
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
              <Label htmlFor="website">ウェブサイト</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://example.com"
                defaultValue={result?.data?.websiteUrl ?? ""}
              />
            </div>
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
              defaultValue={result?.data?.thanksMessage ?? ""}
            />
          </CardContent>
        </Card>
        <Button>保存</Button>
      </div>
    </div>
  );
};
