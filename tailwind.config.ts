import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/page/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/constants/navigationRoute.tsx",
  ],
  theme: {
    extend: {
      screens: {
        toastify: { max: "480px" },
      },
      colors: {
        colorsGray: "#ced4da",
        colorsLightGray: "#f6f6f6",
        colorsDarkGray: "#616568",
        success: "#198754",
        danger: "#dc3545",
        primary: "#00c471",
        secondary: "#343a40",
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
    },
  },
  plugins: [],
}
export default config
