"use client";
import React, { useState } from "react";
import { Box, Tabs, Tab, createTheme, ThemeProvider } from "@mui/material";
import LikedUsers from "@/components/like/LikedUsers";
import MatchingUsers from "@/components/like/MatchingUsers";
import LikedByUsers from "@/components/like/LikedByUsers";
import { getUuidFromCookie } from "@/actions/users";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

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
  const value = useSearchParams().get("tab") || "follows";

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

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("tab", newValue);
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState(null, "", newUrl);
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
          <Tab label="フォロー中" value="follows" />
          <Tab label="相互フォロー" value="mutual" />
          <Tab label="フォロワー" value="followers" />
        </Tabs>
      </Box>
      {data && value === "follows" && <LikedUsers follows={data.follows} />}
      {data && value === "mutual" && (
        <MatchingUsers follows={data.follows} followers={data.followers} />
      )}
      {data && value === "followers" && (
        <LikedByUsers followers={data.followers} />
      )}
    </ThemeProvider>
  );
};

export default Page;
