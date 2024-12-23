import UsersPage from "@/components/suggest-users/UsersPage";
import { getSuggestUser } from "@/utils/getSuggestUser";
import React from "react";
import Loading from "../loading";

const page = async () => {
  const data = await getSuggestUser();

  if (!data) {
    return <Loading />;
  }

  return <UsersPage isUserIdExist={true} users={data} />;
};

export default page;
