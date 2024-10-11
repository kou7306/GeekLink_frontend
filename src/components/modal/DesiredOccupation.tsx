import { Box } from "@mui/material";
import React from "react";
import DesiredOccupationButton from "./DesiredOccupationButton";

type Props = {
  handleDesiredOccupationClick: (place: string) => void;
  selectedDesiredOccupations: string[];
};

const DesiredOccupation: React.FC<Props> = ({
  handleDesiredOccupationClick,
  selectedDesiredOccupations,
}) => {
  return (
    <>
      <Box>
        <Box
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            borderBottom: "1px solid primary.main",
            paddingBottom: "4px",
            marginBottom: "8px",
          }}
        >
          希望職種で探す
        </Box>
        <Box pt={1} pb={3}>
          <DesiredOccupationButton
            handleDesiredOccupationClick={handleDesiredOccupationClick}
            selectedDesiredOccupations={selectedDesiredOccupations}
          />
        </Box>
      </Box>
    </>
  );
};

export default DesiredOccupation;
