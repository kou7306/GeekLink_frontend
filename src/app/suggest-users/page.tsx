import UsersPage from "@/components/suggest-users/UsersPage";
import { checkUserIdExistence } from "@/utils/checkUserIdExistence";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const isUserIdExist = await checkUserIdExistence();
  // ユーザーIDが存在しない場合はプロフィール初期化ページにリダイレクト
  if (!isUserIdExist) {
    redirect("/profile-initialization");
  }

  return <UsersPage isUserIdExist={isUserIdExist} />;
};

export default page;
