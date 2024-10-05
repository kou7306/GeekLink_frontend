export const getGeekLinkActivity = async (
  uuid: string
): Promise<{ monthlyActivityCounts: number[]; activities: any[] }> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const cacheKey = `geeklink-${uuid}-year`;
    const cacheExpirationKey = `geeklink-expiration-${uuid}-year`;
    const cacheTime = 4 * 60 * 60 * 1000;
    const now = new Date().getTime(); // 現在の時刻を取得

    // キャッシュが存在し、有効期限内の場合はキャッシュからデータを取得
    // const cachedData = localStorage.getItem(cacheKey);
    // const cacheExpiration = localStorage.getItem(cacheExpirationKey);

    // if (cachedData && cacheExpiration && now < Number(cacheExpiration)) {
    //   return JSON.parse(cachedData); // キャッシュが有効ならそれを返す
    // }

    const time = 365 * 24; // 1年間のアクティビティを取得
    const response = await fetch(
      `${apiUrl}/activity/app?uuid=${uuid}&time=${time}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user activity");
    }

    const activities = await response.json();

    console.log(activities);

    // 1ヶ月前以降のアクティビティのみをフィルタリング
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const filteredActivities = activities.filter((activity: any) => {
      const activityDate = new Date(activity.created_at); // created_atフィールドを使用
      return activityDate >= oneMonthAgo;
    });

    // 月ごとのアクティビティ数を計算
    const monthlyActivityCounts = Array(12).fill(0); // 12ヶ月分のカウント用配列を初期化

    activities.forEach((activity: any) => {
      const activityDate = new Date(activity.created_at);
      const monthIndex = activityDate.getMonth(); // 月のインデックスを取得 (0 - 11)
      monthlyActivityCounts[monthIndex] += 1; // 該当月のカウントを増やす
    });

    // データをキャッシュに保存
    localStorage.setItem(
      cacheKey,
      JSON.stringify({ monthlyActivityCounts, activities: filteredActivities })
    );
    localStorage.setItem(cacheExpirationKey, (now + cacheTime).toString());

    return {
      monthlyActivityCounts,
      activities: filteredActivities,
    };
  } catch (error) {
    console.error("Error fetching user activity:", error);
    return { monthlyActivityCounts: [], activities: [] }; // デフォルトで空配列を返す
  }
};