"use client";

import { Provider } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { loginAction } from "@/actions/users";

function LoginButton() {
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
      onClick={() => handleClickLoginButton("github")}
      disabled={isPending}
    >
      {isPending ? "Logging in..." : "Login with GitHub"}
    </button>
  );
}

export default LoginButton;
