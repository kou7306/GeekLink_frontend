export const getQiitaActivity = async (
  uuid: string
): Promise<{
  monthlyPostCounts: number[]; // 年間の月ごとの投稿数
  postDetails: {
    title: any;
    likes_count: any;
    page_views_count: any;
    tags: any[];
    url: any;
    date: Date;
  }[]; // 1ヶ月前からの投稿の詳細情報
}> => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const cacheKey = `qiita-${uuid}`;
    const cacheExpirationKey = `qiita-expiration-${uuid}`;
    const oneWeekInMs = 24 * 60 * 60 * 1000;

    // 現在の時刻と1ヶ月前のカットオフ日を取得
    const now = new Date().getTime();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const cutoffDate = oneMonthAgo.getTime();

    // キャッシュが存在し、有効期限内の場合はキャッシュからデータを取得
    const cachedData = localStorage.getItem(cacheKey);
    const cacheExpiration = localStorage.getItem(cacheExpirationKey);

    if (cachedData && cacheExpiration && now < Number(cacheExpiration)) {
      return JSON.parse(cachedData); // キャッシュが有効ならそれを返す
    }

    // キャッシュがないか有効期限が切れている場合、新たにデータを取得
    const response = await fetch(
      `${apiUrl}/activity/qiita?uuid=${uuid}&period=1yr`,
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

    const qiita_info = await response.json();
    const monthlyPostCounts = qiita_info.monthlyPostCounts;
    const posts = qiita_info.postDetails;
    // 月別の投稿数（年間）と詳細データ（1ヶ月前以降）を初期化
    const postDetails: {
      title: any;
      likes_count: any;
      page_views_count: any;
      tags: any[];
      url: any;
      date: Date;
    }[] = [];

    // 投稿データをループし、投稿月に応じてカウントを更新
    posts.forEach(
      (post: {
        tags: any[];
        likes_count: any;
        page_views_count: any;
        date: Date;
        title: string;
        url: string;
      }) => {
        const postDate = new Date(post.date);

        // 1ヶ月前以降の投稿のみ詳細を追加
        if (postDate.getTime() >= cutoffDate) {
          postDetails.push({
            title: post.title,
            likes_count: post.likes_count,
            page_views_count: post.page_views_count,
            tags: post.tags,
            url: post.url,
            date: post.date,
          });
        }
      }
    );

    // データをキャッシュに保存し、有効期限を設定
    localStorage.setItem(
      cacheKey,
      JSON.stringify({ monthlyPostCounts, postDetails })
    );
    localStorage.setItem(cacheExpirationKey, (now + oneWeekInMs).toString());

    // 結果を返す
    return { monthlyPostCounts, postDetails };
  } catch (error) {
    console.error("Error fetching contributions:", error);
    return { monthlyPostCounts: [], postDetails: [] };
  }
};
