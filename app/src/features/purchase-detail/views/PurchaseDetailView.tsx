"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export const PurchaseDetailView = () => {
  return (
    <div className="container mx-auto max-w-2xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">お支払い内容</h1>
        <Button variant="outline" asChild>
          <Link href="/contents/1">戻る</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>商品情報</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 bg-muted rounded flex items-center justify-center">
              <p className="text-xs text-muted-foreground">画像</p>
            </div>
            <div>
              <p className="font-semibold">商品タイトル</p>
              <p className="text-lg font-bold text-green-600">¥1,000</p>
            </div>
          </div>
          <Separator />
          <div>
            <Label className="mb-3 text-base font-semibold">
              支払いトークン選択
            </Label>
            <RadioGroup defaultValue="eth" className="mt-3">
              <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent">
                <RadioGroupItem value="eth" id="eth" />
                <Label htmlFor="eth" className="cursor-pointer">
                  ETH
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent">
                <RadioGroupItem value="usdt" id="usdt" />
                <Label htmlFor="usdt" className="cursor-pointer">
                  USDT
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent">
                <RadioGroupItem value="usdc" id="usdc" />
                <Label htmlFor="usdc" className="cursor-pointer">
                  USDC
                </Label>
              </div>
            </RadioGroup>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="font-semibold">合計</span>
            <span className="text-xl font-bold">¥1,000</span>
          </div>
        </CardContent>
        <CardFooter className="flex-col space-y-2">
          <div className="flex w-full gap-4">
            <Button variant="outline" className="flex-1" asChild>
              <Link href="/contents/1">キャンセル</Link>
            </Button>
            <Button className="flex-1" asChild>
              <Link href="/payment/verifying">注文を確定</Link>
            </Button>
          </div>
          <Button variant="link" asChild className="w-full">
            <Link href="/wallet/connect">別のウォレットで支払う</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
