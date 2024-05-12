import SignOutButton from "@/components/auth/SignOutButton";
import LoginForm from "@/components/auth/LoginForm";
import LoginButton from "@/components/auth/LoginButton";
import { getUser } from "@/lib/auth";

async function LoginPage() {
  const user = await getUser();

  return (
    <div>
      <h2 className="text-2xl font-bold">Login Page</h2>
      {user ? (
        <SignOutButton />
      ) : (
        <>
          <LoginForm />
          <LoginButton provider="google" />
          <LoginButton provider="github" />
        </>
      )}
    </div>
  );
}

export default LoginPage;
