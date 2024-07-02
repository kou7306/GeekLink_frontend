import { Box } from "@mui/material";
import React from "react";
import DesiredOccupationButton from "./DesiredOccupationButton";

const DesiredOccupation = () => {
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
          希望職種で探す
        </Box>
        <Box pt={1} pb={3}>
          <DesiredOccupationButton />
        </Box>
      </Box>
    </>
  );
};

export default DesiredOccupation;
