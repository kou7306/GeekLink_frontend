import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { getUuidFromCookie } from "@/actions/users";
import RepositoryGraph from "./RepositoryGraph";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RepositoryList = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  //個人のリポジトリを上から十件取得
  useEffect(() => {
    const fetchRepositories = async () => {
      const uuid = await getUuidFromCookie();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/github/repo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uuid }),
        }
      );
      const data = await res.json();
      setRepositories(data);
      console.log(data);
    };
    fetchRepositories();
  }, []);

  return (
    <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
      {/* 一つあたりのグラフ */}
      {repositories.length > 0 &&
        repositories.map((repository, index) => (
          <RepositoryGraph key={index} repository={repository} />
        ))}
    </div>
  );
};

export default RepositoryList;
