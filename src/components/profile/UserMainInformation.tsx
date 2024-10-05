import React from "react";
import TechStack from "./TechStack";
import BasicInformation from "./BasicInformation";
import EngineerInformation from "./EngineerInformation";
import OtherInformation from "./OtherInformation";
import { User } from "./options";
import { Box } from "@mui/material";

type Props = {
  user: User;
};

const UserMainInformation = ({ user }: Props) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TechStack top_teches={user.top_teches} teches={user.teches} />
      <BasicInformation user={user} />
      <EngineerInformation user={user} />
      <OtherInformation user={user} />
    </Box>
  );
};

export default UserMainInformation;
