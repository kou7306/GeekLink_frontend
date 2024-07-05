"use client";
import React, { useState, useEffect } from "react";
import { getUuidFromCookie } from "@/actions/users";
import { SuggestUsersResponse } from "../../../types/user";

const Page = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [data, setData] = useState<SuggestUsersResponse | null>(null);
  const [uuid, setUuid] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const uuid = await getUuidFromCookie();
      console.log(uuid);
      if (uuid) {
        setUuid(uuid);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchAndSetData = async () => {
      if (!uuid) return;
      try {
        const response = await fetch(`${apiUrl}/suggest/all?uuid=${uuid}`, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
        setData(data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchAndSetData();
  }, [apiUrl, uuid]);
  return (
    <div>
      {data === null ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Same Place Users</h2>
          <ul>
            {data.samePlaceUsers.map((user) => (
              <li key={user.user_id}>{user.name}</li>
            ))}
          </ul>

          <h2>Same Age Users</h2>
          <ul>
            {data.sameAgeUsers.map((user) => (
              <li key={user.user_id}>{user.name}</li>
            ))}
          </ul>

          <h2>Same Graduate Year Users</h2>
          <ul>
            {data.sameGraduateYearUsers.map((user) => (
              <li key={user.user_id}>{user.name}</li>
            ))}
          </ul>

          <h2>Same Job Type Users</h2>
          <ul>
            {data.sameJobTypeUsers.map((user) => (
              <li key={user.user_id}>{user.name}</li>
            ))}
          </ul>

          <h2>Same Top Tech Users</h2>
          <ul>
            {data.sameTopTechUsers.map((user) => (
              <li key={user.user_id}>{user.name}</li>
            ))}
          </ul>

          <h2>Sorted Users</h2>
          <ul>
            {data.sortedUsers.map((entry) => (
              <li key={entry.user.user_id}>
                {entry.user.name} - Score: {entry.score}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Page;
