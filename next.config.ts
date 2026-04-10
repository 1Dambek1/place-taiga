import type { NextConfig } from "next";

const basePath = process.env.GITHUB_ACTIONS === "true" ? "/place-taiga" : "";

const nextConfig: NextConfig = {
  output: "export", // статический экспорт
  distDir: "project/out", // папка для статических файлов
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true, // если есть <Image /> компоненты
  },
};

export default nextConfig;
