import { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ClientRouteWrapper from "./client-route-wrapper";

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
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
      <body className={manrope.variable}>
        <ClientRouteWrapper>{children}</ClientRouteWrapper>
      </body>
    </html>
  );
}
