import { Box, Chip } from "@mui/material";
import React from "react";
import { Profile } from "../../types/user";

type Props = {
  user: Profile;
  chipOption:
    | "overAll"
    | "sameTech"
    | "samePlace"
    | "sameAge"
    | "sameGraduate"
    | "sameDesiredOccupation";
};
const Chips = ({ user, chipOption }: Props) => {
  const chipsData = (chipOption: string) => {
    switch (chipOption) {
      case "overAll":
        return user.top_teches;
      case "sameTech":
        return user.top_teches;
      case "samePlace":
        return user.place;
      case "sameAge":
        return user.age;
      case "sameGraduate":
        return user.graduate;
      case "sameDesiredOccupation":
        return user.desired_occupation;
      default:
        return [];
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "4px",
        marginBottom: "12px",
        minHeight: "40px", // 固定の最小高さを設定
        alignItems: "center", // チップがない場合も中央に揃える
      }}
    >
      {chipOption === "sameTech" &&
        Array.isArray(chipsData(chipOption)) &&
        (chipsData(chipOption) as string[]).map((tech) => (
          <Chip
            key={tech}
            label={tech}
            size="small"
            sx={{ backgroundColor: "primary.main" }}
          />
        ))}
      {chipOption === "overAll" &&
        Array.isArray(chipsData(chipOption)) &&
        (chipsData(chipOption) as string[]).map((tech) => (
          <Chip
            key={tech}
            label={tech}
            size="small"
            sx={{ backgroundColor: "primary.main" }}
          />
        ))}
      {chipOption === "sameAge" && (
        <Chip
          label={`${chipsData(chipOption)}歳`}
          size="small"
          sx={{ backgroundColor: "primary.main" }}
        />
      )}
      {chipOption !== "sameTech" &&
        chipOption !== "overAll" &&
        chipOption !== "sameAge" && (
          <Chip
            label={chipsData(chipOption)}
            size="small"
            sx={{ backgroundColor: "primary.main" }}
          />
        )}
    </Box>
  );
};

export default Chips;
