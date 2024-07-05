import { Group } from "@/utils/getGroupMembers";
import { AvatarGroup, Avatar } from "@mui/material";
import React from "react";
import { User } from "../profile/options";

type Props = { groupData: Group; members: User[] };

const AvatarList: React.FC<Props> = ({ groupData, members }) => {
  return (
    <AvatarGroup max={3} sx={{ paddingY: 1, paddingX: 2 }}>
      {members.map((member) => (
        <Avatar
          key={member.user_id}
          alt={member.name}
          src={member.image_url || "/static/images/avatar/default.jpg"}
        />
      ))}
    </AvatarGroup>
  );
};

export default AvatarList;
