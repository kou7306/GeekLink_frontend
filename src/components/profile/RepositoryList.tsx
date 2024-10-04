import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
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

  const data = {
    labels: [""],
    datasets: [
      {
        label: "bad",
        data: [99.35801996967669],
        backgroundColor: "rgba(244, 143, 177, 0.6)",
      },
      {
        label: "better",
        data: [0.6419800303233121],
        backgroundColor: "rgba(255, 235, 59, 0.6)",
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    scales: {
      x: {
        stacked: true,
        max: 100,
        ticks: {
          callback: function (value: string | number) {
            return value + "%";
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Repository Distribution",
      },
    },
    layout: {
      padding: {
        top: 30,
        bottom: 30,
      },
    },
  };
  return (
    <div style={{ width: "80%", height: "200px", margin: "auto" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default RepositoryList;
