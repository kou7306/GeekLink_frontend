import React from "react";

interface ActivityProps {
  kind: string; // データの種類（例: 'github'）
  data: any[]; // データ
}

// Activityコンポーネント
const Activity: React.FC<ActivityProps> = ({ kind, data }) => {
  // 日付でソート（新しい順）
  const sortedActivities = data.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div>
      {sortedActivities.map((activity) => (
        <div key={activity.date}>
          <p>{activity.date}</p>
          <p>{activity.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Activity;
