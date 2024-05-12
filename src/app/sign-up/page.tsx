"use client";

import LoginButton from "@/components/auth/LoginButton";
import LoginForm from "@/components/auth/LoginForm";

const SignUpPage = () => {
  return (
    <div>
      <h2>Sign Up</h2>
      <LoginForm scean="sign-up" />
      <LoginButton provider="google" />
      <LoginButton provider="github" />
    </div>
  );
};

export default SignUpPage;