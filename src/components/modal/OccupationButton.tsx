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
                ? "#25276D"
                : "white",
              color: selectedOccupations.includes(occupation)
                ? "white"
                : "#25276D",
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
  border: "1px solid #25276D",
  borderRadius: "8px",
  padding: "8px 16px",
  display: "inline-block",
  color: "#25276D",
  textAlign: "center",
  marginX: 1,
  marginBottom: 1,
};

export default OccupationButton;
