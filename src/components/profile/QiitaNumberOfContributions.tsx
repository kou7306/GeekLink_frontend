import { getUuidFromCookie } from "@/actions/users";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

type Props = {
  isMe: boolean;
};

const QiitaNumberOfContributions = ({ isMe }: Props) => {
  //自分以外のマイページを見るときにパラメータからuuidを取得
  const { uuid } = useParams();

  const { isPending, isError, data } = useQuery({
    queryKey: ["qiitaNumberOfContributions"],
    queryFn: async () => {
      let userUid = isMe ? (await getUuidFromCookie()) ?? uuid : uuid;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/activity/qiita?uuid=${userUid}&period=all`,
        {
          next: { revalidate: 86400 }, // 1日（86400秒）ごとに再検証
        }
      );
      const data = await response.json();
      return data;
    },
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const countQiitaArticles = data?.postDetails?.length ?? 0;

  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="center" my={2}>
        <Typography marginRight={1}>記事投稿数</Typography>
        <Typography>{countQiitaArticles}記事</Typography>
      </Box>
    </>
  );
};

export default QiitaNumberOfContributions;
