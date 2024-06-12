import type { Metadata } from "next";
import "./globals.scss";
import { plusJakartaSans } from "@/libs/fonts";
import { Providers } from "@/ui/provider/provider";

export const metadata: Metadata = {
    title: "Kanban | Dirk Brandon Lapitan",
    description: "A fully-functional task management app with a light/dark mode toggle.",
};

export default function RootLayout({
    children,
    modal
}: Readonly<{
    children: React.ReactNode,
    modal: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={plusJakartaSans.className}>
                <Providers>
                    { children }
                    { modal }
                </Providers>
            </body>
        </html>
    );
}
