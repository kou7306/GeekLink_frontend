import { Box } from "@mui/material";
import React from "react";

const Title = () => {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "background.default",
        padding: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.25rem",
        fontWeight: "bold",
      }}
    >
      <Box component="span" sx={{ display: "flex", alignItems: "center" }}>
        <Box component="span" sx={{ marginRight: "8px" }}></Box>
        絞り込み
      </Box>
    </Box>
  );
};

export default Title;
