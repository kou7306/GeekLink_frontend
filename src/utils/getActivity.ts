// 1年間のコントリビューション数を取得する関数
export const getYearlyContribution = async (
  uuid: string
): Promise<number[]> => {
  try {
    console.log(uuid);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const cacheKey = `contribution-${uuid}`;
    const cacheExpirationKey = `contribution-expiration-${uuid}`;
    const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;

    // キャッシュが存在し、有効期限内の場合はキャッシュからデータを取得
    const cachedData = localStorage.getItem(cacheKey);
    const cacheExpiration = localStorage.getItem(cacheExpirationKey);
    const now = new Date().getTime();

    if (cachedData && cacheExpiration && now < Number(cacheExpiration)) {
      return JSON.parse(cachedData); // キャッシュが有効ならそれを返す
    }

    // キャッシュがないか有効期限が切れている場合、新たにデータを取得
    const response = await fetch(
      `${apiUrl}/github/contributionList?uuid=${uuid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch contributions");
    }

    const contributions: number[] = await response.json();

    // データをキャッシュに保存し、有効期限を設定
    localStorage.setItem(cacheKey, JSON.stringify(contributions));
    localStorage.setItem(cacheExpirationKey, (now + oneWeekInMs).toString());
    // 更新日時を保存
    localStorage.setItem(`contribution-last-update-${uuid}`, now.toString());
    return contributions;
  } catch (error) {
    console.error("Error fetching contributions:", error);
    return [];
  }
};

// 以前の更新日時を持ち、差分のコントリビューションを取得する関数
type ContributionResult = number | number[] | { logs: any[] };

export const getContributionsSinceLastUpdate = async (
  uuid: string
): Promise<ContributionResult> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const lastUpdateKey = `contribution-last-update-${uuid}`;
    const now = new Date();

    // 最後の更新日時を取得
    const lastUpdate = localStorage.getItem(lastUpdateKey);
    const lastUpdateDate = lastUpdate ? new Date(Number(lastUpdate)) : null;

    // 更新日時が存在しない場合は、全データを取得
    if (!lastUpdateDate) {
      return await getYearlyContribution(uuid); // リストを返す
    }

    // 現在の年月と更新日時の年月を比較
    if (
      now.getFullYear() !== lastUpdateDate.getFullYear() ||
      now.getMonth() !== lastUpdateDate.getMonth()
    ) {
      // 月が異なる場合は、全データを取得
      return await getYearlyContribution(uuid); // リストを返す
    }

    // 更新日時からの時間を計算
    const timeSinceLastUpdate = now.getTime() - lastUpdateDate.getTime();
    const hoursSinceLastUpdate = Math.floor(
      timeSinceLastUpdate / (1000 * 60 * 60)
    );

    // APIにクエリパラメータで何時間前から取得するかを指定
    const response = await fetch(
      `${apiUrl}/activity/github?uuid=${uuid}&time=${hoursSinceLastUpdate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch contributions since last update");
    }

    const contributions = await response.json();

    return contributions.logs;
  } catch (error) {
    console.error("Error fetching contributions since last update:", error);
    return 0; // エラー時は 0 を返す
  }
};
