import { Button } from "@mui/material";
import React from "react";
import { experienceOptions } from "../profile/options";

const ExperienceButton = () => {
  return (
    <>
      <>
        {experienceOptions.map((experienceOption) => (
          <Button sx={BoxStyle}>{experienceOption}</Button>
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

export default ExperienceButton;
