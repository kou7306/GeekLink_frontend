import { Box, Button, Checkbox } from "@mui/material";
import React, { useState } from "react";
import { areaPlaces } from "../profile/options";
import { lighten } from "@mui/system"; // MUIのlighten関数を使用

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
                color: "text.primary",
                "&.Mui-checked": {
                  color: "text.primary",
                },
              }}
            />
            <Box
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "text.primary",
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
                  ? "primary.main" // 選択後の背景色
                  : "warning.main", // 選択前の背景色
                color: selectedPlaces.includes(place)
                  ? "black" // 選択後のテキスト色
                  : "text.primary", // 選択前のテキスト色
                textTransform: "none",
                "&:hover": {
                  backgroundColor: selectedPlaces.includes(place)
                    ? "#31def7"
                    : "primary.main", // 選択前のホバー背景色をprimary.mainに
                },
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
  borderRadius: "8px",
  padding: "8px 16px",
  display: "inline-block",
  textAlign: "center",
  marginX: 1,
  marginBottom: 1,
};

export default AreaButton;
