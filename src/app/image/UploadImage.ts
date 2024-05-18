// utils/uploadImage.js
import { getSupabase } from "@/actions/supabase";

export const UploadImage = async (file: any) => {
  const fileName = `${Math.random()}_${file.name}`;
  const supabase = getSupabase();
  const { data, error } = await supabase.storage
    .from("UserImage") // 作成したバケット名を入力
    .upload(`public/${fileName}`, file);

  if (error) {
    throw new Error(error.message);
  }

  return data.path;
};
