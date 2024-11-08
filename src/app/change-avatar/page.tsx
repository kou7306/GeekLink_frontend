import { getUuidFromCookie } from "@/actions/users";
import ChangeAvatarPage from "@/components/rpg/ChangeAvatarPage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getCurrentAvatar(userId: string) {
  const response = await fetch(`http://localhost:8080/avatar/${userId}`, {
    cache: "no-store",
  });
  return response.json();
}

async function getUserItems(userId: string) {
  const response = await fetch(`http://localhost:8080/rpg/item/${userId}`, {
    cache: "no-store",
  });
  return response.json();
}

export default async function Page() {
  const uuid = await getUuidFromCookie();

  if (!uuid) {
    redirect("/login");
  }

  const [currentAvatarData, userItemsData] = await Promise.all([
    getCurrentAvatar(uuid),
    getUserItems(uuid),
  ]);

  return (
    <ChangeAvatarPage
      userId={uuid}
      currentAvatarData={currentAvatarData}
      userItemsData={userItemsData}
    />
  );
}
