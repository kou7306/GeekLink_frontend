import { useState, useEffect } from "react";

interface Contribution {
  date: string;
  count: number;
}

interface ContributionsResponse {
  contributions: Contribution[];
}

// APIからデータを取得する共通関数
const fetchContributions = async (
  endpoint: string,
  cacheTime: number
): Promise<ContributionsResponse> => {
  const response = await fetch(endpoint, {
    cache: "force-cache", // ブラウザにキャッシュされたデータを強制的に使用する
    headers: {
      "Cache-Control": `max-age=${cacheTime}`, // キャッシュ期間を指定
    },
  });
  return response.json();
};

// 1ヶ月のデータを1日1回取得する
const fetchOneMonthContributions = async () => {
  return await fetchContributions("/api/one-month", 24 * 60 * 60); // 1日キャッシュ
};

// 8時間前のデータを取得
const fetchEightHourContributions = async () => {
  return await fetchContributions("/api/eight-hours", 8 * 60 * 60); // 8時間キャッシュ
};

// ActivityLog コンポーネントで表示部分を分離
const ActivityLog = ({ contributions }: { contributions: Contribution[] }) => {
  return (
    <div>
      <h1>GitHub Contributions</h1>
      <h2>All Contributions</h2>
      <ul>
        {contributions.map((contribution, index) => (
          <li key={index}>
            {contribution.date}: {contribution.count} contributions
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Home() {
  const [contributions, setContributions] = useState<Contribution[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // 1ヶ月前のデータを1日1回取得
      const oneMonthData = await fetchOneMonthContributions();
      setContributions(oneMonthData.contributions); // データをStateにセット

      // 8時間前のデータを取得して追加
      const eightHourData = await fetchEightHourContributions();
      setContributions((prevContributions) => [
        ...prevContributions,
        ...eightHourData.contributions,
      ]); // 新しいデータを追加
    };

    fetchData();

    // 8時間ごとにデータを更新
    const timeoutId = setTimeout(fetchData, 8 * 60 * 60 * 1000); // 8時間後に再実行

    return () => clearTimeout(timeoutId); // クリーンアップ
  }, []);

  return <ActivityLog contributions={contributions} />;
}
