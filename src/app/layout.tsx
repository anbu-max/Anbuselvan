import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/custom-cursor";

export const metadata: Metadata = {
  title: "Anbu | Portfolio",
  description: "Software Developer Portfolio — Anbu Selvan",
};

import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <meta name="google-site-verification" content="VIAAfXJQ0HsqNQzox_u-fvc_EEgiQTUy0484qeG7KpQ" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body className="antialiased min-h-screen overflow-x-hidden" style={{ margin: 0, padding: 0, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <CustomCursor />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
