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
            color: "text.primary",
            borderBottom: "1px solid text.primary",
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
                  borderColor: "text.primary",
                },
                "&:hover fieldset": {
                  borderColor: "text.primary",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "text.primary",
                },
              },
              "& .MuiInputLabel-root": {
                color: "text.primary",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "text.primary",
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Hobby;
