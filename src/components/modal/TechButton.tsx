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
              ? "primary.main" // 選択後の背景色
              : "warning.main", // 選択前の背景色
            color: selectedFirstTechs.includes(technology)
              ? "black" // 選択後のテキスト色
              : "text.primary", // 選択前のテキスト色
            textTransform: "none",
            "&:hover": {
              backgroundColor: selectedFirstTechs.includes(technology)
                ? "#31def7"
                : "primary.main", // 選択前のホバー背景色をprimary.mainに
            },
          }}
        >
          {technology}
        </Button>
      ))}
    </>
  );
};

const BoxStyle = {
  border: "1px solid text.primary",
  borderRadius: "8px",
  padding: "8px 16px",
  display: "inline-block",
  color: "text.primary",
  textAlign: "center",
  marginX: 1,
  marginBottom: 1,
};

export default AreaButton;
