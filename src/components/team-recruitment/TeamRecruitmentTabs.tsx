import { Box, Tab, Tabs } from "@mui/material";
import React from "react";

type Props = {
  value: string;
  setValue: (value: string) => void;
};

const TeamRecruitmentTabs = ({ value, setValue }: Props) => {
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
        <Tab value="1" label="チーム開発" />
        <Tab value="2" label="イベント参加" />
        <Tab value="3" label="自分の募集" />
      </Tabs>
    </Box>
  );
};

export default TeamRecruitmentTabs;
