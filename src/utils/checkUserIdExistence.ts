import { getUuidFromCookie } from "@/actions/users";
import axios from "axios";

// ユーザーIDが存在するかどうかを確認する関数
export const checkUserIdExistence = async (): Promise<boolean> => {
  try {
    const user_id = await getUuidFromCookie();

    if (!user_id) {
      return false; // ユーザーIDが存在しない場合
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/check-user-exists`,
      {
        user_id,
      }
    );

    return response.data.exists;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};
