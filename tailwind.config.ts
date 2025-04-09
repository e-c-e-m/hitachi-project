import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "500px",
        md: "900px",
        xl: "1400px",
        xxl: "1800px",
      },
      keyframes: {
        ringPulse: {
          "0%": { transform: "translate(-50%, -50%) scale(0.6)" },
          "100%": { transform: "translate(-50%, -50%) scale(1)" },
        },
      },
      animation: {
        ringPulse: "ringPulse 1s ease-out alternate infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
