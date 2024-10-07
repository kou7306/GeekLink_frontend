import { Box, ListItem, ListItemText, Link } from "@mui/material";
import React from "react";
import Image from "next/image";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

type User = {
  user_id: number;
  name: string;
  image: string;
  rank: number;
  contribution_count: number;
};

type Props = {
  user: User;
};

const TopUserRanking = ({ user }: Props) => {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'gold';
      case 2:
        return 'silver';
      case 3:
        return '#cd7f32';
      default:
        return 'inherit';
    }
  };

  const rankColor = getRankColor(user.rank)

  return (
    <Link href={`/other/${user.user_id}`} underline="none">
      <ListItem button>
        <EmojiEventsIcon sx={{ color: rankColor, width: 45, height: 45 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
          <Image src={user.image} alt={user.name} width={60} height={60} />
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', ml: 2 }}>
            <ListItemText primary={user.name} primaryTypographyProps={{ sx: { fontWeight: 500, fontSize: 'large', mr: 18, color: 'black' } }} />
            <ListItemText primary={`${user.contribution_count} contributions`} primaryTypographyProps={{ sx: { fontWeight: 400, fontSize: 'large', color: 'black' } }} />
          </Box>
        </Box>
      </ListItem>
    </Link>
  );
};

export default TopUserRanking;
