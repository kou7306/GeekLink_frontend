import { Box, TextField } from "@mui/material";
import React from "react";

type Props = {
  onChangeHobby: (hobby: string) => void;
  enteredHobby: string;
};

const Hobby: React.FC<Props> = ({ onChangeHobby, enteredHobby }) => {
  return (
    <>
      <Box>
        <Box
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            borderBottom: "1px solid primary.main",
            paddingBottom: "4px",
            marginBottom: "8px",
          }}
        >
          趣味で探す
        </Box>
        <Box pt={1} pb={3}>
          <TextField
            id="hobby"
            label="趣味を入力"
            variant="outlined"
            onChange={(e) => onChangeHobby(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "primary.main",
                },
                "&:hover fieldset": {
                  borderColor: "primary.main",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "primary.main",
                },
              },
              "& .MuiInputLabel-root": {
                color: "primary.main",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "primary.main",
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Hobby;
