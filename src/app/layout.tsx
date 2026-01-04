import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ModeToggle, ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LyricsVibe",
  description: "A minimal and beautiful lyrics viewer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
          <ModeToggle className="fixed bottom-2 left-2" />
          <footer className="py-6 mt-10 border-t">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              &copy; 2026 Lyrical. All rights reserved.
              Made with ❤️ by
              <a
                href="https://anish7.me"
                target="_blank"
                rel="noopener noreferrer"
                className="underline ml-1 hover:text-lime-500"
              >
                Anish Biswas
              </a>
              .
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
