import React, { Fragment } from "react";
import UserRanking from "./UserRanking";
import { useQuery } from "@tanstack/react-query";


const UsersRanking = () => {
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["rank"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ranking/top`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch TopRanking");
      }
      return response.json();
    },
  });

  const users: any[] = data;

  if (isPending) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

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
