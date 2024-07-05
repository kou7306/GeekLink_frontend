import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "./Header";
import { getUuidFromCookie } from "@/actions/users";
import { getUser } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Giiku5",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  return (
    <html lang="ja">
      <body className={inter.className}>
        {user != null && <Header />}
        <main className="py-20">{children}</main>

        <Toaster />
      </body>
    </html>
  );
}
