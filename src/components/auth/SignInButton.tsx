// src/components/auth/SignInButton.tsx
"use client";

import { signInAction } from "@/actions/users";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

interface SignInButtonProps {
  email: string;
  password: string;
}

function SignInButton({ email, password }: SignInButtonProps) {
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
      className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 ease-in-out"
    >
      {isPending ? "Signing in..." : "Sign In"}
    </button>
  );
}

export default SignInButton;
