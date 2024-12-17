import ProfileCard from "@/components/profile/ProfileCard";
import Loading from "@/components/core/Loading";
import { getUuidFromCookie } from "@/actions/users";
import { redirect } from "next/navigation";

async function fetchUser(uuid: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/profile/get-profile/${uuid}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
}

const UserProfile = async ({ params }: { params: { uuid: string } }) => {
  const uuid = params.uuid;

  const cookieUuid = await getUuidFromCookie();
  if (uuid === cookieUuid) {
    return redirect("/my-page");
  }

  const user = await fetchUser(uuid);

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-base py-10">
      <ProfileCard user={user} isMe={false} />
    </div>
  );
};

export default UserProfile;
