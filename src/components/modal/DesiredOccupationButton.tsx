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
                ? "primary.main"
                : "background.default",
              color: selectedDesiredOccupations.includes(
                desiredOccupationOption
              )
                ? "background.default"
                : "primary.main",
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
  border: "1px solid primary.main",
  borderRadius: "8px",
  padding: "8px 16px",
  display: "inline-block",
  color: "primary.main",
  textAlign: "center",
  marginX: 1,
  marginBottom: 1,
};

export default DesiredOccupationButton;
