import { getUuidFromCookie } from "@/actions/users";
import ShopPageClient from "@/components/rpg/ShopPageClient";
import { redirect } from "next/navigation";

async function getUserCoin(userId: string) {
  const response = await fetch(`http://backend:8080/rpg/coin/${userId}`, {
    cache: "no-store",
  });
  return response.json();
}

async function getUserItems(userId: string) {
  const response = await fetch(`http://backend:8080/rpg/item/${userId}`, {
    cache: "no-store",
  });
  return response.json();
}

export default async function Page() {
  const uuid = await getUuidFromCookie();

  if (!uuid) {
    redirect("/login");
  }

  const [userCoin, userItems] = await Promise.all([getUserCoin(uuid), getUserItems(uuid)]);

  return <ShopPageClient userId={uuid} userCoin={userCoin} userItems={userItems} />;
}
