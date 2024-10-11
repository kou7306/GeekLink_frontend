import { Box, Button } from "@mui/material";
import React from "react";

interface Props {
  onClick: () => void;
}

const SearchButton = (props: Props) => {
  const { onClick } = props;
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      <Button
        onClick={onClick}
        variant="contained"
        sx={{
          backgroundColor: "primary.main",
          color: "background.default",
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
