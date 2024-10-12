import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { getUuidFromCookie } from "@/actions/users";
import { addGroupMember } from "@/utils/addGroupMember";
import { Group } from "@/utils/getGroupMembers";
import AvatarList from "./AvatarList";
import { User } from "../profile/options";

type Props = {
  params: any;
  groupData: Group;
  setGroupData: React.Dispatch<React.SetStateAction<Group>>;
  members: User[];
  setMembers: React.Dispatch<React.SetStateAction<User[]>>;
};

const SubHeader: React.FC<Props> = ({
  params,
  groupData,
  setGroupData,
  members,
  setMembers,
}) => {
  const [uuid, setUuid] = useState<string>("");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const fetchUsers = async () => {
      const uuid = await getUuidFromCookie();
      if (uuid) {
        setUuid(uuid);
      }
    };

    fetchUsers();
  }, []);

  const groupId = params.groupId;

  const handleAddMember = async () => {
    if (uuid && groupId) {
      const response = await addGroupMember(groupId, uuid);
      console.log(response.message);
      if (response.message === "success") {
        setGroupData((prevGroupData) => ({
          ...prevGroupData,
          member_ids: [...prevGroupData.member_ids, uuid],
        }));
      }
    }
  };

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      position="fixed"
      zIndex={50}
      width="100%"
      sx={{ backgroundColor: "rgba(211, 211, 211, 0.5)" }}
    >
      {/* TODO: グループ一覧画面が出来次第ここをそこのリンクに変更 */}
      <Link href={"/group-list"}>
        <ArrowBackIosNewIcon
          sx={{
            paddingLeft: 1,
            marginLeft: 1,
            "&:active": { color: "#007BFF" },
          }}
        />
      </Link>
      <Typography paddingY={1} paddingLeft={2} fontWeight={"bold"}>
        {groupData.name}
      </Typography>
      <Box ml={"auto"} display={"flex"} alignItems={"center"}>
        {groupData && !groupData.member_ids?.includes(uuid) ? (
          <Button
            onClick={handleAddMember}
            sx={{
              mr: 2,
              paddingX: 2,
              marginY: 1,
              backgroundColor: "#007BFF",
              color: "white",
              borderRadius: "20px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
            }}
          >
            メンバーになる
          </Button>
        ) : (
          <>
            <Typography
              sx={{
                pr: 2,
                fontSize: "1rem",
                fontWeight: "bold",
                color: "primary.main",
              }}
            >
              あなたはメンバーです
            </Typography>
          </>
        )}
        <AvatarList groupData={groupData} members={members} />
      </Box>
    </Box>
  );
};

export default SubHeader;
