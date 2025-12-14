"use client";

import { useCallback, useMemo, useState } from "react";

import { useSiweLogin, useThirdwebConnect } from "@/hooks/auth";

export const useAuthLogin = () => {
  const {
    sendVerificationCode,
    loginWithEmail,
    loginWithGoogle,
    loginWithGithub,
  } = useThirdwebConnect();
  const { siwe } = useSiweLogin();

  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const canSendCode = useMemo(() => {
    const normalized = email.trim();
    return normalized.length > 3 && normalized.includes("@");
  }, [email]);

  const canLogin = useMemo(() => {
    if (!isCodeSent) return false;
    return verificationCode.trim().length > 0;
  }, [isCodeSent, verificationCode]);

  const handleSendCode = useCallback(async () => {
    setErrorMessage(null);
    setStatusMessage(null);

    if (!canSendCode) {
      setErrorMessage("有効なメールアドレスを入力してください");
      return;
    }

    try {
      await sendVerificationCode.mutateAsync(email.trim());
      setIsCodeSent(true);
      setStatusMessage("認証コードを送信しました。メールをご確認ください。");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "認証コードの送信に失敗しました";
      setErrorMessage(message);
    }
  }, [canSendCode, email, sendVerificationCode]);

  const handleEmailChange = useCallback(
    (value: string) => {
      setEmail(value);
      if (isCodeSent) {
        setIsCodeSent(false);
        setVerificationCode("");
      }
      setStatusMessage(null);
      setErrorMessage(null);
    },
    [isCodeSent],
  );

  const handleLogin = useCallback(async () => {
    setErrorMessage(null);
    setStatusMessage(null);
    setIsLoggingIn(true);

    try {
      await loginWithEmail(email.trim(), verificationCode.trim());
      setStatusMessage(
        "ログイン処理を開始しました。ブラウザの接続確認を続行してください。",
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "ログインに失敗しました";
      setErrorMessage(message);
    } finally {
      setIsLoggingIn(false);
    }
  }, [email, loginWithEmail, verificationCode]);

  const handleLoginWithGoogle = useCallback(async () => {
    setErrorMessage(null);
    setStatusMessage(null);
    setIsLoggingIn(true);
    try {
      await loginWithGoogle();
      setStatusMessage(
        "Googleでのログインを開始しました。ポップアップを確認してください。",
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Googleログインに失敗しました";
      setErrorMessage(message);
    } finally {
      setIsLoggingIn(false);
    }
  }, [loginWithGoogle]);

  const handleLoginWithGithub = useCallback(async () => {
    setErrorMessage(null);
    setStatusMessage(null);
    setIsLoggingIn(true);
    try {
      await loginWithGithub();
      setStatusMessage(
        "GitHubでのログインを開始しました。ポップアップを確認してください。",
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "GitHubログインに失敗しました";
      setErrorMessage(message);
    } finally {
      setIsLoggingIn(false);
    }
  }, [loginWithGithub]);

  const handleVerificationCodeChange = useCallback((value: string) => {
    setVerificationCode(value);
    setErrorMessage(null);
  }, []);

  return {
    email,
    verificationCode,
    isCodeSent,
    isSendingCode: sendVerificationCode.isPending,
    isLoggingIn: isLoggingIn || siwe.isPending,
    statusMessage,
    errorMessage,
    canSendCode,
    canLogin,
    handleEmailChange,
    handleVerificationCodeChange,
    handleSendCode,
    handleLogin,
    handleLoginWithGoogle,
    handleLoginWithGithub,
  };
};
