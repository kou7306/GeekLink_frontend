import { Box } from "@mui/material";
import React from "react";
import TechButton from "./TechButton";

type Props = {
  handleFirstTechClick: (firstTech: string) => void;
  selectedFirstTechs: string[];
};

const Tech: React.FC<Props> = ({
  handleFirstTechClick,
  selectedFirstTechs,
}) => {
  return (
    <>
      <Box>
        <Box
          sx={{
            fontWeight: "bold",
            color: "text.primary",
            borderBottom: "1px solid text.primary",
            paddingBottom: "4px",
            marginBottom: "8px",
          }}
        >
          技術で探す
        </Box>
        <Box pt={1} pb={3}>
          <TechButton
            handleFirstTechClick={handleFirstTechClick}
            selectedFirstTechs={selectedFirstTechs}
          />
        </Box>
      </Box>
    </>
  );
};

export default Tech;
