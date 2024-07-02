import { Box } from "@mui/material";
import React from "react";
import ExperienceButton from "./ExperienceButton";

const Experience = () => {
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
          経験で探す
        </Box>
        <Box pt={1} pb={3}>
          <ExperienceButton />
        </Box>
      </Box>
    </>
  );
};

export default Experience;
