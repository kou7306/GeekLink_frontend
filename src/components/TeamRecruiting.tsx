import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  Link,
  keyframes,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Team from "./Team";

const TeamRecruiting = () => {
  const teams = [
    {
      id: 1,
      name: "チーム1",
    },
    {
      id: 2,
      name: "チーム2",
    },
    {
      id: 3,
      name: "チーム3",
    },
  ];
  return (
    <Box sx={{ bgcolor: "background.paper", p: 2, borderRadius: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" component="h2">
          新規チーム募集
        </Typography>
        <Link
          href="#"
          underline="none"
          sx={{
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
          }}
        >
          <Typography variant="body2">詳しく見る</Typography>
          <ArrowForwardIosIcon fontSize="small" sx={{ ml: 0.5 }} />
        </Link>
      </Box>
      <List disablePadding>
        {teams.map((item, index) => (
          <Team item={item} key={item.id} />
        ))}
      </List>
    </Box>
  );
};

export default TeamRecruiting;
