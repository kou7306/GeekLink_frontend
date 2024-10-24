"use client";
import { getUuidFromCookie } from "@/actions/users";
import { useQuery } from "@tanstack/react-query";
import FollowPage from "@/components/follow/FollowPage";
import Loading from "../loading";

const Page = () => {
  //ログイン中のユーザーのフォロー、フォロワー情報を取得
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const uuid = await getUuidFromCookie();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/follow/get-follows`,
        {
          next: {
            revalidate: 600, // 10分
          },
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

  if (isPending) {
    return <Loading />;
  }

  return <FollowPage data={data} isMe={true} />;
};

export default Page;
