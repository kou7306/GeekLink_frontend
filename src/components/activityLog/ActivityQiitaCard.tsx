import React from "react";
import { Card, CardContent, Paper, Typography, Link } from "@mui/material"; // Linkコンポーネントもインポート
import Image from "next/image"; // Imageコンポーネントをインポート

// Qiita活動用のカードコンポーネント
export const QiitaActivityCard: React.FC<{ activity: any }> = ({
  activity,
}) => {
  return (
    <Paper sx={{ mb: 2, ml: 4, boxShadow: "none" }}>
      <Card
        sx={{
          border: "1px solid rgba(0, 0, 0, 0.12)",
          bgcolor: "background.default",
          ":hover": {
            bgcolor: "info.main",
          },
        }}
      >
        <CardContent>
          <Typography variant="caption" color="text.primary" sx={{ mb: 1 }}>
            Qiita Post
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Qiitaのアイコン */}
            <Image
              src="/qiita-icon.png"
              alt="Qiita"
              width={24}
              height={24}
              style={{ marginRight: 8 }}
            />
            <Link
              href={activity.url}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
            >
              <Typography variant="subtitle1" color="text.primary">
                {activity.title}
              </Typography>
            </Link>
          </div>
          <Typography variant="body2" color="text.secondary">
            {new Date(activity.created_at).toLocaleTimeString()} -{" "}
            <span>Qiita Activity</span>
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
};
