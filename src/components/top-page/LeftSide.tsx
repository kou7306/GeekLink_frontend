import React from "react";
import FollowerList from "./FollowerList";
import SuggestUserList from "./SuggestUserList";

const RightSide = () => {
  return (
    <div className="p-5">
      <FollowerList />
      <SuggestUserList />
    </div>
  );
};

export default RightSide;
