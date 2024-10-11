import { Box, Button, Checkbox } from "@mui/material";
import React, { useState } from "react";
import { areaPlaces } from "../profile/options";

type Props = {
  handlePlaceClick: (place: string) => void;
  selectedPlaces: string[];
};

const AreaButton: React.FC<Props> = ({ handlePlaceClick, selectedPlaces }) => {
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  const handlePlaceClickWithToggle = (place: string) => {
    if (selectedPlaces.includes(place)) {
      handlePlaceClick(place);
    } else {
      handlePlaceClick(place);
    }
  };

  const handleAreaCheckboxClick = (area: string, places: string[]) => {
    const isSelected = selectedAreas.includes(area);
    if (isSelected) {
      setSelectedAreas(selectedAreas.filter((a) => a !== area));
      places.forEach((place) => {
        if (selectedPlaces.includes(place)) {
          handlePlaceClick(place);
        }
      });
    } else {
      setSelectedAreas([...selectedAreas, area]);
      places.forEach((place) => {
        if (!selectedPlaces.includes(place)) {
          handlePlaceClick(place);
        }
      });
    }
  };
  return (
    <>
      {Object.entries(areaPlaces).map(([area, places]) => (
        <Box key={area} marginBottom="16px">
          <Box display={"flex"} alignItems={"flex-end"}>
            <Checkbox
              checked={selectedAreas.includes(area)}
              onChange={() => handleAreaCheckboxClick(area, places)}
              sx={{
                marginBottom: "3px",
                color: "primary.main",
                "&.Mui-checked": {
                  color: "primary.main",
                },
              }}
            />
            <Box
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "primary.main",
                paddingBottom: "4px",
                marginBottom: "8px",
              }}
            >
              {area}
            </Box>
          </Box>
          {places.map((place) => (
            <Button
              key={place}
              onClick={() => handlePlaceClickWithToggle(place)}
              sx={{
                ...BoxStyle,
                backgroundColor: selectedPlaces.includes(place)
                  ? "primary.main"
                  : "background.default",
                color: selectedPlaces.includes(place)
                  ? "background.default"
                  : "primary.main",
                textTransform: "none",
              }}
            >
              {place}
            </Button>
          ))}
        </Box>
      ))}
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

export default AreaButton;
