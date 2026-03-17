import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Crimson_Text } from "next/font/google";
import "./globals.css";
import { RootProviders } from "@/providers/RootProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const crimsonText = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "SilviVerse - Un Universo de Recuerdos y Amor",
  description: "Un lugar mágico dedicado a alguien especial. Guarda recuerdos, emociones, cartas y flores en un universo digital romántico.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${crimsonText.variable} antialiased bg-gradient-to-br from-white via-pink-50 to-purple-50 dark:from-black dark:via-purple-950 dark:to-black min-h-screen`}
      >
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
