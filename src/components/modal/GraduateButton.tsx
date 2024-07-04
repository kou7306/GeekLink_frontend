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
                ? "#25276D"
                : "white",
              color: selectedGraduates.includes(graduateOption)
                ? "white"
                : "#25276D",
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
  border: "1px solid #25276D",
  borderRadius: "8px",
  padding: "8px 16px",
  display: "inline-block",
  color: "#25276D",
  textAlign: "center",
  marginX: 1,
  marginBottom: 1,
};

export default GraduateButton;
