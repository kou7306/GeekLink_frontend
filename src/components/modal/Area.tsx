import { Box } from "@mui/material";
import React from "react";
import AreaButton from "./AreaButton";

const Area = () => {
  return (
    <>
      <Box>
        <Box
          sx={{
            fontWeight: "bold",
            color: "#22d3ee",
            borderBottom: "1px solid #22d3ee",
            paddingBottom: "4px",
            marginBottom: "8px",
          }}
        >
          エリアで探す
        </Box>
        <Box pt={1} pb={3}>
          <AreaButton />
        </Box>
      </Box>
    </>
  );
};

export default Area;
