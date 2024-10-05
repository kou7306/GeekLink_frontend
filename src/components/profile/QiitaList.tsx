import { Box } from "@mui/material";
import React from "react";
import QiitaItem from "./QiitaItem";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { getUuidFromCookie } from "@/actions/users";
import { QiitaArticle } from "../../../types/qiitaArticle";

const QiitaList = () => {
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["qiita"],
    queryFn: async () => {
      const uuid = await getUuidFromCookie();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/activity/qiita`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uuid: uuid,
            period: "1yr",
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Qiita activity");
      }
      return response.json();
    },
  });

  if (isPending) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <Box sx={{ maxWidth: 400, margin: "auto" }}>
      {data.postDetails.map((item: QiitaArticle, index: number) => (
        <QiitaItem item={item} key={index} />
      ))}
    </Box>
  );
};

export default QiitaList;
