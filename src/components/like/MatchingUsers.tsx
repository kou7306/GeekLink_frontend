import React, { useState } from "react";
import IconField from "@/components/like/IconField";
import { Pagination } from "@mui/material";
import { User } from "@/components/profile/options"; // ユーザータイプの定義をインポート

type MatchingUsersProps = {
  users: User[];
};

const MatchingUsers: React.FC<MatchingUsersProps> = ({ users }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const displayedUsers = users.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <>
      <div className="grid grid-cols-5 gap-4 p-4">
        {displayedUsers.map((user, index) => (
          <IconField
            key={index}
            id={user.user_id}
            name={user.name}
            image={user.image_url}
            sex={user.sex}
            place={user.place}
            topTech={user.top_tech}
            isLiked
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          count={Math.ceil(users.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </>
  );
};

export default MatchingUsers;
