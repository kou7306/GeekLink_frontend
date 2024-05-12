import SignOutButton from "@/components/auth/SignOutButton";
import LoginForm from "@/components/auth/LoginForm";
import LoginButton from "@/components/auth/LoginButton";
import { getUser } from "@/lib/auth";

async function LoginPage() {
  const user = await getUser();

  return (
    <div>
      <h2>Login</h2>
      {user ? (
        <SignOutButton />
      ) : (
        <div>
          <LoginForm scean="sign-in"/>
          <LoginButton provider="google" />
          <LoginButton provider="github" />
        </div>
      )}
    </div>
  );
}

export default LoginPage;
