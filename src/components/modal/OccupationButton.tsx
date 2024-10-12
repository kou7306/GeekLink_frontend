import { Button } from "@mui/material";
import React from "react";
import { occupations } from "../profile/options";

type Props = {
  handleOccupationClick: (occupation: string) => void;
  selectedOccupations: string[];
};

const OccupationButton: React.FC<Props> = ({
  handleOccupationClick,
  selectedOccupations,
}) => {
  return (
    <>
      <>
        {occupations.map((occupation) => (
          <Button
            key={occupation}
            onClick={() => {
              handleOccupationClick(occupation);
            }}
            sx={{
              ...BoxStyle,
              backgroundColor: selectedOccupations.includes(occupation)
                ? "primary.main" // 選択後の背景色
                : "warning.main", // 選択前の背景色
              color: selectedOccupations.includes(occupation)
                ? "black" // 選択後のテキスト色
                : "text.primary", // 選択前のテキスト色
              "&:hover": {
                backgroundColor: selectedOccupations.includes(occupation)
                  ? "#31def7"
                  : "primary.main", // 選択前のホバー背景色をprimary.mainに
              },
            }}
          >
            {occupation}
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

export default OccupationButton;
