// src/components/auth/LoginButton.tsx
"use client";

import { Provider } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { loginAction } from "@/actions/users";

interface LoginButtonProps {
  provider: Provider;
}

function LoginButton({ provider }: LoginButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClickLoginButton = (provider: Provider) => {
    startTransition(async () => {
      const { errorMessage, url } = await loginAction(provider);
      if (!errorMessage && url) {
        router.push(url);
      } else {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <button
      onClick={() => handleClickLoginButton(provider)}
      disabled={isPending}
      className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded w-full"
    >
      {isPending ? "Logging in..." : `${provider == "github" ? "GitHub" : "Google"}`}
    </button>
  );
}

export default LoginButton;
