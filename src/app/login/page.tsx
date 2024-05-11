import { getUser } from "@/lib/auth";
import LoginButton from "../../components/auth/LoginButton";
import SignOutButton from "../../components/auth/SignOutButton";
// import { useState } from "react";
import SignInButton from "@/components/auth/SignInButton";
import SignUpButton from "@/components/auth/SignUpButton";

async function LoginPage() {
  const user = await getUser();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  return (
    <div>
      <h2 className="text-2xl font-bold">Login Page</h2>
      <input 
        type="email"
        placeholder="Email"
        // value={email}
        // onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        // value={password}
        // onChange={(e) => setPassword(e.target.value)}
      />

      {user ? (
        <SignOutButton />
      ) : (
        <div>
          <SignInButton email={"imaikosuke2@gmail.com"} password={"hogeHOGE0202"} />
          <SignUpButton email={"imaikosuke2@gmail.com"} password={"hogeHOGE0202"} />
          <LoginButton provider="github" />
          <LoginButton provider="google" />
        </div>
      )}
    </div>
  );
}

export default LoginPage;
