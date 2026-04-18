import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (process.env.GITHUB_ACTIONS === "true" ? "/place-taiga" : "");
const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_URL || "https://1dambek1.github.io";
const siteUrl = `${siteOrigin}${basePath}`;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: new URL(siteOrigin).host,
  };
}
