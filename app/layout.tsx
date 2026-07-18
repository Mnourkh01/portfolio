import type { Metadata } from "next";
import { Archivo, Archivo_Black, IBM_Plex_Mono } from "next/font/google";
import { SITE_URL, GITHUB_URL, LINKEDIN_URL } from "@/lib/site";
import "./globals.css";

const sans = Archivo({
  subsets: ["latin"],
  variable: "--font-sans-a",
  display: "swap",
});

const display = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display-a",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-plex",
  display: "swap",
});

const DESCRIPTION =
  "Portfolio of Mohammad Nour, a backend-focused full-stack engineer in Amman building secure, multi-tenant backend systems in Java, Kotlin, PHP, and TypeScript.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mohammad Nour · Backend Engineer",
    template: "%s · Mohammad Nour",
  },
  description: DESCRIPTION,
  keywords: [
    "Mohammad Nour",
    "backend engineer",
    "full-stack engineer",
    "Java",
    "Kotlin",
    "PHP",
    "TypeScript",
    "Spring Boot",
    "Laravel",
    "multi-tenant",
    "Amman",
    "Jordan",
  ],
  authors: [{ name: "Mohammad Nour", url: GITHUB_URL }],
  creator: "Mohammad Nour",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Mohammad Nour",
    title: "Mohammad Nour · Backend Engineer",
    description:
      "Secure, multi-tenant backend systems in Java, Kotlin, PHP & TypeScript.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Nour · Backend Engineer",
    description:
      "Secure, multi-tenant backend systems in Java, Kotlin, PHP & TypeScript.",
  },
};

export const viewport = { themeColor: "#131417" };

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohammad Nour Ali Al-Khushieny",
  alternateName: "Mohammad Nour",
  url: SITE_URL,
  jobTitle: "Backend Engineer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Amman",
    addressCountry: "JO",
  },
  email: "mailto:m.nourkh01@gmail.com",
  sameAs: [GITHUB_URL, LINKEDIN_URL],
  knowsAbout: [
    "Java",
    "Kotlin",
    "PHP",
    "TypeScript",
    "Spring Boot",
    "Laravel",
    "PostgreSQL",
    "Redis",
    "Multi-tenant systems",
    "REST API design",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
