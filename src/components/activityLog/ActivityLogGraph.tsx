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

  // ラベルとデータを今月を一番右に持ってくるように並び替え
  const adjustedLabels = [
    ...monthLabels.slice(currentMonth + 1), // 今月の次の月から年末まで
    ...monthLabels.slice(0, currentMonth + 1), // 年始から今月まで
  ];

  // 色の配列（kindごとに異なる色を指定）
  const colors: { [key in ActivityLogGraphProps["kind"]]: string } = {
    github: "rgb(255, 99, 132)",
    qiita: "rgb(54, 162, 235)",
    geeklink: "rgb(75, 192, 192)",
  };

  console.log(propsArray);
  // datasetsに各kindのデータを追加
  const datasets = propsArray
    .filter((activity) => activity.data.length === 12) // データが12個のものだけを残す
    .map((activity) => ({
      label: `${activity.kind} Contributions`,
      backgroundColor: colors[activity.kind], // kindによって色を決定
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
