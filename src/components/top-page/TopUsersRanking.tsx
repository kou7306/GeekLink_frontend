import React, { Fragment } from "react";
import TopUserRanking from "./TopUserRanking";
import { useQuery } from "@tanstack/react-query";
import ComponentLoading from "../core/ComponentLoading";

const TopUsersRanking = () => {
  const { isLoading, isError, error, data } = useQuery({
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

  // Ensure `data` is an array, defaulting to an empty array if not
  const users: any[] = Array.isArray(data) ? data : [];

  if (isLoading) return <ComponentLoading />;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      {users.length > 0 ? (
        users.map((user) => (
          <Fragment key={user.id}>
            <TopUserRanking user={user} />
          </Fragment>
        ))
      ) : (
        <div>No users found.</div> // Display a message if no users
      )}
    </div>
  );
};

export default TopUsersRanking;
