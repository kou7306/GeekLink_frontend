"use client";

import { getUuidFromCookie } from "@/actions/users";
import FollowPage from "@/components/follow/FollowPage";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const params = useParams();
  const uuid = params.uuid;

  //ログイン中のユーザーのフォロー、フォロワー情報を取得
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const cookieUuid = await getUuidFromCookie();
      if (uuid === cookieUuid) {
        router.push("/follow");
      } else if (uuid) {
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
      }
    },
  });

  return <FollowPage data={data} isMe={false} />;
};

export default Page;
