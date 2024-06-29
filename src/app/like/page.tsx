"use client";
import React, { useState } from "react";
import LikedUsers from "./components/LikedUsers.tsx/page";
import MatchingUsers from "./components/MatchingUsers.tsx/page";
import { Box, Tabs, Tab, createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#22d3ee",
    },
  },
});

const Page = () => {
  const [value, setValue] = React.useState(0);

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
          <Tab label="いいね" />
          <Tab label="マッチング中" />
        </Tabs>
      </Box>
      {value === 0 ? <LikedUsers /> : <MatchingUsers />}
    </ThemeProvider>
  );
};

export default Page;
