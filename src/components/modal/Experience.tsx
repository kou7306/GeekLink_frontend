import { Box } from "@mui/material";
import React from "react";
import ExperienceButton from "./ExperienceButton";

type Props = {
  handleExperienceClick: (place: string) => void;
  selectedExperiences: string[];
};

const Experience: React.FC<Props> = ({
  handleExperienceClick,
  selectedExperiences,
}) => {
  return (
    <>
      <Box>
        <Box
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            borderBottom: "1px solid primary.main",
            paddingBottom: "4px",
            marginBottom: "8px",
          }}
        >
          経験で探す
        </Box>
        <Box pt={1} pb={3}>
          <ExperienceButton
            handleExperienceClick={handleExperienceClick}
            selectedExperiences={selectedExperiences}
          />
        </Box>
      </Box>
    </>
  );
};

export default Experience;
