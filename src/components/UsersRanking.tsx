import React, { Fragment } from "react";
import UserRanking from "./UserRanking";
import { User } from "../types/ranking";

interface UsersRankingsProps {
  data: User[];
  type: string;
}

const UsersRanking: React.FC<UsersRankingsProps> = ({ data, type }) => {
  return (
    <div>
      {data.map((user) => (
        <Fragment key={user.user_id}>
          <UserRanking user={user} type={type} />
        </Fragment>
      ))}
    </div>
  );
};

export default UsersRanking;