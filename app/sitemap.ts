import type { MetadataRoute } from "next";

const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (process.env.GITHUB_ACTIONS === "true" ? "/place-taiga" : "");
const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_URL || "https://1dambek1.github.io";
const siteUrl = `${siteOrigin}${basePath}`;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
