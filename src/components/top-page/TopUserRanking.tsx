import { Box, ListItemButton, ListItemText, Link, Avatar } from "@mui/material";
import React from "react";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

type User = {
  user_id: number;
  name: string;
  image: string;
  rank: number;
  activity_score: number;
};

type Props = {
  user: User;
};

const TopUserRanking = ({ user }: Props) => {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "gold";
      case 2:
        return "silver";
      case 3:
        return "#cd7f32";
      default:
        return "inherit";
    }
  };

  const rankColor = getRankColor(user.rank);

  return (
    <Link href={`/my-page/${user.user_id}`} underline="none">
      <ListItemButton
        sx={{
          paddingTop: 0.5,
          paddingBottom: 0.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {user.rank <= 3 ? (
              <EmojiEventsIcon
                sx={{ color: rankColor, width: 30, height: 30 }}
              />
            ) : (
              <ListItemText
                primary={user.rank}
                primaryTypographyProps={{
                  sx: {
                    fontSize: "1.5rem",
                    minWidth: 24,
                    textAlign: "center",
                    ml: 0.3,
                    mr: 0.4,
                  },
                }}
              />
            )}
          <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
            <Avatar src={user.image} alt={user.name} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                ml: 1,
              }}
            >
              <ListItemText
                primary={user.name}
                primaryTypographyProps={{
                  sx: {
                    fontWeight: 600,
                    fontSize: "1.25rem",
                    color: "text.primary",
                    mr: 3,
                  },
                }}
              />
            </Box>
            <ListItemText
              primary={`${user.activity_score} ポイント`}
              primaryTypographyProps={{
                sx: {
                  fontWeight: 400,
                  fontSize: "medium",
                  color: "text.secondary",
                },
              }}
            />
          </Box>
        </Box>
      </ListItemButton>
    </Link>
  );
};

export default TopUserRanking;
