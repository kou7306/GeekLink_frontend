import React from "react";
import { Box, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";
import EventsPage from "./EventsPage";

const TeamRecruiting = () => {
  return (
    <Box
      sx={{ bgcolor: "background.paper", p: 2, borderRadius: 1, my: 4, mr: 2 }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ fontWeight: "bold" }}>
          新規チーム募集
        </Typography>
        <Link href="/team-recruitments">
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
              sx={{
                ml: 0.5,
                color: "primary.contrastText",
              }}
            />
          </Typography>
        </Link>
      </Box>
      <EventsPage />
    </Box>
  );
};

export default TeamRecruiting;
