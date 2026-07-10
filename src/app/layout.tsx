import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/custom-cursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anbu | Portfolio",
  description: "Software Developer Portfolio — Anbu Selvan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body className={`${inter.className} antialiased min-h-screen overflow-x-hidden`} style={{ margin: 0, padding: 0 }}>
        <CustomCursor />
        <main>{children}</main>
      </body>
    </html>
  );
}
