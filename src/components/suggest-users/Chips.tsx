import { Box, Chip } from "@mui/material";
import React from "react";
import { Profile } from "../../../types/user";

type Props = {
  user: Profile;
  chipOption:
    | "overAll"
    | "sameTech"
    | "samePlace"
    | "sameAge"
    | "sameGraduate"
    | "sameDesiredOccupation"
    | "sameTech";
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
      }}
    >
      {chipOption === "sameTech" &&
        Array.isArray(chipsData(chipOption)) &&
        (chipsData(chipOption) as string[]).map((tech) => (
          <Chip key={tech} label={tech} size="small" />
        ))}
      {chipOption === "overAll" &&
        Array.isArray(chipsData(chipOption)) &&
        (chipsData(chipOption) as string[]).map((tech) => (
          <Chip key={tech} label={tech} size="small" />
        ))}
      {chipOption !== "sameTech" && chipOption !== "overAll" && (
        <Chip label={chipsData(chipOption)} size="small" />
      )}
    </Box>
  );
};

export default Chips;
