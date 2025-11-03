"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ContentsListView = () => {
  return (
    <div className="container mx-auto max-w-6xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">🔎 コンテンツ一覧画面</h1>
        <Button variant="outline" asChild>
          <Link href="/">ホームに戻る</Link>
        </Button>
      </div>
      <div className="flex gap-4">
        <Input type="search" placeholder="検索..." className="flex-1" />
        <Select defaultValue="all">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="カテゴリを選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべてのカテゴリ</SelectItem>
            <SelectItem value="category1">カテゴリ1</SelectItem>
            <SelectItem value="category2">カテゴリ2</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-wrap gap-2">
        {["タグ1", "タグ2", "タグ3"].map((tag) => (
          <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
            {tag}
          </Badge>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Link key={i} href={`/contents/${i}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="aspect-video bg-muted mb-3 flex items-center justify-center rounded">
                  <p className="text-muted-foreground">画像</p>
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2">コンテンツ {i}</CardTitle>
                <p className="text-sm text-muted-foreground">¥1,000</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

