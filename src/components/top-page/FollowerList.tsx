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
            sx={{
              color: "text.primary",
              display: "block", // ブロック要素にすることで全体をクリック可能にする
              padding: "8px", // パディングを追加（必要に応じて調整）
              borderRadius: "4px", // 角を丸くする
              "&:hover": {
                backgroundColor: "info.main", // ホバー時の背景色
              },
            }}
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
