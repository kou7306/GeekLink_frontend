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
    <Link href={item.url} target="_blank" rel="noopener noreferrer">
      <Box
        border={"1px solid #e0e0e0"}
        borderRadius={"20px"}
        pb={3}
        pt={2}
        px={2}
        marginBottom={2}
      >
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {formatDate(item.date)} {/* 何月何日の形にフォーマット */}
        </Typography>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h6">{item.title}</Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default QiitaItem;
