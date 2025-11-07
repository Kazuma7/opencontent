"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ProductEditorView = () => {
  return (
    <div className="container mx-auto max-w-6xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">🧱 商品作成・編集画面</h1>
        <Button variant="outline" asChild>
          <Link href="/creator/products">商品一覧に戻る</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>商品情報</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">基本情報</TabsTrigger>
              <TabsTrigger value="price">価格設定</TabsTrigger>
              <TabsTrigger value="upload">データアップロード</TabsTrigger>
              <TabsTrigger value="adult">アダルト設定</TabsTrigger>
              <TabsTrigger value="schedule">公開スケジュール</TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">タイトル</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="商品タイトルを入力"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">説明</Label>
                <textarea
                  id="description"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
                  rows={5}
                  placeholder="商品説明を入力"
                />
              </div>
            </TabsContent>
            <TabsContent value="price" className="mt-6">
              <div className="space-y-2">
                <Label htmlFor="price">価格</Label>
                <Input id="price" type="number" placeholder="1000" />
              </div>
            </TabsContent>
            <TabsContent value="upload" className="mt-6">
              <div className="space-y-2">
                <Label htmlFor="file">ファイル</Label>
                <Input id="file" type="file" />
              </div>
            </TabsContent>
            <TabsContent value="adult" className="mt-6">
              <div className="space-y-2">
                <Label>アダルト設定</Label>
                <p className="text-sm text-muted-foreground">アダルト設定の内容</p>
              </div>
            </TabsContent>
            <TabsContent value="schedule" className="mt-6">
              <div className="space-y-2">
                <Label htmlFor="schedule">公開スケジュール</Label>
                <Input id="schedule" type="datetime-local" />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <div className="flex justify-end gap-4">
        <Button variant="outline" asChild>
          <Link href="/creator/products">キャンセル</Link>
        </Button>
        <Button asChild>
          <Link href="/creator/products/1/preview">プレビュー</Link>
        </Button>
      </div>
    </div>
  );
};

