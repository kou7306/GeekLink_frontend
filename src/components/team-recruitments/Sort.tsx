import React, { useState } from "react";
import SortIcon from "@mui/icons-material/Sort";
import {
  Box,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

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

const Sort = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <SortIcon onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ソート対象
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <FormControl component="fieldset">
              <RadioGroup aria-label="sortOrder" name="sortOrder">
                <FormControlLabel
                  value="newest"
                  control={<Radio />}
                  label="新しい順"
                />
                <FormControlLabel
                  value="oldest"
                  control={<Radio />}
                  label="古い順"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Sort;
