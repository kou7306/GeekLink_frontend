import { Button } from "@mui/material";
import React from "react";
import { places } from "../profile/options";

const AreaButton = () => {
  return (
    <>
      {places.map((place) => (
        <Button key={place} sx={BoxStyle}>
          {place}
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
  marginBottom: 1,
};

export default AreaButton;
