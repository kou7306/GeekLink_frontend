import { Box, CircularProgress } from "@mui/material";
import React from "react";

export default function ComponentLoading() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      <CircularProgress />
    </Box>
  );
}
