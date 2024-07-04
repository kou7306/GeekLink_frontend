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
            color: "#25276D",
            borderBottom: "1px solid #25276D",
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
                  borderColor: "#25276D",
                },
                "&:hover fieldset": {
                  borderColor: "#25276D",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#25276D",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#25276D",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#25276D",
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Hobby;
