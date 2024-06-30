import socketIOClient from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"; // 環境変数を設定する

const createSocket = (namespace: string) => {
  const socket = socketIOClient(`${ENDPOINT}${namespace}`);
  return socket;
};

export default createSocket;
