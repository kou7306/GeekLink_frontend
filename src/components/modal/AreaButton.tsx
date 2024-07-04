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
              ? "#25276D"
              : "white",
            color: selectedPlaces.includes(place) ? "white" : "#25276D",
          }}
        >
          {place}
        </Button>
      ))}
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

export default AreaButton;
