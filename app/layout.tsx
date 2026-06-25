import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jb",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mnour.dev"),
  title: "Mohammad Nour — Backend Engineer",
  description:
    "Portfolio of Mohammad Nour, a backend engineer in Amman building secure, multi-tenant backend systems in Java, Kotlin, PHP, and TypeScript.",
  openGraph: {
    title: "Mohammad Nour — Backend Engineer",
    description:
      "Secure, multi-tenant backend systems in Java, Kotlin, PHP & TypeScript.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport = { themeColor: "#020402" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
