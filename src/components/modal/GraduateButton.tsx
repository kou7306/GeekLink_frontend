import React from "react";
import { graduateOptions } from "../profile/options";
import { Button } from "@mui/material";

type Props = {
  handleGraduateClick: (place: string) => void;
  selectedGraduates: string[];
};

const GraduateButton: React.FC<Props> = ({
  handleGraduateClick,
  selectedGraduates,
}) => {
  return (
    <>
      <>
        {graduateOptions.map((graduateOption) => (
          <Button
            key={graduateOption}
            onClick={() => handleGraduateClick(graduateOption)}
            sx={{
              ...BoxStyle,
              backgroundColor: selectedGraduates.includes(graduateOption)
                ? "primary.main"
                : "background.default",
              color: selectedGraduates.includes(graduateOption)
                ? "background.default"
                : "primary.main",
            }}
          >
            {graduateOption}
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

export default GraduateButton;
