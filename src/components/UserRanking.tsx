import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React from "react";

type User = {
  id: number;
  name: string;
};

type Props = {
  user: User;
};

const UserRanking = ({ user }: Props) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar
          sx={{ bgcolor: "warning.light", color: "warning.contrastText" }}
        ></Avatar>
      </ListItemAvatar>
      <ListItemText primary={user.name} />
    </ListItem>
  );
};

export default UserRanking;
