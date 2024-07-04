import { Box, Button } from "@mui/material";
import React from "react";

const SearchButton = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#25276D",
          color: "white",
          borderRadius: "8px",
          padding: "8px 16px",
          "&:hover": {
            backgroundColor: "#1f235a",
          },
        }}
      >
        検索
      </Button>
    </Box>
  );
};

export default SearchButton;
