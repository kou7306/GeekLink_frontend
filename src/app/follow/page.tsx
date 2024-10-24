"use client";
import { createTheme } from "@mui/material";
import { getUuidFromCookie } from "@/actions/users";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import FollowPage from "@/components/follow/FollowPage";

const Page = () => {
  const value = useSearchParams().get("tab") || "follows";

  //ログイン中のユーザーのフォロー、フォロワー情報を取得
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const uuid = await getUuidFromCookie();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/follow/get-follows`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uuid,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }
      return response.json();
    },
  });

  return <FollowPage data={data} isMe={true} />;
};

export default Page;
