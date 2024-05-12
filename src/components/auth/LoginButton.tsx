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
      className="border-2 border-black p-2 rounded-md hover:bg-black hover:text-white"
      onClick={() => handleClickLoginButton(provider)}
      disabled={isPending}
    >
      {isPending ? "Logging in..." : `${provider == "github" ? "GitHub" : "Google"}`}
    </button>
  );
}

export default LoginButton;
