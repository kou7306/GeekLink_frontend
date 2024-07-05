import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { getUuidFromCookie } from "@/actions/users";
import { addGroupMember } from "@/utils/addGroupMember";
import { Group } from "@/utils/getGroupMembers";

type Props = {
  params: any;
  groupData: Group;
  setGroupData: React.Dispatch<React.SetStateAction<Group>>;
};

const SubHeader: React.FC<Props> = ({ params, groupData, setGroupData }) => {
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
    if (uuid && params.groupId) {
      const response = await addGroupMember(params.groupId, uuid);
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
      <Link href={"/"}>
        <ArrowBackIosNewIcon
          sx={{
            paddingLeft: 1,
            marginLeft: 1,
            "&:active": { color: "#007BFF" },
          }}
        />
      </Link>
      <Typography paddingY={1} paddingLeft={2} fontWeight={"bold"}>
        グループ名
      </Typography>
      {!groupData.member_ids.includes(uuid) ? (
        <Button onClick={handleAddMember} sx={{ ml: "auto", pr: 2 }}>
          メンバーになる
        </Button>
      ) : (
        <>
          <Typography sx={{ ml: "auto", pr: 2 }}>
            あなたはメンバーです
          </Typography>
        </>
      )}
    </Box>
  );
};

export default SubHeader;
