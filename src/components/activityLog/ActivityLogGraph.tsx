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

const ActivityLogGraph: React.FC<{ propsArray: ActivityLogGraphProps[] }> = ({
  propsArray,
}) => {
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

  // ラベルを現在の月が最後に来るように並べ替え
  const adjustedLabels = [
    ...monthLabels.slice(0, currentMonth), // 年始から現在の月の前まで
    ...monthLabels.slice(currentMonth), // 現在の月から年末まで
  ];

  // 色の配列（kindごとに異なる色を指定）
  const colors: { [key in ActivityLogGraphProps["kind"] | "other"]: string } = {
    github: "rgb(255, 99, 132)",
    qiita: "rgb(54, 162, 235)",
    geeklink: "rgb(75, 192, 192)",
    other: "rgb(201, 203, 207)",
  };

  // datasetsに各kindのデータを追加
  const datasets = propsArray.map((activity) => ({
    label: `${activity.kind} Contributions`,
    backgroundColor: colors[activity.kind] || colors["other"], // kindによって色を決定
    data: activity.data,
  }));

  // グラフデータ
  const chartData: ChartData<"bar"> = {
    labels: adjustedLabels,
    datasets: datasets, // 複数のデータセットを設定
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
