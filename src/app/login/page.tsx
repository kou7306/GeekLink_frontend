// src/app/login/page.tsx
import SignOutButton from "@/components/auth/SignOutButton";
import LoginForm from "@/components/auth/LoginForm";
import LoginButton from "@/components/auth/LoginButton";
import { getUser } from "@/lib/auth";

async function LoginPage() {
  const user = await getUser();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">ログイン</h2>
      {user ? (
        <div className="space-y-4">
          <SignOutButton />
        </div>
      ) : (
        <div className="space-y-4 bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
          <LoginForm scene="sign-in" />
          <LoginButton provider="google" />
          <LoginButton provider="github" />
        </div>
      )}
    </div>
  );
}

export default LoginPage;
