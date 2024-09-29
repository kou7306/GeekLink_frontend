import { Box } from "@mui/material";
import React from "react";
import QiitaItem from "./QiitaItem";

const QiitaList = () => {
  const data = [
    {
      title: "GitHub APIの使い方",
      date: "2021-09-05",
    },
    {
      title: "Reactの使い方",
      date: "2021-09-01",
    },
    {
      title: "TypeScriptの使い方",
      date: "2021-09-017",
    },
  ];
  return (
    <Box sx={{ maxWidth: 400, margin: "auto" }}>
      {data.map((item, index) => (
        <QiitaItem item={item} key={index} />
      ))}
    </Box>
  );
};

export default QiitaList;
