import React from "react";

interface ActivityProps {
  kind: string; // データの種類（例: 'github', 'qiita' など）
  data: { date: string; title: string }[]; // データ（共通する 'date' と 'title' 要素を含む）
}

// Activityコンポーネント
const Activity: React.FC<{ activities: ActivityProps[] }> = ({
  activities,
}) => {
  // 全ての data をマージし、新着順でソート
  const sortedActivities = activities
    .flatMap((activity) => activity.data) // 各 `ActivityProps` の `data` を展開してマージ
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // 日付でソート

  return (
    <div>
      {sortedActivities.map((activity, index) => (
        <div key={`${activity.date}-${index}`}>
          <p>{activity.date}</p>
          <p>{activity.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Activity;
