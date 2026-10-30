import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./templates/**/*.{js,ts,jsx,tsx,mdx}", "./utils/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: "#fdfbf7",
          100: "#fbf7f0",
          200: "#f4ecdf",
          300: "#e9dcc6",
          400: "#d9c7a7"
        },
        maroon: {
          50: "#fbf1f2",
          100: "#f5dfe2",
          500: "#9c2f3e",
          600: "#8b2634",
          700: "#7a1f2b",
          800: "#5e1620",
          900: "#3f0e15"
        },
        gold: {
          100: "#f9f1d6",
          200: "#f1e3ad",
          300: "#e9d48a",
          400: "#d9b95a",
          500: "#c9a227",
          600: "#a8861d",
          700: "#846815"
        },
        ink: "#1c1917",
        mute: "#6f6259"
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "Manrope", "Segoe UI", "Arial", "sans-serif"],
        display: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 18px 50px -20px rgba(60, 30, 20, 0.25)",
        card: "0 1px 2px rgba(60, 30, 20, 0.06), 0 12px 32px -18px rgba(60, 30, 20, 0.28)",
        lift: "0 24px 60px -24px rgba(60, 30, 20, 0.45)"
      },
      borderRadius: {
        "2xl": "1.1rem",
        "3xl": "1.5rem"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(.2,.7,.2,1) both",
        float: "float 7s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
