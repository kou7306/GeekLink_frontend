import React from "react";
import TechStack from "./TechStack";
import BasicInformation from "./BasicInformation";
import EngineerInformation from "./EngineerInformation";
import OtherInformation from "./OtherInformation";
import { User } from "./options";
import { Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

type Props = {
  user: User;
  onEdit?: () => void;
  isMe: boolean;
};

const UserMainInformation = ({ user, onEdit, isMe }: Props) => {
  return (
    <Box display="flex" flexDirection="row" gap={2}>
      <Box>
        <TechStack top_teches={user.top_teches} teches={user.teches} />
        <BasicInformation user={user} />
        <EngineerInformation user={user} />
        <OtherInformation user={user} />
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        {isMe && (
          <EditIcon
            onClick={onEdit}
            sx={{ cursor: "pointer", alignSelf: "flex-end" }}
          />
        )}
      </Box>
    </Box>
  );
};

export default UserMainInformation;
