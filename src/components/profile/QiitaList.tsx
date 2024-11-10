import { Box, Typography, IconButton, Card, CardContent } from "@mui/material";
import React, { useState } from "react";
import QiitaItem from "./QiitaItem";
import { useQuery } from "@tanstack/react-query";
import { QiitaArticle } from "../../types/qiitaArticle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ComponentLoading from "../core/ComponentLoading";

interface QiitaListProps {
  uuid: string;
}

const QiitaList: React.FC<QiitaListProps> = ({ uuid }) => {
  const [expanded, setExpanded] = useState(false); // 展開状態を管理

  // Qiita記事を取得するクエリ
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["qiita", uuid], // uuidをqueryKeyに追加
    queryFn: async () => {
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

      const jsonData = await response.json();

      // データが存在しない場合のデフォルト値
      return {
        postDetails: jsonData.postDetails || [], // 空の配列をデフォルトに設定
      };
    },
  });

  if (isLoading) return <ComponentLoading />;

  if (isError)
    return (
      <>
        <Card sx={{ marginY: 4, padding: 2, bgcolor: "background.paper" }}>
          <CardContent>
            <Typography variant="h5" component="div" color="text.primary">
              Qiita
            </Typography>
            <div>データがありません</div>
          </CardContent>
        </Card>
      </>
    );

  // 記事が存在するかチェックし、sliceによるエラーを防ぐ
  const articlesToShow =
    data?.postDetails?.length > 0
      ? expanded
        ? data?.postDetails ?? []
        : (data?.postDetails ?? []).slice(0, 3)
      : [];

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
        borderRadius: 2,
        padding: 2,
        bgcolor: "background.paper", // 背景色をテーマに基づいて設定
      }}
    >
      <Box marginX={4}>
        <Typography variant="h5" marginY={4} color="text.primary">
          Qiita
        </Typography>
        {/* 記事がない場合でもスペースを確保 */}
        {articlesToShow.length > 0 ? (
          articlesToShow.map((item: QiitaArticle, index: number) => (
            <QiitaItem item={item} key={index} />
          ))
        ) : (
          <Typography variant="body2" color="text.primary" align="center">
            連携されていません
          </Typography>
        )}
        {/* アイコンボタンを常に表示、条件に応じて動作を切り替え */}
        <IconButton
          onClick={handleToggle}
          sx={{
            display: "flex",
            margin: "auto",
            marginTop: 2,
            visibility: data?.postDetails?.length > 3 ? "visible" : "hidden", // アイコンの表示/非表示
            color: "white", // アイコンボタンの色を白に設定
          }}
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default QiitaList;
