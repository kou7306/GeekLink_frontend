import { getUuidFromCookie } from "@/actions/users";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const GitHubContributions = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["githubContributions"],
    queryFn: async () => {
      const uuid = await getUuidFromCookie();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/github/contributionList?uuid=${uuid}`
      );
      const data = await response.json();
      console.log(data);
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  // 配列かどうかを確認
  if (!Array.isArray(data)) {
    return <div>Error: The fetched data is not an array</div>;
  }

  // 合計のコントリビューション数を計算
  const numberOfContributions = data.reduce(
    (sum: number, contribution: number) => sum + contribution,
    0
  );

  return (
    <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
      <Typography marginRight={1}>Contribution数</Typography>
      <Typography>{numberOfContributions} contributions</Typography>
    </Box>
  );
};

export default GitHubContributions;
