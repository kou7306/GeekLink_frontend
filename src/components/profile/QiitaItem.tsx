import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { QiitaArticle } from "../../types/qiitaArticle";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";

type Props = {
  item: QiitaArticle;
};

const QiitaItem = ({ item }: Props) => {
  return (
    <Link href={item.url} target="_blank" rel="noopener noreferrer">
      <Box
        height={"200px"}
        border={"1px solid #e0e0e0"}
        borderRadius={"20px"}
        padding={2}
        marginBottom={2}
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
          <Typography variant="h6">{item.title}</Typography>
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
            style={{ marginRight: 16 }}
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
                color="primary"
                style={{
                  marginRight: 4,
                  backgroundColor: "#e3f2fd", // タグの背景色
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
