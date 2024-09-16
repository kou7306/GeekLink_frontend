import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React from "react";

type User = {
  id: number;
  name: string;
};

type Props = {
  user: User;
  key: number;
};

const UserRanking = ({ user, key }: Props) => {
  return (
    <ListItem key={key}>
      <ListItemAvatar>
        <Avatar
          sx={{ bgcolor: "warning.light", color: "warning.contrastText" }}
        >
          {key}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={user.name} />
    </ListItem>
  );
};

export default UserRanking;
