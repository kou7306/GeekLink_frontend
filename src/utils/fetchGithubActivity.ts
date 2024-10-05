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
export const fetchOneMonthContributions = async () => {
  return await fetchContributions("/api/one-month", 24 * 60 * 60); // 1日キャッシュ
};

// 8時間前のデータを取得
export const fetchEightHourContributions = async () => {
  return await fetchContributions("/api/eight-hours", 8 * 60 * 60); // 8時間キャッシュ
};
