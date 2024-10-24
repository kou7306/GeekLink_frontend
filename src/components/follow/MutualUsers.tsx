import React, { useState } from "react";
import { Grid, Pagination, Box } from "@mui/material";
import { FollowUser } from "@/components/profile/options";
import UserBox from "./UserBox";

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
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        {displayedUsers.map((user) => (
          <Grid item xs={12} sm={6} md={4} xl={3} key={user.user_id}>
            <UserBox user={user} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={Math.ceil(mutualUsers.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default MutualUsers;
