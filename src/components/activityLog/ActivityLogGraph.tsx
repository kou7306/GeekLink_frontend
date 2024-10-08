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

interface ActivityLogGraphProps {
  kind: string; // データの種類（例: 'github'）
  data: number[]; // データ（1年前から今月までの12個）
}

const ActivityLogGraph: React.FC<ActivityLogGraphProps> = ({ kind, data }) => {
  const currentMonth = new Date().getMonth(); // 現在の月を取得 (0-11)

  // 月のラベル
  const monthLabels = [
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
  ];

  // ラベルとデータを今月を一番右に持ってくるように並び替え
  const adjustedLabels = [
    ...monthLabels.slice(currentMonth + 1), // 今月の次の月から年末まで
    ...monthLabels.slice(0, currentMonth + 1), // 年始から今月まで
  ];

  // データをラベルの順番に合わせて並び替え
  const adjustedData = [
    ...data.slice(currentMonth + 1), // 今月の次の月から年末までのデータ
    ...data.slice(0, currentMonth + 1), // 年始から今月までのデータ
  ];

  // kindによるデータセットの変更
  const chartData: ChartData<"bar"> = {
    labels: adjustedLabels,
    datasets: [
      {
        label: `${kind} Contributions`, // kindをラベルに追加
        backgroundColor: "rgb(255, 99, 132)", // 色を変更したい場合はここを編集
        data: adjustedData, // データを使用
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

export default ActivityLogGraph;
