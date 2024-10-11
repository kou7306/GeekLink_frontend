import { Button } from "@mui/material";
import React from "react";
import { technologies } from "../profile/options";

type Props = {
  handleFirstTechClick: (firstTech: string) => void;
  selectedFirstTechs: string[];
};

const AreaButton: React.FC<Props> = ({
  handleFirstTechClick,
  selectedFirstTechs,
}) => {
  return (
    <>
      {technologies.map((technology) => (
        <Button
          key={technology}
          onClick={() => handleFirstTechClick(technology)}
          sx={{
            ...BoxStyle,
            backgroundColor: selectedFirstTechs.includes(technology)
              ? "primary.main"
              : "background.default",
            color: selectedFirstTechs.includes(technology)
              ? "background.default"
              : "primary.main",
            textTransform: "none",
          }}
        >
          {technology}
        </Button>
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
