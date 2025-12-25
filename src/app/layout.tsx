import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ModeToggle, ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lyrical",
  description: "A modern lyrics app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&family=Montserrat:wght@400;700;800&family=Poppins:wght@400;700;800&family=Raleway:wght@400;700;800&family=Playfair+Display:wght@400;700;800&family=Lora:wght@400;700;800&family=Crimson+Text:wght@400;700;800&family=JetBrains+Mono:wght@400;700;800&family=Dancing+Script:wght@400;700;800&family=Caveat:wght@400;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.className} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ModeToggle className="absolute bottom-2 left-2" />
        </ThemeProvider>
      </body>
    </html>
  );
}
