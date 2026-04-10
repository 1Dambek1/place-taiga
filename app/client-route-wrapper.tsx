"use client";

import { usePathname } from "next/navigation";

export default function ClientRouteWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Проверяем, находимся ли мы в админке Sanity (Studio)
  const isStudio = pathname?.startsWith("/studio");

  return (
    <div
      data-route={pathname}
      className={isStudio ? "is-studio" : "site-wrapper"}
      style={{ display: "contents" }} // Чтобы div не ломал верстку
    >
      {children}
    </div>
  );
}
