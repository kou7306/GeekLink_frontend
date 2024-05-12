// src/components/auth/LoginButton.tsx
"use client";

import { Provider } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { loginAction } from "@/actions/users";
import { FaGithub, FaGoogle } from "react-icons/fa";

interface LoginButtonProps {
  provider: Provider;
}

function LoginButton({ provider }: LoginButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClickLoginButton = async (provider: Provider) => {
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
      className={`${
        provider === "github" ? "bg-gray-800 hover:bg-black" : "bg-red-500 hover:bg-red-600"
      } text-white font-bold py-2 px-4 rounded w-full flex items-center justify-center space-x-2`}
    >
      {isPending ? (
        "Logging in..."
      ) : (
        <>
          {provider === "github" ? <FaGithub className="w-5 h-5" /> : <FaGoogle className="w-5 h-5" />}
          <span>{provider === "github" ? "GitHub" : "Google"}</span>
        </>
      )}
    </button>
  );
}

export default LoginButton;
