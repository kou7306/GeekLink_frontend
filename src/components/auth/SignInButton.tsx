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
      className="border-2 border-black p-2 rounded-md hover:bg-black hover:text-white"
      onClick={() => handleSignIn()}
      disabled={isPending}
    >
      {isPending ? "Signing in..." : "Sign In"}
    </button>
  );
}

export default SignInButton;
