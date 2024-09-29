import { Paper, Typography } from "@mui/material";
import React from "react";

type Props = {
  item: {
    title: string;
    date: string;
  };
};

const QiitaItem = ({ item }: Props) => {
  return (
    <Paper
      key={item.title}
      elevation={1}
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        border: "1px solid #e0e0e0",
      }}
    >
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {item.date}
      </Typography>
      <Typography variant="h6" component="h2">
        {item.title}
      </Typography>
    </Paper>
  );
};

export default QiitaItem;
