import React from "react";
import { graduateOptions } from "../profile/options";
import { Button } from "@mui/material";

const GraduateButton = () => {
  return (
    <>
      <>
        {graduateOptions.map((graduateOption) => (
          <Button key={graduateOption} sx={BoxStyle}>
            {graduateOption}
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

export default GraduateButton;
