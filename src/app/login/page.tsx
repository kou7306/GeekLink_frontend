import SignOutButton from "@/components/auth/SignOutButton";
import LoginForm from "@/components/auth/LoginForm";
import LoginButton from "@/components/auth/LoginButton";
import { getUser } from "@/lib/auth";
import SignInButton from "@/components/auth/SignInButton";

async function LoginPage() {
  const user = await getUser();

  return (
    <div className="min-h-screen bg-base flex flex-col justify-center items-center mt-[-80px]">
      <h2 className="text-2xl font-bold mb-12 text-text">ログイン</h2>
      {user ? (
        <div className="space-y-4">
          <SignOutButton />
        </div>
      ) : (
        <div className="space-y-4 bg-content_base p-8 rounded-lg shadow-md max-w-md w-full">
          <LoginForm scene="sign-in" />
          <div className="relative">
            <span className="absolute -top-8 left-0 bg-primary text-white rounded px-2 py-1 text-sm font-semibold">
              おすすめ
            </span>
            <LoginButton provider="github" />
          </div>
          <LoginButton provider="google" />
          <div className="pt-12 flex justify-end">
            <SignInButton isGuest />
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
