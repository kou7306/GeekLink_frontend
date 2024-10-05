"use client";

import React, { useState } from "react";
import TeamRecruitmentTabs from "./TeamRecruitmentsTabs";
import TeamRecruitmentPanels from "./TeamRecruitmentsPanels";
import Options from "./Options";
import { Event } from "@/types/event";

interface TeamRecruitmentPageProps {
  hackathonEvents: Event[];
  eventEvents: Event[];
}

const TeamRecruitmentPage = ({ hackathonEvents, eventEvents }: TeamRecruitmentPageProps) => {
  const [value, setValue] = useState("1");
  return (
    <>
      {/* タブ */}
      <TeamRecruitmentTabs value={value} setValue={setValue} />
      {/* ソートと検索のアイコン */}
      <Options />
      {/* チーム募集 */}
      <TeamRecruitmentPanels value={value} hackathonEvents={hackathonEvents} eventEvents={eventEvents} />
    </>
  );
};

export default TeamRecruitmentPage;
