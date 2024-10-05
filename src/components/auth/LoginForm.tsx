// src/components/auth/LoginForm.tsx
"use client";

import React, { useState } from "react";
import SignInButton from "@/components/auth/SignInButton";
import SignUpButton from "@/components/auth/SignUpButton";
import Link from "next/link";

interface LoginFormProps {
  scene: string;
}

function LoginForm({ scene }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-white p-6 max-w-md w-full space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input input-bordered w-full mb-4 p-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input input-bordered w-full mb-4 p-2"
      />
      {scene === "sign-in" ? (
        <div className="flex flex-col items-center space-y-6">
          <SignInButton email={email} password={password} />
          <Link
            href="/sign-up"
            className="link link-hover mb-3 hover:text-blue-500"
          >
            新規登録はこちら
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-6">
          <SignUpButton email={email} password={password} />
          <Link
            href="/login"
            className="link link-hover mb-3 hover:text-blue-500"
          >
            アカウントをお持ちの方はこちら
          </Link>
        </div>
      )}
      <div className="flex justify-center">
        <SignInButton isGuest />
      </div>
    </div>
  );
}

export default LoginForm;
