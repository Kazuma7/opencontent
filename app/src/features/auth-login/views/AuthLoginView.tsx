"use client";

import { AuthLoginForm } from "../components/AuthLoginForm";
import { useAuthLogin } from "../hooks/useAuthLogin";

export const AuthLoginView = () => {
  const {
    email,
    verificationCode,
    isCodeSent,
    isSendingCode,
    isLoggingIn,
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
  } = useAuthLogin();

  return (
    <AuthLoginForm
      email={email}
      verificationCode={verificationCode}
      isCodeSent={isCodeSent}
      isSendingCode={isSendingCode}
      isLoggingIn={isLoggingIn}
      statusMessage={statusMessage}
      errorMessage={errorMessage}
      canSendCode={canSendCode}
      canLogin={canLogin}
      onEmailChange={handleEmailChange}
      onVerificationCodeChange={handleVerificationCodeChange}
      onSendCode={handleSendCode}
      onLogin={handleLogin}
      onLoginWithGoogle={handleLoginWithGoogle}
      onLoginWithGithub={handleLoginWithGithub}
    />
  );
};
