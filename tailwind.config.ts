import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00AEEF",
        secondary: "#8A2BE2",
        background: "#1E1E2E",
        foreground: "#FEF9EE",
        hover: "#00FF99",

        categories: {
          house: "#66BB6A",
          leisure: "#FF9800",
          transport: "#2196F3",
          education: "#4169E1",
          clothing: "#9C27B0",
          health: "#E53935",
          fixedExpenses: "#757575"
        }
      },

      fontFamily: {
        poppins: "var(--font-poppins), sans-serif",
        robotoMono: "var(--font-robotoMono), monospace"
      }
    }
  },
  plugins: []
} satisfies Config;
