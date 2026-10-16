import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Schibsted_Grotesk } from "next/font/google";
import {
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  PERSON,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";
import { colorTokens, tokenHex } from "@/lib/tokens";
import "./globals.css";

const display = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-schibsted",
  display: "swap",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  authors: [{ name: PERSON.name, url: GITHUB_URL }],
  creator: PERSON.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: tokenHex("canvas"),
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: PERSON.name,
      url: SITE_URL,
      jobTitle: PERSON.role,
      description: PERSON.line,
      email: `mailto:${EMAIL}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: PERSON.city,
        addressCountry: PERSON.countryCode,
      },
      worksFor: {
        "@type": "Organization",
        name: PERSON.company,
        url: PERSON.companyUrl,
      },
      sameAs: [GITHUB_URL, LINKEDIN_URL],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
      about: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

const BOOT = `(function(){try{
var d=document.documentElement;
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
d.classList.add('motion');
if(!location.hash)d.classList.add('intro-pending');
if(matchMedia('(min-width: 1200px)').matches){
var vw=d.clientWidth-240,vh=innerHeight-48;
var s=Math.min((vw-112)/1440,(vh-132)/900);
d.classList.add('is-board');
d.style.setProperty('--cam-s',s.toFixed(5));
d.style.setProperty('--cam-x',(vw/2-720*s).toFixed(2)+'px');
d.style.setProperty('--cam-y',(vh/2-(450-8/s)*s).toFixed(2)+'px');
}
setTimeout(function(){if(!window.__canvasReady){d.classList.remove('motion','intro-pending','is-board');}},6000);
}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <style>{`:root{${colorTokens.map((t) => `${t.cssVar}:${t.hex}`).join(";")}}`}</style>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
