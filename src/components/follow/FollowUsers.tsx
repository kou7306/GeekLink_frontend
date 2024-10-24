import React, { useState } from "react";
import { Pagination } from "@mui/material";
import { FollowUser } from "@/components/profile/options";
import UserBox from "./UserBox";

type FollowUsersProps = {
  follows: FollowUser[];
};

const FollowUsers: React.FC<FollowUsersProps> = ({ follows }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const displayedUsers = follows.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      <div className="grid grid-cols-5 gap-4 p-4">
        {displayedUsers.map((user, index) => (
          <UserBox key={index} user={user} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          count={Math.ceil(follows.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </>
  );
};

export default FollowUsers;
