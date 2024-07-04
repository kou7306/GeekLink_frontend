import { Box, Button } from "@mui/material";
import React from "react";
import { areaPlaces, places } from "../profile/options";

type Props = {
  handlePlaceClick: (place: string) => void;
  selectedPlaces: string[];
};

const AreaButton: React.FC<Props> = ({ handlePlaceClick, selectedPlaces }) => {
  return (
    <>
      {Object.entries(areaPlaces).map(([area, places]) => (
        <div key={area} style={{ marginBottom: "16px" }}>
          <Box
            sx={{
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#25276D",
              paddingBottom: "4px",
              marginBottom: "8px",
              marginLeft: "8px",
            }}
          >
            {area}
          </Box>
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
                textTransform: "none",
              }}
            >
              {place}
            </Button>
          ))}
        </div>
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
