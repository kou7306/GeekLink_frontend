import { Button } from "@mui/material";
import React from "react";

type Props = {
  handleAgeClick: (place: string) => void;
  selectedAges: string[];
};

const AgeButton: React.FC<Props> = ({ handleAgeClick, selectedAges }) => {
  const ageGroups = [
    "15歳",
    "16歳",
    "17歳",
    "18歳",
    "19歳",
    "20歳",
    "21歳",
    "22歳",
    "23歳",
    "24歳",
    "25歳",
    "26歳",
    "27歳",
    "28歳",
  ];
  return (
    <>
      {ageGroups.map((ageGroup) => {
        const ageNumber = ageGroup.replace("歳", "");
        return (
          <Button
            key={ageGroup}
            onClick={() => handleAgeClick(ageGroup)}
            sx={{
              ...BoxStyle,
              backgroundColor: selectedAges.includes(ageNumber)
                ? "primary.main"
                : "background.default",
              color: selectedAges.includes(ageNumber)
                ? "background."
                : "primary.main",
            }}
          >
            {ageGroup}
          </Button>
        );
      })}
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

export default AgeButton;
