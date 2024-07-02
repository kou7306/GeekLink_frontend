"use client";
import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab, createTheme, ThemeProvider } from "@mui/material";
import LikedUsers from "@/components/like/LikedUsers";
import MatchingUsers from "@/components/like/MatchingUsers";
import LikedByUsers from "@/components/like/LikedByUsers";
import axios from "axios";
import { User } from "@/components/profile/options"; // ユーザータイプの定義をインポート
import { getUuidFromCookie } from "@/actions/users";

const theme = createTheme({
  palette: {
    primary: {
      main: "#22d3ee",
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: "1.2rem", // タブの文字サイズを大きくする
          padding: "1rem", // タブのパディングを増やす
        },
      },
    },
  },
});

const Page = () => {
  const [value, setValue] = useState(0);
  const [likedUsers, setLikedUsers] = useState<User[]>([]);
  const [matchingUsers, setMatchingUsers] = useState<User[]>([]);
  const [likedByUsers, setLikedByUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uuid = getUuidFromCookie();

        // マッチングユーザーの取得
        const matchingUsersResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/get-matching-users`,
          { uuid }
        );
        setMatchingUsers(matchingUsersResponse.data);

        // 自分がLikeしたユーザーの取得
        const likedUsersResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/likes/get-liked-users`,
          { uuid }
        );
        setLikedUsers(likedUsersResponse.data);

        // 自分をLikeしたが、マッチしていないユーザーの取得
        const likedByUsersResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/likes/get-users-who-liked-me`,
          {
            uuid,
            matchingUserIds: matchingUsersResponse.data.map((user: User) => user.user_id),
          }
        );
        setLikedByUsers(likedByUsersResponse.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={handleChange} centered sx={{ color: "#22d3ee" }}>
          <Tab label="いいね" />
          <Tab label="マッチング中" />
          <Tab label="いいねされた" />
        </Tabs>
      </Box>
      {value === 0 && <LikedUsers users={likedUsers} />}
      {value === 1 && <MatchingUsers users={matchingUsers} />}
      {value === 2 && <LikedByUsers users={likedByUsers} />}
    </ThemeProvider>
  );
};

export default Page;
