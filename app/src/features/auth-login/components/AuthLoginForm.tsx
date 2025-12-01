"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

type AuthLoginFormProps = {
  email: string;
  verificationCode: string;
  isCodeSent: boolean;
  isSendingCode: boolean;
  isLoggingIn: boolean;
  statusMessage: string | null;
  errorMessage: string | null;
  canSendCode: boolean;
  canLogin: boolean;
  onEmailChange: (value: string) => void;
  onVerificationCodeChange: (value: string) => void;
  onSendCode: () => void;
  onLogin: () => void;
  onLoginWithGoogle: () => void;
  onLoginWithGithub: () => void;
};

export const AuthLoginForm = ({
  email,
  verificationCode,
  isCodeSent,
  isSendingCode,
  isLoggingIn,
  statusMessage,
  errorMessage,
  canSendCode,
  canLogin,
  onEmailChange,
  onVerificationCodeChange,
  onSendCode,
  onLogin,
  onLoginWithGoogle,
  onLoginWithGithub,
}: AuthLoginFormProps) => {
  return (
    <div className="container mx-auto max-w-md space-y-6 p-6">
      <h1 className="text-3xl font-bold">🔐 ログイン</h1>

      <Card>
        <CardHeader>
          <CardTitle>メール & コードでログイン</CardTitle>
          <CardDescription>
            入力したメールアドレスに送信された認証コードでサインインします。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <div className="flex gap-2">
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                placeholder="user@example.com"
                disabled={isLoggingIn}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={onSendCode}
                disabled={!canSendCode || isSendingCode || isLoggingIn}
              >
                {isSendingCode
                  ? "送信中..."
                  : isCodeSent
                    ? "再送"
                    : "コード送信"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Thirdwebのインアプリウォレットでメール認証を行います。
            </p>
          </div>

          {isCodeSent && (
            <div className="space-y-2">
              <Label htmlFor="verificationCode">認証コード</Label>
              <Input
                id="verificationCode"
                inputMode="numeric"
                pattern="[0-9]*"
                value={verificationCode}
                onChange={(e) => onVerificationCodeChange(e.target.value)}
                placeholder="6桁のコード"
                disabled={isLoggingIn}
              />
              <p className="text-xs text-muted-foreground">
                メールに届いたコードを入力後「ログイン」を押してください。
              </p>
            </div>
          )}

          <Button
            className="w-full"
            size="lg"
            onClick={onLogin}
            disabled={!canLogin || isLoggingIn}
          >
            {isLoggingIn ? "ログイン処理中..." : "ログイン"}
          </Button>

          {(statusMessage || errorMessage) && (
            <div className="space-y-2 text-sm">
              {statusMessage && (
                <div className="w-full justify-center">{statusMessage}</div>
              )}
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
          )}

          <div className="relative pt-2">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-2 text-muted-foreground">
                他の方法でログイン
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onLoginWithGoogle}
              disabled={isLoggingIn}
            >
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onLoginWithGithub}
              disabled={isLoggingIn}
            >
              GitHub
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
