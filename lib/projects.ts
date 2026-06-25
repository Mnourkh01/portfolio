export type Project = {
  index: string;
  title: string;
  tag: string;
  blurb: string;
  stack: string[];
  year: string;
  href: string;
};

const GITHUB = "https://github.com/Mnourkh01";

export const projects: Project[] = [
  {
    index: "01",
    title: "FoloEngine",
    tag: "Flagship",
    blurb:
      "Multi-tenant licensed commerce engine powering multiple live storefronts and a marketplace. Composer package + control-plane with HMAC-signed APIs (nonce/replay protection), a fail-closed capability gate over 19+ features, and append-only loyalty / gift-card ledgers.",
    stack: ["Laravel 12", "PHP 8.4", "Filament", "Composer"],
    year: "2025",
    href: GITHUB,
  },
  {
    index: "02",
    title: "Folowise Souq",
    tag: "Live in production",
    blurb:
      "Multi-vendor local marketplace on three-role RBAC (admin / store-owner / customer) with a store-approval workflow, one-order-per-store checkout split, verified-buyer reviews, and search APIs. Live with real orders.",
    stack: ["Laravel 12", "Filament 5", "Alpine.js", "MySQL"],
    year: "2025",
    href: GITHUB,
  },
  {
    index: "03",
    title: "FoloPrint",
    tag: "Live in production",
    blurb:
      "Custom-apparel storefront and the flagship FoloEngine host: variable / bundle products, tiered pricing, COD / CliQ payments, Continue-with-Google, Web Push, bilingual EN/AR. Lighthouse SEO 100, CI/CD to VPS.",
    stack: ["Laravel", "FoloEngine", "Tailwind", "GitHub Actions"],
    year: "2025",
    href: "https://foloprint.folowise.com/",
  },
  {
    index: "04",
    title: "qrfolo",
    tag: "TypeScript SaaS",
    blurb:
      "Dynamic QR + URL-shortener SaaS with geo / device / language targeting and split testing. Sync click counting with an async analytics consumer (NATS → TimescaleDB) and a redirect-rules engine. 230/230 tests green.",
    stack: ["Hono", "Drizzle", "PostgreSQL", "Redis", "NATS"],
    year: "2025",
    href: GITHUB,
  },
  {
    index: "05",
    title: "FoloPrint Design Studio",
    tag: "Render pipeline",
    blurb:
      "Printful-class browser editor that places artwork and text on garments and generates print-ready files plus realistic mockups, with a shared geometry package keeping editor and server output in parity. Server SVG → sharp render pipeline with a concurrency limiter.",
    stack: ["TypeScript", "Next.js", "Prisma", "Fabric.js", "sharp"],
    year: "2025",
    href: GITHUB,
  },
  {
    index: "06",
    title: "Pet E-Commerce",
    tag: "Folowise client",
    blurb:
      "Pet-supply store delivered in two builds — WordPress / WooCommerce and a Laravel rebuild on FoloEngine. The Laravel build was the first production tenant proving the engine: engine-wired catalog, a 16-page owner admin, and license / capability provisioning. AR-first RTL + SEO.",
    stack: ["Laravel", "FoloEngine", "WooCommerce", "Blade"],
    year: "2025",
    href: "https://opti4club.com/",
  },
  {
    index: "07",
    title: "Spring Boot JWT Starter",
    tag: "Open source",
    blurb:
      "Production-leaning auth backend: stateless JWT, role-based access, single-use refresh-token rotation with reuse detection, and per-IP rate limiting. 28 tests + green CI.",
    stack: ["Kotlin", "Spring Boot", "PostgreSQL", "Redis"],
    year: "2026",
    href: "https://github.com/Mnourkh01/Starter-Project",
  },
  {
    index: "08",
    title: "URL Shortener",
    tag: "Open source",
    blurb:
      "Short links with a Redis-cached redirect hot path and click analytics. Postgres is the source of truth; Redis serves cache-aside lookups and an atomic counter. 18 tests + green CI.",
    stack: ["Kotlin", "Spring Boot", "Redis", "Flyway"],
    year: "2026",
    href: "https://github.com/Mnourkh01/url-shortener",
  },
  {
    index: "09",
    title: "Java 21 Auth Starter",
    tag: "Open source",
    blurb:
      "The same hardened auth baseline rebuilt in modern, record-driven Java 21 with no Lombok. Docker, CI, and a full integration suite verified against real Postgres.",
    stack: ["Java 21", "Spring Boot", "Docker", "CI"],
    year: "2026",
    href: "https://github.com/Mnourkh01/spring-boot-java-starter",
  },
  {
    index: "10",
    title: "folowise.com",
    tag: "Live in production",
    blurb:
      "Bilingual EN/AR corporate site for the Folowise consultancy and its Academy: localized routing with RTL, server-rendered pages, optimized media, and full SEO / AEO with JSON-LD.",
    stack: ["Next.js", "React", "TypeScript", "i18n"],
    year: "2025",
    href: "https://folowise.com",
  },
  {
    index: "11",
    title: "BuildNova",
    tag: "Folowise client",
    blurb:
      "Client construction website built and maintained on WordPress + Elementor: responsive pages with targeted custom CSS, plus full structured QA — logging UI issues by severity and re-testing after each fix.",
    stack: ["WordPress", "Elementor", "CSS", "QA"],
    year: "2024",
    href: "https://buildnovaconstruction.ca/",
  },
];
