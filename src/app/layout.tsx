import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "./Header";
import Providers from "./Providers";
import ClientWrapper from "./ClientWrapper";
import { getUuidFromCookie } from "@/actions/users";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GeekLink",
  description: "GeekLink - 学生エンジニアのためのプラットフォーム",
  icons: {
    icon: [
      {
        url: "/geeklink-logo.svg",
        type: "image/svg+xml",
      }
    ]
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const uuid = await getUuidFromCookie();

  return (
    <html lang="ja">
      <body className={`${inter.className} bg-base text-text`}>
        {uuid && <Header />}
        <Providers>
          <ClientWrapper>
            <main className="pt-20 text-font">{children}</main>
          </ClientWrapper>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
