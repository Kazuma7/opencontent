"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const PolicyAgeCheckView = () => {
  return (
    <div className="container mx-auto max-w-md space-y-6 p-6">
      <h1 className="text-3xl font-bold">🔞 年齢確認画面</h1>
      <Card>
        <CardContent className="space-y-4 text-center p-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
            <span className="text-2xl">18+</span>
          </div>
          <h2 className="text-xl font-semibold">年齢確認</h2>
          <p className="text-muted-foreground">
            このコンテンツは18歳以上の方のみがご利用いただけます。
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-2 rounded-md border p-3">
              <Checkbox id="age-confirm" />
              <Label htmlFor="age-confirm" className="cursor-pointer">
                私は18歳以上です
              </Label>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1">
                キャンセル
              </Button>
              <Button className="flex-1">確認</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

