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
                ? "#22d3ee"
                : "white",
              color: selectedGraduates.includes(graduateOption)
                ? "white"
                : "#22d3ee",
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
  border: "1px solid #22d3ee",
  borderRadius: "8px",
  padding: "8px 16px",
  display: "inline-block",
  color: "#22d3ee",
  textAlign: "center",
  marginX: 1,
  marginBottom: 1,
};

export default GraduateButton;
