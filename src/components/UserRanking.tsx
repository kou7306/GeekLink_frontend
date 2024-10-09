import { Box, ListItemText, Link, ListItemButton } from "@mui/material";
import React from "react";
import { User } from "../../types/ranking";
import Image from "next/image";
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
        return `${user.activity_score} activity points`;
      }
      break;
    case "contribution":
      if ("contribution_count" in user) {
        return `${user.contribution_count} contributions`;
      }
      break;
    case "star":
      if ("total_stars" in user) {
        return `${user.total_stars} stars`;
      }
      break;
    case "qiita":
      if ("score" in user) {
        return `${user.score}'s Qiita posts`;
      }
    default:
      return '';
    }
  }

  const rankColor = getRankColor(user.rank);

  return (
    <Link href={`/my-page/${user.user_id}`} underline="none">
      <ListItemButton sx={{ 
        paddingTop: 0.5,
        paddingBottom: 0.5,
      }}>
        {user.rank >= 3 ? (
          <ListItemText>{user.rank}</ListItemText>
        ) : (
          <EmojiEventsIcon sx={{ color: rankColor, width: 45, height: 45 }} />
        )}
        <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
          <Image src={user.image} alt={user.name} width={55} height={55} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              ml: 2,
            }}
          >
            <ListItemText
            primary={user.name}
            primaryTypographyProps={{
              sx: {
                fontWeight: 500,
                fontSize: "large",
                color: "black",
              },
            }}
          />
          
          <ListItemText
            primary={getScore(user, type)}
            primaryTypographyProps={{
              sx: {
                fontWeight: 400,
                fontSize: "large",
                color: "black",
                textAlign: "right",
                position: "absolute",
                right: 5,
                top: "50%",
                transform: "translateY(-50%)",
              },
            }}
          />
          </Box>
        </Box>
      </ListItemButton>
    </Link>
  );
};

export default UserRanking;