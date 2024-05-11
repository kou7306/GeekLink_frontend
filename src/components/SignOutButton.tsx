"use client";

import { signOutAction } from "../actions/users";
import { useTransition } from "react";
import toast from "react-hot-toast";

function SignOutButton() {
  const [isPending, startTransition] = useTransition();

  const handleClickSignOutButton = () => {
    startTransition(async () => {
      const { errorMessage } = await signOutAction();
      if (!errorMessage) {
        toast.success("Successfully signed out");
      } else {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <button
      className="border-2 border-black p-2 rounded-md hover:bg-black hover:text-white"
      onClick={() => handleClickSignOutButton()}
      disabled={isPending}
    >
      {isPending ? "Signing out..." : "Sign Out"}
    </button>
  );
}

export default SignOutButton;
