import React from "react";
import { Box, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TopUsersRanking from "./TopUsersRanking";
import Link from "next/link";

const DailyRanking = () => {
  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 2,
          borderRadius: 1,
          my: 4,
          mr: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="h6" component="h2" sx={{ fontWeight: "bold" }}>
              デイリーランキング
            </Typography>
            <Typography
              variant="body1"
              component="span"
              sx={{ color: "text.secondary" }}
            >
              GitHub Contributions数
            </Typography>
          </Box>

          <Link href="/ranking">
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "primary.contrastText",
              }}
            >
              詳しく見る
              <ArrowForwardIosIcon
                fontSize="small"
                sx={{ ml: 0.5, color: "primary.contrastText" }}
              />
            </Typography>
          </Link>
        </Box>
        <TopUsersRanking />
      </Box>
    </>
  );
};

export default DailyRanking;
