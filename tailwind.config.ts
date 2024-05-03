import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./src/page/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/socket/client/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/constants/navigationRoute.tsx",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
        "3xl": "1920px",
      },
    },
    extend: {
      screens: {
        toastify: { max: "480px" },
        editor: { min: "480px" },
        lgDevice: { min: "992px" },
        tablet: { min: "834px" },
        tabletDevice: { min: "640px", max: "991px" },
        pc: { min: "992px" },
        calendarRow: { min: "695px" },
      },
      colors: {
        colorsGray: "#ced4da",
        colorsLightGray: "#f6f6f6",
        colorsDarkGray: "#616568",
        success: "#198754",
        info: "#ecf5ff",
        danger: "#dc3545",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#00c471",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#343a40",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundColor: {
        socialKakao: "#fae500",
        socialGoogle: "#f8f8f8",
        socialGithub: "#3c4043",
      },
      zIndex: {
        header: "8",
        navigation: "7",
        modalContainer: "9",
        modalDim: "10",
        modal: "11",
      },
      height: {
        header: "64px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/container-queries"),
  ],
} satisfies Config

export default config
