"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const AccountSettingsView = () => {
  return (
    <div className="container mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-3xl font-bold">⚙️ アカウント設定画面</h1>
      <div className="space-y-6">
        <Button variant="destructive">ログアウト</Button>
      </div>
    </div>
  );
};
