"use client";
import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Link,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { getMatchingUser } from "../../utils/getMatchingUser";

export interface User {
  user_id: string;
  name: string;
  img_url: string;
  language: string;
  age: number;
  sex: string;
}

const FollowerList = () => {
  const [matchingUsers, setMatchingUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getMatchingUser();
        setMatchingUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []); // Ensure to run fetchData only once on mount

  return (
    <div>
      <h2>相互フォローのユーザー</h2>
      <List>
        {matchingUsers.slice(0, 5).map((user) => (
          <Link
            key={user.user_id}
            href={`/my-page/${user.user_id}`}
            underline="none"
            sx={{ color: "text.primary" }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  src={user.img_url || "/user.svg"}
                  alt={`${user.name}'s icon`}
                />
              </ListItemAvatar>
              <ListItemText
                primary={user.name}
                sx={{ color: "text.primary" }}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
};

export default FollowerList;
