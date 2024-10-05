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
    labels: GitHubLanguages.map((lang) => lang.name),
    datasets: [
      {
        label: "Language Usage",
        data: GitHubLanguages.map((lang) => lang.percentage),
        backgroundColor: GitHubLanguages.map((lang) =>
          getLanguageColor(lang.name)
        ),
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    indexAxis: "y" as const,
    scales: {
      x: {
        stacked: true,
        min: 0,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ${context.parsed.x.toFixed(1)}%`,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Bar data={chartData} options={options} />;
};

export default LanguageGraph;
