import type { NextConfig } from "next";

const nextConfig = {
  output: "export", // статический экспорт
  distDir: "project/out", // папка для статических файлов
  images: {
    unoptimized: true, // если есть <Image /> компоненты
  },
};

export default nextConfig;
