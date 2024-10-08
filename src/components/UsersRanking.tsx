import React, { Fragment } from "react";
import UserRanking from "./UserRanking";

const UsersRanking = () => {
  const users = [
    { id: 1, name: "ユーザー1" },
    { id: 2, name: "ユーザー2" },
    { id: 3, name: "ユーザー3" },
  ];

  return (
    <div>
      {users.map((user) => (
        <Fragment key={user.id}>
          <UserRanking user={user} />
        </Fragment>
      ))}
    </div>
  );
};

export default UsersRanking;