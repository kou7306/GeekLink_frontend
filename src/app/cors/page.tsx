"use client";
import React, { useState, useEffect } from "react";

const Page = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAndSetData = async () => {
      const response = await fetch(`${apiUrl}/test`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ test: "test" }),
      });

      const data = await response.json();
      setData(data.message);
    };

    fetchAndSetData();
  }, [apiUrl]);

  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
};

export default Page;
