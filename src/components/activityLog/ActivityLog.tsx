import React from "react";

interface ActivityProps {
  kind: string; // データの種類（例: 'github', 'qiita' など）
  data: any[];
}

// Activityコンポーネント
const Activity: React.FC<{ activities: ActivityProps[] }> = ({
  activities,
}) => {
  // 全ての data をマージし、新着順でソート
  const sortedActivities = activities
    .flatMap((activity) => activity.data) // 各 `ActivityProps` の `data` を展開してマージ
    .sort((a, b) => {
      // date または created_at に基づいてソート
      const dateA = a.date
        ? new Date(a.date).getTime()
        : a.created_at
        ? new Date(a.created_at).getTime()
        : 0;
      const dateB = b.date
        ? new Date(b.date).getTime()
        : b.created_at
        ? new Date(b.created_at).getTime()
        : 0;
      return dateB - dateA; // 降順
    });

  return (
    <div>
      {sortedActivities.map((activity, index) => (
        <div key={`${activity.date || activity.created_at}-${index}`}>
          <p>{activity.date || activity.created_at}</p>
          <p>{activity.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Activity;
