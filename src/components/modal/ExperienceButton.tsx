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
                ? "primary.main" // 選択後の背景色
                : "warning.main", // 選択前の背景色
              color: selectedExperiences.includes(experienceOption)
                ? "black" // 選択後のテキスト色
                : "text.primary", // 選択前のテキスト色
              textTransform: "none",
              "&:hover": {
                backgroundColor: selectedExperiences.includes(experienceOption)
                  ? "#31def7"
                  : "primary.main", // 選択前のホバー背景色をprimary.mainに
              },
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
  border: "1px solid text.primary",
  borderRadius: "8px",
  padding: "8px 16px",
  display: "inline-block",
  color: "text.primary",
  textAlign: "center",
  marginX: 1,
  marginBottom: 1,
};

export default ExperienceButton;
