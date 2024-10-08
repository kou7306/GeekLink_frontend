import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary:  "#22d3ee",
        secondary: "#f3f4f6",
        base: "#ffffff",
        border: "#e5e7eb",
        accent: "#ee223c",
        text: "#111827",
      },
    },
  },
  plugins: [],
};
export default config;
