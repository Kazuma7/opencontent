"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SalesView = () => {
  return (
    <div className="container mx-auto max-w-6xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">💰 売上・決済状況画面</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">今日の売上</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">¥0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">今月の売上</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">¥0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">累計売上</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">¥0</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>売上履歴</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">売上データがありません</p>
        </CardContent>
      </Card>
    </div>
  );
};

