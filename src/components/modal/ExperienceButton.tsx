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
                ? "#25276D"
                : "white",
              color: selectedExperiences.includes(experienceOption)
                ? "white"
                : "#25276D",
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
  border: "1px solid #25276D",
  borderRadius: "8px",
  padding: "8px 16px",
  display: "inline-block",
  color: "#25276D",
  textAlign: "center",
  marginX: 1,
  marginBottom: 1,
};

export default ExperienceButton;
