import type { Metadata } from "next";
import "./globals.scss";
import { plusJakartaSans } from "@/libs/fonts";

export const metadata: Metadata = {
  title: "Kanban | Dirk Brandon Lapitan",
  description: "A fully-functional task management app with a light/dark mode toggle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.className}>{children}</body>
    </html>
  );
}
