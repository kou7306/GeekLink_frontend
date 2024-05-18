import { getUser } from "@/lib/auth";
import { getUuidFromCookie } from "@/actions/users";

const Home = async () => {
  const user = await getUser();
  const uuid = getUuidFromCookie();
  return (
    <div>
      <h1>Home</h1>
      <p>Home page content</p>
      {user && <p>User UID: {user.id}</p>}
      <p>{uuid}</p>
    </div>
  );
};

export default Home;
