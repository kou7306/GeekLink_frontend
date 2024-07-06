import { Group } from "@/utils/getGroupMembers";
import {
  AvatarGroup,
  Avatar,
  Box,
  Modal,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React from "react";
import { User } from "../profile/options";

type Props = { groupData: Group; members: User[] };

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AvatarList: React.FC<Props> = ({ groupData, members }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <AvatarGroup
        max={3}
        sx={{ paddingY: 1, paddingX: 2, cursor: "pointer" }}
        onClick={handleOpen}
      >
        {members?.map((member) => (
          <Avatar
            key={member.user_id}
            alt={member.name}
            src={member.image_url || "/img/default_icon.png"}
          />
        ))}
      </AvatarGroup>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            メンバーリスト
          </Typography>
          <List>
            {members?.map((member) => (
              <ListItem key={member.user_id}>
                <ListItemAvatar>
                  <Avatar
                    alt={member.name}
                    src={member.image_url || "/img/default_icon.png"}
                  />
                </ListItemAvatar>
                <ListItemText primary={member.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    </>
  );
};

export default AvatarList;
