import { getUuidFromCookie } from "@/actions/users";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const QiitaNumberOfContributions = () => {
  const { isPending, isError, data } = useQuery({
    queryKey: ["qiitaNumberOfContributions"],
    queryFn: async () => {
      const uuid = await getUuidFromCookie();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/activity/qiita?uuid=${uuid}&period=all`
      );
      const data = await response.json();
      return data;
    },
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const countQiitaArticles = data.postDetails.length;

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
