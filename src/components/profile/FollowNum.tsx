import { Box } from "@mui/material";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUuidFromCookie } from "@/actions/users";
import { useParams } from "next/navigation";
import ComponentLoading from "../core/ComponentLoading";
import Link from "next/link";

type Props = {
  isMe: boolean;
};

const FollowNum = ({ isMe }: Props) => {
  const { uuid } = useParams();

  const { isPending, isError, error, data } = useQuery({
    queryKey: ["follow"],
    queryFn: async () => {
      const userUid = isMe ? (await getUuidFromCookie()) ?? uuid : uuid;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/follow/get-follows-num`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uuid: userUid,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Follow Num");
      }
      return response.json();
    },
  });

  if (isPending) return <ComponentLoading />;

  if (isError) return <div>Error: {error.message}</div>;

  const { followsNum, followersNum } = data;

  return (
    <Box>
      <Link
        href={isMe ? "/follow?tab=follows" : `/follow/${uuid}?tab=follows`}
        className="mr-4"
      >
        {followsNum}フォロー
      </Link>
      <Link
        href={isMe ? "/follow?tab=followers" : `/follow/${uuid}?tab=followers`}
      >
        {followersNum}フォロワー
      </Link>
    </Box>
  );
};

export default FollowNum;
