import { Box, Button, Modal, Typography, List } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";

import SocialMediaIntegrationItems from "./SocialMediaIntegrationItems";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  maxWidth: "400px",
  bgcolor: "background.paper",
  boxShadow: 24,
  maxHeight: "80vh",
  overflowY: "auto",
  borderRadius: "16px",
  p: 4,
};

const SocialMediaIntegration = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="secondary"
        sx={{
          borderRadius: "50%",
          minWidth: "30px",
          width: "30px",
          height: "30px",
          padding: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white", // アイコンの色を白に設定
          "&:hover": {
            backgroundColor: "secondary.main", // ホバー時の背景色を変更しない
            color: "white", // ホバー時にアイコンの色を白に保持
          },
        }}
      >
        <AddIcon />
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2, textAlign: "center" }}
          >
            連携するSNSを選択
          </Typography>
          <List>
            {/* 各々の連携 */}
            <SocialMediaIntegrationItems />
          </List>
        </Box>
      </Modal>
    </>
  );
};

export default SocialMediaIntegration;
