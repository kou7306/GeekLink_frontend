import { Box } from "@mui/material";
import React from "react";
import OccupationButton from "./OccupationButton";

type Props = {
  handleOccupationClick: (occupation: string) => void;
  selectedOccupations: string[];
};

const Occupation: React.FC<Props> = ({
  handleOccupationClick,
  selectedOccupations,
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
          職業で探す
        </Box>
        <Box pt={1} pb={3}>
          <OccupationButton
            handleOccupationClick={handleOccupationClick}
            selectedOccupations={selectedOccupations}
          />
        </Box>
      </Box>
    </>
  );
};

export default Occupation;
