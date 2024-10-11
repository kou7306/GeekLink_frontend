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
                ? "primary.main"
                : "background.default",
              color: selectedOccupations.includes(occupation)
                ? "background.default"
                : "primary.main",
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
  border: "1px solid primary.main",
  borderRadius: "8px",
  padding: "8px 16px",
  display: "inline-block",
  color: "primary.main",
  textAlign: "center",
  marginX: 1,
  marginBottom: 1,
};

export default OccupationButton;
