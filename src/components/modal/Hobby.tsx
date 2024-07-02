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
            color: "#22d3ee",
            borderBottom: "1px solid #22d3ee",
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
                  borderColor: "#22d3ee",
                },
                "&:hover fieldset": {
                  borderColor: "#22d3ee",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#22d3ee",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#22d3ee",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#22d3ee",
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Hobby;
