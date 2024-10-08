import { Box, Typography, IconButton } from "@mui/material";
import React, { useState } from "react";
import QiitaItem from "./QiitaItem";
import { useQuery } from "@tanstack/react-query";
import { getUuidFromCookie } from "@/actions/users";
import { QiitaArticle } from "../../../types/qiitaArticle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const QiitaList = () => {
  const [expanded, setExpanded] = useState(false); // 展開状態を管理

  // Qiita記事を取得するクエリ
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

  // 展開状態に応じて表示する記事を制限
  const articlesToShow = expanded
    ? data.postDetails
    : data.postDetails.slice(0, 3);

  // 展開状態の切り替え
  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Box
      sx={{
        marginRight: 2,
        width: "100%",
        height: "auto",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // 統一されたシャドウ
        borderRadius: 2,
        padding: 2,
      }}
    >
      <Box marginX={4}>
        <Typography variant="h5" marginY={4}>
          Qiita
        </Typography>
        {/* 展開状態に応じてリポジトリを表示 */}
        {articlesToShow.map((item: QiitaArticle, index: number) => (
          <QiitaItem item={item} key={index} />
        ))}
        {/* 常にスペースを確保し、条件に応じてアイコンを表示 */}
        <IconButton
          onClick={handleToggle}
          sx={{
            display: "flex",
            margin: "auto",
            marginTop: 2,
            visibility: data.postDetails.length > 3 ? "visible" : "hidden", // アイコンの表示/非表示
          }}
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default QiitaList;
