import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Modal, TextField, Typography } from "@mui/material";

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

const Search = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <SearchIcon onClick={handleOpen} />
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
            <TextField fullWidth label="検索" variant="outlined" />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Search;
