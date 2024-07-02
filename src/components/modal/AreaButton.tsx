import { Button } from "@mui/material";
import React from "react";
import { places } from "../profile/options";

type Props = {
  handlePlaceClick: (place: string) => void;
  selectedPlaces: string[];
};

const AreaButton: React.FC<Props> = ({ handlePlaceClick, selectedPlaces }) => {
  return (
    <>
      {places.map((place) => (
        <Button
          key={place}
          onClick={() => handlePlaceClick(place)}
          sx={{
            ...BoxStyle,
            backgroundColor: selectedPlaces.includes(place)
              ? "#22d3ee"
              : "white",
            color: selectedPlaces.includes(place) ? "white" : "#22d3ee",
          }}
        >
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
