"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const CreatorDashboardView = () => {
  return (
    <div className="container mx-auto max-w-6xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">ダッシュボード</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Link href="/creator/sales">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg">売上</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">¥0</p>
            </CardContent>
          </Card>
        </Link>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">アクセス</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold ">0</p>
          </CardContent>
        </Card>
        <Link href="/creator/products">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg">公開中商品</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">0</p>
            </CardContent>
          </Card>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
        <Link href="/creator/products">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>🎨 商品管理</CardTitle>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/creator/orders">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>📑 注文一覧</CardTitle>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/creator/shop/settings">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>🏪 ショップ設定</CardTitle>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/creator/account/settings">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle>⚙️ アカウント設定</CardTitle>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
};

