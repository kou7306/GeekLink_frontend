import React, { useState } from "react";
import IconField from "@/components/follow/IconField";
import { Pagination } from "@mui/material";
import { FollowUser } from "@/components/profile/options"; // ユーザータイプの定義をインポート

type MutualUsersProps = {
  follows: FollowUser[];
  followers: FollowUser[];
};

const MutualUsers: React.FC<MutualUsersProps> = ({ follows, followers }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  // 相互フォローのユーザーを取得
  const mutualUsers = follows.filter((follow) =>
    followers.some((follower) => follower.user_id === follow.user_id)
  );

  const displayedUsers = mutualUsers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      <div className="grid grid-cols-5 gap-4 p-4">
        {displayedUsers.map((user, index) => (
          <IconField key={index} user={user} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          count={Math.ceil(mutualUsers.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </>
  );
};

export default MutualUsers;
