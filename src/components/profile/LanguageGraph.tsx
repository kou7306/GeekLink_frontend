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
  ChartOptions,
  ChartData,
} from "chart.js";
import { languages } from "@/constants/language";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Language = {
  name: string;
  percentage: number;
};

type Props = {
  GitHubLanguages: Language[];
};

const LanguageGraph: React.FC<Props> = ({ GitHubLanguages }) => {
  const getLanguageColor = (languageName: string) => {
    const language = languages.find((lang) => lang.name === languageName);
    return language ? language.color : "#808080";
  };

  const chartData: ChartData<"bar"> = {
    labels: ["Language Usage"],
    datasets: GitHubLanguages.map((lang) => ({
      label: lang.name,
      data: [lang.percentage],
      backgroundColor: getLanguageColor(lang.name),
    })),
  };

  const options: ChartOptions<"bar"> = {
    indexAxis: "x" as const,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
    plugins: {
      legend: {
        position: "right" as const,
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Bar data={chartData} options={options} />;
};

export default LanguageGraph;
