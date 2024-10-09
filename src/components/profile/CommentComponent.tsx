import { Box, Typography } from "@mui/material";
import React from "react";

type Props = {
  message: string;
};

const CommentComponent = ({ message }: Props) => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        padding: "16px",
        marginTop: "16px",
        maxWidth: "300px",
        wordWrap: "break-word",
      }}
    >
      <Typography variant="body1">{message}</Typography>
    </Box>
  );
};

export default CommentComponent;
