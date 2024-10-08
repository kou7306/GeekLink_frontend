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

  if (!Array.isArray(GitHubLanguages) || GitHubLanguages.length === 0) {
    return null;
  }

  const chartData: ChartData<"bar"> = {
    labels: [""],
    datasets: Array.isArray(GitHubLanguages)
      ? GitHubLanguages.map((lang) => ({
          label: lang.name,
          data: [lang.percentage],
          backgroundColor: getLanguageColor(lang.name),
        }))
      : [],
  };

  const options: ChartOptions<"bar"> = {
    indexAxis: "y" as const,
    scales: {
      x: {
        stacked: true,
        beginAtZero: true,
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
        position: "bottom" as const,
        align: "start" as const,
        labels: {
          boxWidth: 15,
          padding: 15,
        },
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
    layout: {
      padding: {
        bottom: 20,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default LanguageGraph;
