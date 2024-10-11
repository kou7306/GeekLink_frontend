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
      {Array.isArray(chipsData(chipOption) ?? []) &&
      (chipsData(chipOption) ?? []).length > 0 ? (
        (chipsData(chipOption) as string[]).map((tech) => (
          <Chip
            key={tech}
            label={tech}
            size="small"
            sx={{
              backgroundColor: "primary.main", // Chipの背景色をprimary.mainに設定
              color: "black", // 文字色を白に設定
            }}
          />
        ))
      ) : (
        <Chip label="-" size="small" sx={{ visibility: "hidden" }} /> // チップがない場合は隠す
      )}
    </Box>
  );
};

export default Chips;
