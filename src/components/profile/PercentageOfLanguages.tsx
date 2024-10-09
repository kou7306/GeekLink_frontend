import { getUuidFromCookie } from "@/actions/users";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import LanguageGraph from "./LanguageGraph";
import { useParams } from "next/navigation";

type Props = {
  isMe: boolean;
};

const PercentageOfLanguages = ({ isMe }: Props) => {
  //自分以外のマイページを見るときにパラメータのuuidを使う
  const { uuid } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["percentageOfLanguages"],
    queryFn: async () => {
      let userUid = isMe ? (await getUuidFromCookie()) ?? uuid : uuid;
      if (!userUid) {
        return [];
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/github/lang`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uuid: userUid }),
          next: { revalidate: 86400 }, // 1日（86400秒）ごとに再検証
        }
      );
      const data = await response.json();
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <LanguageGraph GitHubLanguages={data} />
    </Box>
  );
};

export default PercentageOfLanguages;
