import LoginButton from "../../components/LoginButton";
import SignOutButton from "../../components/SignOutButton";
import { getUser } from "../../lib/auth";

async function LoginPage() {
  const user = await getUser();

  return (
    <div>
      <h2 className="text-2xl font-bold">Login Page</h2>
      {user ? <SignOutButton /> : <LoginButton />}
    </div>
  );
}

export default LoginPage;
