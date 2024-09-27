import React from "react";
import { Box } from "@mui/material";
import Sort from "./Sort";
import Search from "./Search";

const Options = () => {
  return (
    <>
      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mr: 8 }}>
        <Sort />
        <Search />
      </Box>
    </>
  );
};

export default Options;
