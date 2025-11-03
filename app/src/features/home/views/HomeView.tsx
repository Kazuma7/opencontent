"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const HomeView = () => {
  return (
    <div className="container mx-auto max-w-6xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">🏠 ホーム画面</h1>
        <Button asChild>
          <Link href="/contents">コンテンツ一覧</Link>
        </Button>
      </div>
      <div className="space-y-8">
        <section>
          <h2 className="mb-4 text-2xl font-semibold">新着コンテンツ</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
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
        </section>
        <section>
          <h2 className="mb-4 text-2xl font-semibold">人気コンテンツ</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Link key={i} href={`/contents/${i}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="aspect-video bg-muted mb-3 flex items-center justify-center rounded">
                      <p className="text-muted-foreground">画像</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="mb-2">人気コンテンツ {i}</CardTitle>
                    <p className="text-sm text-muted-foreground">¥1,500</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

