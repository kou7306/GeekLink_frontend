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
                ? "primary.main" // 選択後の背景色
                : "warning.main", // 選択前の背景色
              color: selectedGraduates.includes(graduateOption)
                ? "black" // 選択後のテキスト色
                : "text.primary", // 選択前のテキスト色
              textTransform: "none",
              "&:hover": {
                backgroundColor: selectedGraduates.includes(graduateOption)
                  ? "#31def7"
                  : "primary.main", // 選択前のホバー背景色をprimary.mainに
              },
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
  border: "1px solid text.primary",
  borderRadius: "8px",
  padding: "8px 16px",
  display: "inline-block",
  color: "text.primary",
  textAlign: "center",
  marginX: 1,
  marginBottom: 1,
};

export default GraduateButton;
