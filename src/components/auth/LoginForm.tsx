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
    <div className="p-6 max-w-md w-full space-y-6">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input input-bordered w-full mb-6 p-2 text-black placeholder-gray-400" // Added text-black and placeholder color
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input input-bordered w-full mb-6 p-2 text-black placeholder-gray-400" // Added text-black and placeholder color
      />
      {scene === "sign-in" ? (
        <div className="flex flex-col items-center space-y-6">
          <SignInButton email={email} password={password} />
          <Link href="/sign-up">
            <button className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white transition">
              新規登録はこちら
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-6">
          <SignUpButton email={email} password={password} />
          <Link href="/login">
            <button className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white transition">
              アカウントをお持ちの方はこちら
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
