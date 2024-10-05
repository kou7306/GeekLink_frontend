import React from "react";
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
import { Box } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  repository: Repository;
};

const RepositoryGraph = ({ repository }: Props) => {
  const repositoryData = {
    labels: [""],
    datasets: Object.entries(repository.languages).map(([key, value]) => ({
      // 言語
      label: value.name,
      // 割合
      data: [value.percentage],
      backgroundColor: (() => {
        switch (value.name) {
          case "TypeScript":
            return "#3178C6";
          case "JavaScript":
            return "#F7DF1E";
          case "Python":
            return "#3776AB";
          case "Java":
            return "#007396";
          case "C++":
            return "#00599C";
          case "Ruby":
            return "#CC342D";
          case "Go":
            return "#00ADD8";
          case "Rust":
            return "#DEA584";
          default:
            return "#808080"; // Default color for other languages
        }
      })(),
    })),
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
        text: `${repository.name}`,
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
    <Box sx={{ width: "100%", height: "200px" }}>
      <Bar data={repositoryData} options={options} />
    </Box>
  );
};

export default RepositoryGraph;
