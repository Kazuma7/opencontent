"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

// 送金確認成功/失敗の分岐制御（ハードコード）
const VERIFICATION_SUCCESS = false; // true: 成功, false: 失敗

export const PaymentVerificationView = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (VERIFICATION_SUCCESS) {
        router.push("/payment/complete");
      } else {
        router.push("/payment/verification-failed");
      }
    }, 5000); // 5秒後にリダイレクト

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="container mx-auto max-w-md space-y-6 p-6">
      <h1 className="text-3xl font-bold">送金確認中</h1>
      <Card>
        <CardContent className="space-y-4 text-center p-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 animate-pulse">
            <span className="text-3xl">⏳</span>
          </div>
          <h2 className="text-xl font-semibold">送金を確認しています</h2>
          <p className="text-muted-foreground">少々お待ちください...</p>
        </CardContent>
      </Card>
    </div>
  );
};
