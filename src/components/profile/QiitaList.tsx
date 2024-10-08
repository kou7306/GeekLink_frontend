import { Box, Typography } from "@mui/material";
import React from "react";
import QiitaItem from "./QiitaItem";
import { useQuery } from "@tanstack/react-query";
import { getUuidFromCookie } from "@/actions/users";
import { QiitaArticle } from "../../../types/qiitaArticle";

const QiitaList = () => {
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["qiita"],
    queryFn: async () => {
      const uuid = await getUuidFromCookie();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/activity/qiita?uuid=${uuid}&period=all`,
        {
          next: { revalidate: 60 * 60 * 24 },
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
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
    <Box
      sx={{
        marginRight: 2,
        width: "100%",
        height: 800,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // ここでシャドウを追加
        borderRadius: 2, // 角を少し丸める場合は追加
        padding: 2, // パディングを追加
      }}
    >
      <Typography variant="h5" marginY={4}>
        Qiita
      </Typography>
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        {/* // スクロール可能な内部コンテナ */}
        {data.postDetails.map((item: QiitaArticle, index: number) => (
          <QiitaItem item={item} key={index} />
        ))}
      </Box>
    </Box>
  );
};

export default QiitaList;
