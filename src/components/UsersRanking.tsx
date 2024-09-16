import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React from "react";
import UserRanking from "./UserRanking";

const UsersRanking = () => {
  const users = [
    { id: 1, name: "ユーザー1" },
    { id: 2, name: "ユーザー2" },
    { id: 3, name: "ユーザー3" },
  ];

  return (
    <List disablePadding>
      {users.map((user) => (
        <UserRanking key={user.id} user={user} />
      ))}
    </List>
  );
};

export default UsersRanking;
