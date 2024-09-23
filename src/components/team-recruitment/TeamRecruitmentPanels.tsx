import { Box } from "@mui/material";
import React from "react";
import Recruitments from "./Recruitments";

type Props = {
  value: string;
};

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: string;
  value: string;
}

const TeamRecruitmentPanels = ({ value }: Props) => {
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </Box>
    );
  }
  return (
    <>
      {/* チーム開発 */}
      <TabPanel value={value} index="1">
        <Recruitments />
      </TabPanel>
      {/* イベント参加 */}
      <TabPanel value={value} index="2">
        two
      </TabPanel>
      {/* 自分の募集 */}
      <TabPanel value={value} index="3">
        three
      </TabPanel>
    </>
  );
};

export default TeamRecruitmentPanels;
