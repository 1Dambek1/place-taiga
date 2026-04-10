import { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientRouteWrapper from "./client-route-wrapper";

const fmBolyar = localFont({
  src: [
    {
      path: "../public/fonts/FMBolyarPro-100.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/FMBolyarPro-300.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/FMBolyarPro-500.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/FMBolyarPro-700.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/FMBolyarPro-900.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-fm-bolyar",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://t-taigi.ru"), // Обязательно для картинок!
  title: "ТЕРРИТОРИЯ ТАЙГИ",
  description: "Сеть отелей и ресторанов на Алтае",
  openGraph: {
    title: "ТЕРРИТОРИЯ ТАЙГИ",
    description:
      "Почувствуйте атмосферу комфорта и природы в самом сердце тайги.",
    url: "https://t-taigi.ru",
    siteName: "ТЕРРИТОРИЯ ТАЙГИ",
    images: [
      {
        url: "/DSC04013-HDR.jpg", // Файл должен лежать в папке public
        width: 1200,
        height: 630,
        alt: "ТЕРРИТОРИЯ ТАЙГИ Превью",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={fmBolyar.variable}>
        <ClientRouteWrapper>{children}</ClientRouteWrapper>
      </body>
    </html>
  );
}
