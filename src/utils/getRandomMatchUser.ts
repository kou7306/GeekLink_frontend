import { getUuidFromCookie } from "@/actions/users";

export interface User {
    user_id: string;
    name: string;
    sex: string;
    age: number;
    place: string;
    occupation: string;
    topTeches: string[];
    imageURL: string;
  }
  
  // ランダムなユーザーを取得する関数
  export const getRandomUsers = async (): Promise<User[]> => {
    try {
      const uuid = await getUuidFromCookie();
      console.log(uuid);
      // APIからデータを取得
      const response = await fetch("http://localhost:8080/random-match", {
        method: "POST",
        mode: "cors",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ uuid })
      });
  
      // レスポンスをJSONとしてパース
      const data: User[] = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching random users:", error);
      return [];
    }
  };