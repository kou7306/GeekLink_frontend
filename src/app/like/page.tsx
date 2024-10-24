"use client";
import React, { useState } from "react";
import { Box, Tabs, Tab, createTheme, ThemeProvider } from "@mui/material";
import LikedUsers from "@/components/like/LikedUsers";
import MatchingUsers from "@/components/like/MatchingUsers";
import LikedByUsers from "@/components/like/LikedByUsers";
import { getUuidFromCookie } from "@/actions/users";
import { useQuery } from "@tanstack/react-query";

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

  //ログイン中のユーザーのフォロー、フォロワー情報を取得
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const uuid = await getUuidFromCookie();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/follow/get-follows`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uuid,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }
      return response.json();
    },
  });

  console.log(data);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          sx={{ color: "#22d3ee" }}
        >
          <Tab label="フォロー中" />
          <Tab label="相互フォロー" />
          <Tab label="フォロワー" />
        </Tabs>
      </Box>
      {data && value === 0 && <LikedUsers follows={data.follows} />}
      {data && value === 1 && (
        <MatchingUsers follows={data.follows} followers={data.followers} />
      )}
      {data && value === 2 && <LikedByUsers followers={data.followers} />}
    </ThemeProvider>
  );
};

export default Page;
