/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["gtgvxyhjgbjbfcsakfzc.supabase.co", "zukan.pokemon.co.jp"],
  },

  reactStrictMode: true,
  // ⬇追加
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:3000",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "https://giiku5-frontend.vercel.app/",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
