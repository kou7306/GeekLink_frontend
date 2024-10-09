import { getUuidFromCookie } from "@/actions/users";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

type Props = {
  isMe: boolean;
};

const GitHubContributions = ({ isMe }: Props) => {
  //自分以外のマイページを見るときにパラメータのuuidを使う
  const { uuid } = useParams();

  const { isPending, isError, data } = useQuery({
    queryKey: ["githubContributions"],
    queryFn: async () => {
      let userUid = isMe ? (await getUuidFromCookie()) ?? uuid : uuid;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/github/contributionList?uuid=${userUid}`,
        {
          next: { revalidate: 7200 }, // 2時間（7200秒）ごとに再検証
        }
      );
      const data = await response.json();
      console.log(data);
      return data;
    },
  });

  if (isError) return <div>読み込めませんでした</div>;

  // 配列かどうかを確認
  if (!Array.isArray(data)) {
    return <div>Error: The fetched data is not an array</div>;
  }

  // 合計のコントリビューション数を計算
  const numberOfContributions = Array.isArray(data)
    ? data.reduce((sum: number, contribution: number) => sum + contribution, 0)
    : 0;

  return (
    <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
      <Typography marginRight={1}>Contribution数</Typography>
      <Typography>{numberOfContributions} contributions</Typography>
    </Box>
  );
};

export default GitHubContributions;
