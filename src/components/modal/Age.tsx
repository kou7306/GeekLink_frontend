import { Box } from "@mui/material";
import React from "react";
import AgeButton from "./AgeButton";

const Age = () => {
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
          年齢層で探す
        </Box>
        <Box pt={1} pb={3}>
          <AgeButton />
        </Box>
      </Box>
    </>
  );
};

export default Age;
