import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        taiga: {
          light: "#F2F4F3", // Мягкий белый/светло-серый
          DEFAULT: "#2C4A3B", // Основной зеленый (хвоя)
          dark: "#1A2E25", // Темный зеленый для футера/ночи
          accent: "#C5D6C8", // Светло-зеленый акцент
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        serif: ["var(--font-playfair)"], // Для заголовков
      },
    },
  },
  plugins: [],
};
export default config;
