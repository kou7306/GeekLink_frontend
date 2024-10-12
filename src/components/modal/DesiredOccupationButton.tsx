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
                ? "primary.main" // 選択後の背景色
                : "warning.main", // 選択前の背景色
              color: selectedDesiredOccupations.includes(
                desiredOccupationOption
              )
                ? "black" // 選択後のテキスト色
                : "text.primary", // 選択前のテキスト色
              textTransform: "none",
              "&:hover": {
                backgroundColor: selectedDesiredOccupations.includes(
                  desiredOccupationOption
                )
                  ? "#31def7"
                  : "primary.main", // 選択前のホバー背景色をprimary.mainに
              },
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
  border: "1px solid text.primary",
  borderRadius: "8px",
  padding: "8px 16px",
  display: "inline-block",
  color: "text.primary",
  textAlign: "center",
  marginX: 1,
  marginBottom: 1,
};

export default DesiredOccupationButton;
