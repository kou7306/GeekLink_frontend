import { Box } from "@mui/material";
import React from "react";
import AgeButton from "./AgeButton";

type Props = {
  handleAgeClick: (place: string) => void;
  selectedAges: string[];
};

const Age: React.FC<Props> = ({ handleAgeClick, selectedAges }) => {
  return (
    <>
      <Box>
        <Box
          sx={{
            fontWeight: "bold",
            color: "#25276D",
            borderBottom: "1px solid #25276D",
            paddingBottom: "4px",
            marginBottom: "8px",
          }}
        >
          年齢で探す
        </Box>
        <Box pt={1} pb={3}>
          <AgeButton
            handleAgeClick={handleAgeClick}
            selectedAges={selectedAges}
          />
        </Box>
      </Box>
    </>
  );
};

export default Age;
