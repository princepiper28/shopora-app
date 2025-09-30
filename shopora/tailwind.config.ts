import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // add if using App Router
  ],
  theme: {
    extend: {
      colors: {
        shopora: {
          primary: "#2563eb", // blue-600
          accent: "#f97316",  // orange-500
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Poppins", "ui-sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

