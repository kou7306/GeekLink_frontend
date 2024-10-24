// src/components/auth/SignUpButton.tsx
"use client";

import { signUpAction } from "@/actions/users";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

interface SignUpButtonProps {
  email: string;
  password: string;
}

function SignUpButton({ email, password }: SignUpButtonProps) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleSignUp = async () => {
    startTransition(async () => {
      const { errorMessage } = await signUpAction(email, password);
      if (!errorMessage) {
        router.push("/login");
        toast.success("Successfully signed up! Please sign in.");
      } else {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <button
      onClick={() => handleSignUp()}
      disabled={isPending}
      className="px-4 py-2 bg-primary text-text rounded-lg shadow-md hover:bg-hover_blue transition-colors duration-200 ease-in-out"
    >
      {isPending ? "Signing up..." : "Sign Up"}
    </button>
  );
}

export default SignUpButton;
