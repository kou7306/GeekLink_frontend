// utils/uploadImage.js
import { getSupabase } from "@/actions/supabase";
import toast from "react-hot-toast";

export const UploadImage = async (file: any) => {
  const fileName = `${Date.now()}_${file.name}`;
  const supabase = getSupabase();
  const { data, error } = await supabase.storage
    .from("UserImage") // 作成したバケット名を入力
    .upload(`public/${fileName}`, file);

  if (error) {
    toast.error("画像のアップロードに失敗しました");
    throw new Error(error.message);
  }

  toast.success("画像をアップロードしました");
  return data.path;
};
