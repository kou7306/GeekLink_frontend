"use client";

import LoginButton from "@/components/auth/LoginButton";
import LoginForm from "@/components/auth/LoginForm";

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-base flex flex-col justify-center items-center mt-[-80px]">
      <h2 className="text-2xl font-bold mb-4 text-text">新規登録</h2>
      <div className="space-y-4 bg-content_base p-8 rounded-lg shadow-md max-w-md w-full">
        <LoginForm scene="sign-up" />
        <LoginButton provider="github" />
        <LoginButton provider="google" />
      </div>
    </div>
  );
};

export default SignUpPage;
