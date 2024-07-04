import { Box } from "@mui/material";
import React from "react";
import GraduateButton from "./GraduateButton";

type Props = {
  handleGraduateClick: (place: string) => void;
  selectedGraduates: string[];
};

const Graduate: React.FC<Props> = ({
  handleGraduateClick,
  selectedGraduates,
}) => {
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
          卒業年度で探す
        </Box>
        <Box pt={1} pb={3}>
          <GraduateButton
            handleGraduateClick={handleGraduateClick}
            selectedGraduates={selectedGraduates}
          />
        </Box>
      </Box>
    </>
  );
};

export default Graduate;
