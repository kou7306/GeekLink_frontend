import { Box, ListItemText, Link, ListItemButton, Avatar } from "@mui/material";
import React from "react";
import { User } from "../../types/ranking";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

interface UserRankingsProps {
  user: User;
  type: string;
}

const UserRanking: React.FC<UserRankingsProps> = ({ user, type }) => {
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

  const getScore = (user: User, type: string) => {
    switch (type) {
      case "activity":
        if ("activity_score" in user) {
          return `${user.activity_score} ポイント`;
        }
        break;
      case "contribution":
        if ("contribution_count" in user) {
          return `${user.contribution_count} コントリビューション`;
        }
        break;
      case "star":
        if ("total_stars" in user) {
          return `${user.total_stars} スター`;
        }
        break;
      case "qiita":
        if ("score" in user) {
          return `${user.score} 投稿`;
        }
      default:
        return "";
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
              sx={{ color: rankColor, width: 45, height: 45, ml: 14 }}
            />
          ) : (
            <ListItemText
              primary={user.rank}
              primaryTypographyProps={{
                sx: {
                  fontSize: "1.5rem",
                  width: "30px",
                  textAlign: "center",
                  ml: 15,
                  mr: 1,
                },
              }}
            />
          )}

          <Avatar
            src={user.image}
            alt={user.name}
            sx={{ width: 50, height: 50, ml: 4 }}
          />
          <ListItemText
            primary={user.name}
            primaryTypographyProps={{
              sx: {
                fontWeight: 600,
                fontSize: "1.25rem",
                color: "text.primary",
                whiteSpace: "nowrap",
                marginLeft: 4,
              },
            }}
          />
        </Box>
        <ListItemText
          primary={getScore(user, type)}
          primaryTypographyProps={{
            sx: {
              fontWeight: 400,
              fontSize: "large",
              color: "text.secondary",
              textAlign: "right",
              marginRight: 18,
            },
          }}
        />
      </ListItemButton>
    </Link>
  );
};

export default UserRanking;
