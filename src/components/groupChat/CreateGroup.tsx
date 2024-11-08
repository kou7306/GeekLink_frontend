"use client";
import React, { useState, useEffect } from "react";
import { getUuidFromCookie } from "@/actions/users";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab"; // Floating Action Buttonをインポート
import AddIcon from "@mui/icons-material/Add"; // プラスアイコンをインポート
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Button, ThemeProvider, createTheme } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  bgcolor: "background.paper",
  boxShadow: 24,
  maxHeight: "80vh",
  overflowY: "auto",
  borderRadius: "16px",
  padding: "16px",
};

const CreateGroup = () => {
  const [open, setOpen] = React.useState(false);
  const [groupName, setGroupName] = React.useState("");
  const [groupDescription, setGroupDescription] = React.useState("");
  const [uuid, setUuid] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const uuid = await getUuidFromCookie();
      console.log(uuid);
      if (uuid) {
        setUuid(uuid);
      }
    };
    fetchUsers();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    const groupData = {
      owner_id: uuid,
      member_ids: [uuid],
      name: groupName,
      description: groupDescription,
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/group/create-group`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ groupData }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Group created: ", data);

      handleClose();
    } catch (error) {
      console.error("Failed to create group:", error);
    }
  };

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1>グループ作成</h1>
          <Box mx={4} my={2}>
            <TextField
              fullWidth
              label="グループ名"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="グループ説明"
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              margin="normal"
              multiline
              rows={4}
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClose}
              sx={{ marginTop: "16px", marginRight: "8px" }}
            >
              キャンセル
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ marginTop: "16px", marginX: "8px", color: "text.primary" }}
            >
              作成
            </Button>
          </Box>
        </Box>
      </Modal>

      <Fab
        onClick={handleOpen}
        sx={{
          position: "fixed",
          bottom: "10%",
          right: "10%",
          boxShadow: 3,
          backgroundColor: "secondary.main", // 背景色をsecondaryのメインカラーに設定
          color: "text.primary",
          "&:hover": {
            backgroundColor: "secondary.main", // ホバー時も背景色を変更しない
            boxShadow: 3, // ホバー時の影をそのままにする
          },
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default CreateGroup;
