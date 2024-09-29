import React from "react";
import { Chart } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  TooltipItem,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ActivityLog = () => {
  const chartData: ChartData<"bar"> = {
    labels: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
    datasets: [
      {
        label: "GitHub",
        backgroundColor: "rgb(255, 99, 132)",
        data: [65, 59, 80, 81, 56, 55, 40, 100, 100, 100, 100, 100],
      },
      {
        label: "connpass",
        backgroundColor: "rgb(54, 162, 235)",
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
      },
    ],
  };

  const chartOption = (data: ChartData<"bar">) => ({
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"bar">) => {
            const label = context.dataset.label || "";
            const valueIndex = context.dataIndex;
            const originalValue =
              data.datasets[context.datasetIndex]?.data[valueIndex];
            return `${label}: ${originalValue}`;
          },
        },
      },
    },
  });

  return <Chart type="bar" data={chartData} options={chartOption(chartData)} />;
};

export default ActivityLog;
