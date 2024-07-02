import { Box } from "@mui/material";
import React from "react";
import OccupationButton from "./OccupationButton";

const Occupation = () => {
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
          職業で探す
        </Box>
        <Box pt={1} pb={3}>
          <OccupationButton />
        </Box>
      </Box>
    </>
  );
};

export default Occupation;
