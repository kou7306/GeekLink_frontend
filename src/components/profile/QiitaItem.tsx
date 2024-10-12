import { Box, Typography } from "@mui/material";
import React from "react";
import { QiitaArticle } from "../../types/qiitaArticle";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";

type Props = {
  item: QiitaArticle;
};

const QiitaItem = ({ item }: Props) => {
  return (
    <Link href={item.url} target="_blank" rel="noopener noreferrer" passHref>
      <Box
        height={"200px"}
        borderRadius={"20px"}
        padding={2}
        marginBottom={2}
        bgcolor="warning.main" // カード背景色をテーマのデフォルト背景色に
        sx={{
          textDecoration: "none", // リンクの下線を除去
          transition: "background-color 0.3s ease", // 背景色の変更を滑らかに
          "&:hover": {
            backgroundColor: "info.main", // ホバー時の背景色
          },
        }}
      >
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {formatDate(item.date)} {/* 何月何日の形にフォーマット */}
        </Typography>

        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          marginBottom={1}
        >
          <Typography variant="h6" color="text.primary">
            {item.title}
          </Typography>
        </Box>

        <Box
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          marginTop={2}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginRight: 2 }}
          >
            Likes: {item.likes_count} {/* いいね数 */}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Views: {item.page_views_count} {/* ページビュー数 */}
          </Typography>
        </Box>

        {/* tagsが存在するか確認してから表示 */}
        <Box display={"flex"} flexWrap={"wrap"} marginTop={1}>
          {item.tags && item.tags.length > 0 ? (
            item.tags.map((tag, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  marginRight: 1,
                  backgroundColor: "primary.main", // タグの背景色をテーマのprimary色に設定
                  color: "black", // 文字色を黒に設定
                  borderRadius: "12px",
                  padding: "2px 6px",
                }}
              >
                #{tag.name} {/* タグ名を表示 */}
              </Typography>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No tags available.
            </Typography>
          )}
        </Box>
      </Box>
    </Link>
  );
};

export default QiitaItem;
