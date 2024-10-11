"use client";
import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Link,
  CircularProgress,
  Box,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Profile } from "@/types/user";
import { getSuggestUser } from "@/utils/getSuggestUser";
import ComponentLoading from "../core/ComponentLoading";

const SuggestUserList = () => {
  const [suggestUsers, setSuggestUsers] = useState<
    { user: Profile; score: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const users = await getSuggestUser();
        if (users?.sortedUsers) {
          setSuggestUsers(users.sortedUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Fetch data only on component mount

  if (isLoading) {
    return <ComponentLoading />;
  }

  return (
    <div>
      <h2>おすすめのユーザー</h2>
      <List>
        {suggestUsers.slice(0, 5).map((userData) => (
          <Link
            key={userData.user.user_id}
            href={`/my-page/${userData.user.user_id}`}
            underline="none"
            sx={{ color: "black" }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  src={userData.user.image_url || "/user.svg"}
                  alt={`${userData.user.name}'s icon`}
                />
              </ListItemAvatar>
              <ListItemText primary={userData.user.name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
};

export default SuggestUserList;
