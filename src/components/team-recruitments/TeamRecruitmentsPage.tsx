"use client";

import React, { useState } from "react";
import TeamRecruitmentTabs from "./TeamRecruitmentsTabs";
import TeamRecruitmentPanels from "./TeamRecruitmentsPanels";
import Options from "./Options";

const TeamRecruitmentPage = () => {
  const [value, setValue] = useState("1");
  return (
    <>
      {/* タブ */}
      <TeamRecruitmentTabs value={value} setValue={setValue} />
      {/* ソートと検索のアイコン */}
      <Options />
      {/* チーム募集 */}
      <TeamRecruitmentPanels value={value} />
    </>
  );
};

export default TeamRecruitmentPage;
