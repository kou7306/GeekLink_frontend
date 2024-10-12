"use client";

import React, { useState } from "react";
import TeamRecruitmentTabs from "./TeamRecruitmentsTabs";
import TeamRecruitmentPanels from "./TeamRecruitmentsPanels";
import Options from "./Options";
import { Event } from "@/types/event";
import Link from "next/link";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface TeamRecruitmentPageProps {
  hackathonEvents: Event[];
  eventEvents: Event[];
  currentUserEvents: Event[];
}

const TeamRecruitmentPage = ({
  hackathonEvents,
  eventEvents,
  currentUserEvents,
}: TeamRecruitmentPageProps) => {
  const [value, setValue] = useState("1");
  return (
    <>
      {/* タブ */}
      <TeamRecruitmentTabs value={value} setValue={setValue} />
      {/* ソートと検索のアイコン */}
      <Options />
      {/* チーム募集 */}
      <TeamRecruitmentPanels
        value={value}
        hackathonEvents={hackathonEvents}
        eventEvents={eventEvents}
        currentUserEvents={currentUserEvents}
      />
      <Link href="/team-recruitments/create">
        <Fab
          sx={{
            position: "fixed",
            bottom: "10%",
            right: "10%",
            boxShadow: 3,
            backgroundColor: "secondary.main", // 背景をsecondary.mainに設定
            color: "text.primary", // アイコンの色をtext.primaryに設定
            "&:hover": {
              backgroundColor: "secondary.dark", // ホバー時の背景色をsecondary.darkに設定
              boxShadow: 3,
            },
          }}
        >
          <AddIcon />
        </Fab>
      </Link>
    </>
  );
};

export default TeamRecruitmentPage;
