"use client";

import LoginButton from "@/components/auth/LoginButton";
import LoginForm from "@/components/auth/LoginForm";

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center mt-[-80px]">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">新規登録</h2>
      <div className="space-y-4 bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
        <LoginForm scene="sign-up" />
        <LoginButton provider="google" />
        <LoginButton provider="github" />
      </div>
    </div>
  );
};

export default SignUpPage;
