import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import QiitaItem from "./QiitaItem";
import { useQuery } from "@tanstack/react-query";
import { getUuidFromCookie } from "@/actions/users";
import { QiitaArticle } from "../../../types/qiitaArticle";
import { useParams } from "next/navigation";

type Props = {
  isMe: boolean;
};

const QiitaList: React.FC<Props> = ({ isMe }) => {
  const { uuid } = useParams();

  const { isPending, isError, error, data } = useQuery({
    queryKey: ["qiita"],
    queryFn: async () => {
      let userUid = isMe ? (await getUuidFromCookie()) ?? uuid : uuid;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/activity/qiita?uuid=${userUid}&period=all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Qiita activity");
      }
      return response.json();
    },
  });

  if (isPending) return <div>Loading...</div>;

  if (isError)
    return (
      <>
        <Card sx={{ marginY: 4, padding: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Qiita
            </Typography>
            <div>データがありません</div>
          </CardContent>
        </Card>
      </>
    );

  return (
    <Card
      sx={{
        maxWidth: 400,
        height: 770,
        mt: 4,
        mx: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Qiita
        </Typography>
      </CardContent>
      <CardContent sx={{ flexGrow: 1, overflowY: "auto", padding: 2 }}>
        {data.postDetails.map((item: QiitaArticle, index: number) => (
          <QiitaItem item={item} key={index} />
        ))}
      </CardContent>
    </Card>
  );
};

export default QiitaList;
