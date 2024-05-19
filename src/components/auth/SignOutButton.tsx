// src/components/auth/SignOutButton.tsx
"use client";

import { signOutAction } from "../../actions/users";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function SignOutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleClickSignOutButton = () => {
    startTransition(async () => {
      const { errorMessage } = await signOutAction();
      if (!errorMessage) {
        toast.success("Successfully Signed Out");
        router.push("/login");
      } else {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <button
      onClick={() => handleClickSignOutButton()}
      disabled={isPending}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      {isPending ? "Signing out..." : "Sign Out"}
    </button>
  );
}

export default SignOutButton;
