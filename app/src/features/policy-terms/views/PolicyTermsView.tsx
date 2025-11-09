"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

export const PolicyTermsView = () => {
  return (
    <div className="container mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">❓ 利用規約画面</h1>
      <Card>
        <CardHeader>
          <CardTitle>利用規約</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-muted-foreground">
            <p>第1条（適用）</p>
            <p>本規約は、当サービスにおける利用条件を定めるものです。</p>
            <p>第2条（利用登録）</p>
            <p>利用者は、本規約に同意の上、利用登録を行うものとします。</p>
            <p>第3条（サービスの内容）</p>
            <p>当サービスは、デジタルコンテンツの販売を提供します。</p>
            {/* 以下、規約内容が続く */}
          </div>
        </CardContent>
        <CardFooter>
          <Button>同意する</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
