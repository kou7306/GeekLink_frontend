import { Button } from "@mui/material";
import React from "react";
import { desiredOccupationOptions } from "../profile/options";

type Props = {
  handleDesiredOccupationClick: (place: string) => void;
  selectedDesiredOccupations: string[];
};

const DesiredOccupationButton: React.FC<Props> = ({
  handleDesiredOccupationClick,
  selectedDesiredOccupations,
}) => {
  return (
    <>
      <>
        {desiredOccupationOptions.map((desiredOccupationOption) => (
          <Button
            key={desiredOccupationOption}
            onClick={() =>
              handleDesiredOccupationClick(desiredOccupationOption)
            }
            sx={{
              ...BoxStyle,
              backgroundColor: selectedDesiredOccupations.includes(
                desiredOccupationOption
              )
                ? "#22d3ee"
                : "white",
              color: selectedDesiredOccupations.includes(
                desiredOccupationOption
              )
                ? "white"
                : "#22d3ee",
            }}
          >
            {desiredOccupationOption}
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

export default DesiredOccupationButton;
