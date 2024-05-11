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
        toast.success("Successfully signed up! Please sign in.")
      } else {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <button
      className="border-2 border-black p-2 rounded-md hover:bg-black hover:text-white"
      onClick={() => handleSignUp()}
      disabled={isPending}
    >
      {isPending ? "Signing up..." : "Sign Up"}
    </button>
  );
}

export default SignUpButton;
