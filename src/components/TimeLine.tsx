import React from "react";
import TimeLineItem from "./TimeLineItem";

const TimeLine = () => {
  const timeLineData = [
    {
      name: "hoge",
      content: "個人開発のアプリのフロント部分を開発しました",
      like: 1,
    },
    {
      name: "fuga",
      content: "個人開発のアプリのバックエンド部分を開発しました",
      like: 3,
    },
    {
      name: "john doe",
      content: "個人開発のアプリのインフラ部分を開発しました",
      like: 20,
    },
    {
      name: "jane doe",
      content: "個人開発のアプリのデザイン部分を開発しました",
      like: 0,
    },
  ];
  return timeLineData.map((item) => (
    <TimeLineItem key={item.name} timeLinePost={item} />
  ));
};

export default TimeLine;
