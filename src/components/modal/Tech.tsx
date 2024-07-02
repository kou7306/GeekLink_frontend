import { Box } from "@mui/material";
import React from "react";

const Tech = () => {
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
          技術で探す
        </Box>
        <Box pt={1} pb={3}>
          {/* <AgeButton /> */}
        </Box>
      </Box>
    </>
  );
};

export default Tech;
