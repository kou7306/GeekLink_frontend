// src/components/auth/SignInButton.tsx
"use client";

import { signInAction } from "@/actions/users";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

interface SignInButtonProps {
  email?: string;
  password?: string;
  isGuest?: boolean;
}

function SignInButton({
  email = "test1@gmail.com",
  password = "test1234",
  isGuest = false,
}: SignInButtonProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleSignIn = async () => {
    startTransition(async () => {
      console.log(email, password);
      const { errorMessage } = await signInAction(email, password);
      if (!errorMessage) {
        router.push("/");
      } else {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <button
      onClick={() => handleSignIn()}
      disabled={isPending}
      className="px-4 py-2 bg-primary text-text rounded-lg shadow-md hover:bg-hover_blue transition-colors duration-200 ease-in-out"
    >
      {isGuest
        ? isPending
          ? "Signing in..."
          : "ゲストログイン"
        : isPending
        ? "Signing in..."
        : "ログイン"}
    </button>
  );
}

export default SignInButton;
