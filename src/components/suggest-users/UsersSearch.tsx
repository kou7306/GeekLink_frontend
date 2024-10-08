import {
  Box,
  Button,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";

const UsersSearch = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    borderRadius: "16px",
    boxShadow: 24,
    p: 6,
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={handleOpen}
        sx={{
          backgroundColor: "#25276D",
          color: "white",
          borderRadius: "8px",
          padding: "8px 16px",
          fontWeight: "bold",
          margin: "8px",
          "&:hover": {
            backgroundColor: "#1f235a",
          },
        }}
      >
        検索
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            キーワードで検索
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="検索"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default UsersSearch;
