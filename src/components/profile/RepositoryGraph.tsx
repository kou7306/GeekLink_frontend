import React from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
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

type Props = {
  repository: Repository;
};

const RepositoryGraph = ({ repository }: Props) => {
  // 言語の色を決める関数
  const getLanguageColor = (languageName: string) => {
    const language = languages.find((lang) => lang.name === languageName);
    return language ? language.color : "#808080"; // それ以外の色
  };

  const repositoryData = {
    labels: [""],
    datasets: Object.entries(repository.languages).map(([key, value]) => ({
      // 言語
      label: value.name,
      // 割合
      data: [value.percentage],
      backgroundColor: getLanguageColor(value.name),
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
          color: "white", // X軸の目盛りの色を白に設定
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
        position: "bottom" as const,
        labels: {
          color: "white", // 凡例のテキスト色を白に設定
        },
      },
      title: {
        display: true,
        text: `${repository.name}`,
        color: "white", // タイトルの色を白に設定
        font: {
          size: 16,
          family: "Arial",
          weight: 400, // "normal" corresponds to 400 in numeric font weight
        },
        align: "start" as const,
      },
      customCanvasBackgroundColor: {
        color: "white",
      },
      commitCount: {
        commits: repository.commitCount,
      },
    },
    layout: {
      padding: {
        top: 30,
        bottom: 30,
      },
    },
  };

  const commitCountPlugin = {
    id: "commitCount",
    afterDraw: (chart: any, args: any, options: any) => {
      const { ctx } = chart;
      const { top, right } = chart.chartArea;

      ctx.save();
      ctx.font = "14px Arial";
      ctx.fillStyle = "white"; // コミットカウントのテキスト色を白に設定
      ctx.textAlign = "right";
      ctx.fillText(`${options.commits} commits`, right, top - 10);
      ctx.restore();
    },
  };

  return (
    <Chart
      type="bar"
      data={repositoryData}
      options={options}
      plugins={[commitCountPlugin]}
    />
  );
};

export default RepositoryGraph;
