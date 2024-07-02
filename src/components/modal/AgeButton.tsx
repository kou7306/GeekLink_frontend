import { Button } from "@mui/material";
import React from "react";

type Props = {
  handleAgeClick: (place: string) => void;
  selectedAges: string[];
};

const AgeButton: React.FC<Props> = ({ handleAgeClick, selectedAges }) => {
  const ageGroups = ["~14歳", "15~17歳", "18~22歳", "23~29歳", "30歳~"];
  return (
    <>
      {ageGroups.map((ageGroup) => (
        <Button
          key={ageGroup}
          onClick={() => handleAgeClick(ageGroup)}
          sx={{
            ...BoxStyle,
            backgroundColor: selectedAges.includes(ageGroup)
              ? "#22d3ee"
              : "white",
            color: selectedAges.includes(ageGroup) ? "white" : "#22d3ee",
          }}
        >
          {ageGroup}
        </Button>
      ))}
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
};

export default AgeButton;
