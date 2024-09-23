import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { Tabs } from "@mui/material";

type Props = {
  value: string;
  setValue: (value: string) => void;
};

const RankingTabs = ({ value, setValue }: Props) => {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
      >
        <Tab value="1" label="デイリー" />
        <Tab value="2" label="週間" />
        <Tab value="3" label="月間" />
      </Tabs>
    </Box>
  );
};

export default RankingTabs;
