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
                ? "#25276D"
                : "white",
              color: selectedDesiredOccupations.includes(
                desiredOccupationOption
              )
                ? "white"
                : "#25276D",
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
  border: "1px solid #25276D",
  borderRadius: "8px",
  padding: "8px 16px",
  display: "inline-block",
  color: "#25276D",
  textAlign: "center",
  marginX: 1,
  marginBottom: 1,
};

export default DesiredOccupationButton;
