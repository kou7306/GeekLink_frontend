"use client";

import React, { useState } from "react";
import SignInButton from "@/components/auth/SignInButton";
import SignUpButton from "@/components/auth/SignUpButton";
import Link from "next/link";

interface LoginFormProps {
  scean: string;
}

function LoginForm({ scean }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        {scean === "sign-in" ? (
          <div>
          <Link href={"/sign-up"}>新規登録はこちら</Link>
          <SignInButton email={email} password={password} />
          </div>
        ) : (
          <SignUpButton email={email} password={password} />
        )}
      </div>
    </div>
  );
}

export default LoginForm;
