import { Button } from "@mui/material";
import React from "react";
import { experienceOptions } from "../profile/options";

type Props = {
  handleExperienceClick: (place: string) => void;
  selectedExperiences: string[];
};

const ExperienceButton: React.FC<Props> = ({
  handleExperienceClick,
  selectedExperiences,
}) => {
  return (
    <>
      <>
        {experienceOptions.map((experienceOption) => (
          <Button
            key={experienceOption}
            onClick={() => handleExperienceClick(experienceOption)}
            sx={{
              ...BoxStyle,
              backgroundColor: selectedExperiences.includes(experienceOption)
                ? "primary.main"
                : "background.default",
              color: selectedExperiences.includes(experienceOption)
                ? "background.default"
                : "primary.main",
            }}
          >
            {experienceOption}
          </Button>
        ))}
      </>
    </>
  );
};

const BoxStyle = {
  border: "1px solid primary.main",
  borderRadius: "8px",
  padding: "8px 16px",
  display: "inline-block",
  color: "primary.main",
  textAlign: "center",
  marginX: 1,
  marginBottom: 1,
};

export default ExperienceButton;
