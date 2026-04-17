import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import ClientRouteWrapper from "./client-route-wrapper";
import { withBasePath } from "@/lib/base-path";

const siteBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (process.env.GITHUB_ACTIONS === "true" ? "/place-taiga" : "");
const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_URL || "https://1dambek1.github.io";
const siteUrl = `${siteOrigin}${siteBasePath}`;
const siteName = "Территория Тайги";
const siteDescription =
  "Сеть отелей, ресторанов и событийных площадок в Иркутске и на Байкале с акцентом на атмосферу, сервис и визуальную эстетику.";
const previewImage = withBasePath("/DSC04013-HDR.jpg");
const heroPoster = withBasePath(
  "/japanese-zen-hotel-room-white-sakura-minimalist-ba.jpg",
);
const logoImage = withBasePath("/IMG_3054.PNG");

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      inLanguage: "ru-RU",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      description: siteDescription,
      logo: `${siteOrigin}${logoImage}`,
      image: `${siteOrigin}${previewImage}`,
      sameAs: [
        "https://www.azatay.ru/",
        "https://yakovlevhotel.ru/",
        "https://victoryhotel.ru/",
        "https://atlas-irk.ru/",
        "https://taigahotel.ru/",
        "https://t.me/taiga_irkutsk_hotel",
        "https://t.me/azataybaikal",
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "отели Иркутск",
    "отель Байкал",
    "бутик-отель Иркутск",
    "сеть отелей Иркутск",
    "ресторан Байкал",
    "конференц-зал Иркутск",
    "Территория Тайги",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  category: "travel",
  alternates: {
    canonical: siteUrl,
  },
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  manifest: withBasePath("/manifest.webmanifest"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      {
        url: logoImage,
        type: "image/png",
      },
    ],
    shortcut: [logoImage],
    apple: [logoImage],
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: siteUrl,
    siteName,
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "Территория Тайги",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [previewImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1d2a24",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link
          rel="preload"
          href={heroPoster}
          as="image"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href={withBasePath("/fonts/FMBolyarPro-500.ttf")}
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href={withBasePath("/fonts/FMBolyarPro-700.ttf")}
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Script
          id="taiga-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <ClientRouteWrapper>{children}</ClientRouteWrapper>
      </body>
    </html>
  );
}

