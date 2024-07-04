"use client";
import React, { useState, useEffect } from "react";
import { getUuidFromCookie } from "@/actions/users";

const Page = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [data, setData] = useState(null);
  const [uuid, setUuid] = useState<string>("");
  useEffect(() => {
    const fetchUsers = async () => {
      const uuid = await getUuidFromCookie();
      console.log(uuid);
      if (uuid) {
        setUuid(uuid);
      }
    };

    fetchUsers();
  }, []); // 初回マウント時に実行する

  useEffect(() => {
    const fetchAndSetData = async () => {
      if (!uuid) return; // UUIDが存在しない場合は実行しない

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
      console.log(data); // 取得したデータをコンソールに表示
    };

    fetchAndSetData();
  }, [apiUrl, uuid]); // UUIDが設定されたときに実行する

  return (
    <div>
      <h1>テスト</h1>
    </div>
  );
};

export default Page;
