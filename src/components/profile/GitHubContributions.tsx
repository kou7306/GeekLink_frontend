import { getUuidFromCookie } from "@/actions/users";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const GitHubContributions = () => {
  const { isPending, isError, data } = useQuery({
    queryKey: ["githubContributions"],
    queryFn: async () => {
      const uuid = await getUuidFromCookie();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/github/contributionList?uuid=${uuid}`
      );
      const data = await response.json();
      return data;
    },
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  // 合計のコントリビューション数を計算
  const numberOfContributions = Array.isArray(data)
    ? data.reduce((sum: number, contribution: number) => sum + contribution, 0)
    : 0;

  return (
    <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
      <Typography marginRight={1}>Contribution数</Typography>
      <Typography>{numberOfContributions}contributions</Typography>
    </Box>
  );
};

export default GitHubContributions;
