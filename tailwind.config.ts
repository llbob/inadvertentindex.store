import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "accent-1": "#FAFAFA",
        "accent-2": "#EAEAEA",
        "accent-7": "#333",
        success: "#0070f3",
        cyan: "#79FFE1",
        background: "#FBFBFB",
        "base-text": "#333333",
      },
      textColor: {
        "subtle": "#E0DDDE",
        "lighter-gray": "#979797",
        "mid-gray": "#777777",
        "darker-gray": "#333333",
      },
      spacing: {
        28: "7rem",
      },
      letterSpacing: {
        tighter: "-.04em",
      },
      fontSize: {
        "xs": "0.65rem",
        "sm": "0.75rem",
        "base": "0.85rem",
        "lg": "0.95rem",
        "xl": "1.125rem",
        "2xl": "1.25rem",
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },
      boxShadow: {
        sm: "0 5px 10px rgba(0, 0, 0, 0.12)",
        md: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
      fontFamily: {
        sans: ['ABC Diatype Plus Variable', 'Arial', 'sans-serif'],
      },
      fontVariationSettings: {
        'mono-light': '"MONO" 1, "wght" 300',
        'mono-regular': '"MONO" 1, "wght" 400',
        'mono-bold': '"MONO" 1, "wght" 700',
        'sans-light': '"MONO" 0, "wght" 300',
        'sans-regular': '"MONO" 0, "wght" 400',
        'sans-bold': '"MONO" 0, "wght" 700',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '50%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInSimple: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        revealFromLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        centerToTop: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(0)' },
        }
      },
      animation: {
        'fadeIn': 'fadeIn 1s ease-in-out',
        'revealFromLeft': 'revealFromLeft 2s forwards',
        'centerToTop': 'centerToTop 1s ease-in-out 3s forwards',
      },
    },
  },
  plugins: [],
};
export default config;
