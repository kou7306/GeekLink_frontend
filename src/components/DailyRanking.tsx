import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import UsersRanking from "./UsersRanking";
import Link from "next/link";


const DailyRanking = () => {
  return (
    <>
      <Box sx={{ bgcolor: "background.paper", p: 2, borderRadius: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
              デイリーランキング
            </Typography>
            <Typography variant="h6" component="span" sx={{ color: "text.secondary" }}>
              GitHub Contributions
            </Typography>
          </Box>

          <Link href="/ranking">
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center" }}
            >
              詳しく見る
              <ArrowForwardIosIcon fontSize="small" sx={{ ml: 0.5 }} />
            </Typography>
          </Link>
        </Box>
        <UsersRanking />
      </Box>
      <hr />
    </>
  );
};

export default DailyRanking;
