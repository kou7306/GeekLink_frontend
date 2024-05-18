import { getUser } from "@/lib/auth";

const Home = async () => {
  const user = await getUser();

  return (
    <div>
      <h1>Home</h1>
      <p>Home page content</p>
      {user && <p>User UID: {user.id}</p>}
    </div>
  );
};

export default Home;
