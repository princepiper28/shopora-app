import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // ✅ Enables dark mode using 'class'
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🎨 Brand Palette
        "shopora-blue": "#2563EB", // Primary brand blue
        "shopora-yellow": "#FBBF24", // Accent color for warmth
        "shopora-bg": "#F9FAFB", // Light neutral background
        "shopora-dark": "#111827", // Dark background / text
        "shopora-text": "#111827", // Default dark text
        "shopora-muted": "#6B7280", // Muted gray text
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"], // Body
        display: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"], // Headings
      },
      boxShadow: {
        card: "0 4px 12px rgba(0, 0, 0, 0.05)", // ✅ soft card shadows
        "card-hover": "0 6px 16px rgba(0, 0, 0, 0.1)",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "3rem",
          xl: "4rem",
        },
      },
    },
  },
  plugins: [],
};

export default config;

