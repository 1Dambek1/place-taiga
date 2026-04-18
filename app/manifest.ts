import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (process.env.GITHUB_ACTIONS === "true" ? "/place-taiga" : "");

export default function manifest(): MetadataRoute.Manifest {
  const startUrl = basePath ? `${basePath}/` : "/";

  return {
    name: "Taiga Territory",
    short_name: "Taiga",
    description:
      "Hotel, restaurant and event venues in Irkutsk and around Lake Baikal.",
    start_url: startUrl,
    scope: startUrl,
    display: "standalone",
    background_color: "#f6f7f2",
    theme_color: "#1d2a24",
    lang: "ru",
    icons: [
      {
        src: `${basePath}/IMG_3054.PNG`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: `${basePath}/IMG_3054.PNG`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
