export type Shot = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type ProjectLink = {
  href: string;
  label: string;
};

export type StickyNote = {
  text: string;
  by: "me" | "note";
};

export type FlagshipVisual =
  | { type: "shot"; shot: Shot }
  | { type: "diagram" }
  | { type: "duo"; brand: Shot; main: Shot; side: Shot };

export type Flagship = {
  id: string;
  name: string;
  layer: string;
  frame: string;
  size: string;
  kind: string;
  summary: string;
  stack: string[];
  link: ProjectLink | null;
  privateNote: string | null;
  notes: StickyNote[];
  visual: FlagshipVisual;
  col: 1 | 2 | 3;
  row: 0 | 1;
  card: "left" | "right";
};

export type MoreWork = {
  id: string;
  name: string;
  summary: string;
  stack: string[];
  link: ProjectLink | null;
  shot: Shot | null;
};

export const flagships: Flagship[] = [
  {
    id: "karmetta",
    name: "Karmetta",
    layer: "Work / Karmetta",
    frame: "Work / Karmetta · Desktop 1440",
    size: "1440 × 900",
    kind: "Restaurant platform, runs on FoloEngine",
    summary:
      "QR table ordering, a kitchen display split by station and four staff roles, in Arabic and English.",
    stack: ["Laravel", "Alpine.js", "Tailwind"],
    link: { href: "https://karmetta.com", label: "karmetta.com" },
    privateNote: null,
    notes: [
      { text: "328 automated tests", by: "me" },
      { text: "Live at karmetta.com", by: "note" },
    ],
    visual: {
      type: "shot",
      shot: {
        src: "/work/karmetta.webp",
        width: 1440,
        height: 900,
        alt: "Karmetta homepage with the headline Your menu, your tables, your kitchen, a Start free button and a photo of a guest ordering by phone at a restaurant table",
      },
    },
    col: 1,
    row: 0,
    card: "right",
  },
  {
    id: "foloengine",
    name: "FoloEngine",
    layer: "Component / FoloEngine",
    frame: "Component / FoloEngine",
    size: "Main component",
    kind: "Multi-tenant commerce engine",
    summary:
      "Laravel 12 and PHP 8.4, built as reusable Composer packages. FoloEngine powers 5 live storefronts from one shared control plane.",
    stack: ["Laravel 12", "PHP 8.4", "Filament", "Composer"],
    link: null,
    privateNote: "Company work",
    notes: [{ text: "5 live storefronts", by: "me" }],
    visual: { type: "diagram" },
    col: 2,
    row: 0,
    card: "right",
  },
  {
    id: "warsha",
    name: "Warsha",
    layer: "Work / Warsha",
    frame: "Work / Warsha · Windows app",
    size: "1600 × 900",
    kind: "Desktop app, private beta",
    summary:
      "One Windows workspace for terminals and AI coding agents. Claude Code, Codex, Gemini, OpenCode and Cursor run side by side in up to 10 live panes, each pane shows whether it is working, idle or needs you, and every pane comes back after a restart.",
    stack: ["Rust", "Tauri 2", "React", "TypeScript", "xterm.js"],
    link: null,
    privateNote: "Company work, source private",
    notes: [
      { text: "The terminal comes first", by: "me" },
      { text: "Rust core, React UI", by: "note" },
    ],
    visual: {
      type: "shot",
      shot: {
        src: "/work/warsha-home.webp",
        width: 1600,
        height: 900,
        alt: "Warsha home screen: a sidebar of workspaces and terminals, a box to tell an agent what to build with Claude Code selected, and panels for Needs you, Working now and Recent chats",
      },
    },
    col: 3,
    row: 0,
    card: "left",
  },
  {
    id: "echoflow",
    name: "EchoFlow",
    layer: "Work / EchoFlow",
    frame: "Work / EchoFlow · Windows app",
    size: "1440 × 900",
    kind: "Desktop app, open source",
    summary:
      "Offline Arabic and English voice to text for Windows. Local Whisper, push to talk, translate, clean and prompt modes, searchable history and one click auto update.",
    stack: ["Rust", "Tauri 2", "whisper.cpp", "React"],
    link: {
      href: "https://github.com/Mnourkh01/echoflow",
      label: "github.com/Mnourkh01/echoflow",
    },
    privateNote: null,
    notes: [
      { text: "8 public releases", by: "me" },
      { text: "Runs on your PC, no cloud", by: "note" },
    ],
    visual: {
      type: "duo",
      brand: {
        src: "/work/echoflow-logo.png",
        width: 256,
        height: 230,
        alt: "",
      },
      main: {
        src: "/work/echoflow-recording.webp",
        width: 1200,
        height: 680,
        alt: "EchoFlow recording window: a glowing teal sphere, a running timer and a Cancel button",
      },
      side: {
        src: "/work/echoflow-settings.webp",
        width: 1640,
        height: 1120,
        alt: "EchoFlow settings: app language in English or Arabic, output modes and a translate from list",
      },
    },
    col: 1,
    row: 1,
    card: "left",
  },
  {
    id: "foloprint",
    name: "FoloPrint",
    layer: "Work / FoloPrint",
    frame: "Work / FoloPrint · Desktop 1440",
    size: "1440 × 900",
    kind: "Custom printing store, runs on FoloEngine",
    summary:
      "A custom printing store in Amman: variable and bundle products, tiered pricing, Cash on Delivery and CliQ, Continue with Google, bilingual.",
    stack: ["Laravel", "FoloEngine", "Tailwind", "GitHub Actions"],
    link: {
      href: "https://foloprint.folowise.com/",
      label: "foloprint.folowise.com",
    },
    privateNote: null,
    notes: [
      { text: "Checkout with Cash on Delivery and CliQ", by: "me" },
      { text: "Bilingual, Arabic and English", by: "note" },
    ],
    visual: {
      type: "shot",
      shot: {
        src: "/work/foloprint.webp",
        width: 1440,
        height: 900,
        alt: "FoloPrint homepage with the headline Custom printing, delivered in 48 hours, and a card of printed shirts, hoodies and mugs",
      },
    },
    col: 2,
    row: 1,
    card: "right",
  },
  {
    id: "harness",
    name: "Inside the Harness",
    layer: "Work / Inside the Harness",
    frame: "Work / Inside the Harness · Desktop 1440",
    size: "1440 × 900",
    kind: "Free interactive course",
    summary:
      "How AI agents really work, in English and Arabic: 30 levels, hands-on labs and narrated videos.",
    stack: ["JavaScript", "HTML", "Cloudflare Pages"],
    link: {
      href: "https://inside-the-harness.pages.dev",
      label: "inside-the-harness.pages.dev",
    },
    privateNote: null,
    notes: [{ text: "English and Arabic", by: "me" }],
    visual: {
      type: "shot",
      shot: {
        src: "/work/harness.webp",
        width: 1440,
        height: 900,
        alt: "Inside the Harness course page with the headline The model only talks. The harness makes it work, a contents sidebar of parts and levels, and a live demo card",
      },
    },
    col: 3,
    row: 1,
    card: "left",
  },
];

export const moreWork: MoreWork[] = [
  {
    id: "souq",
    name: "Folowise Souq",
    summary:
      "Multi-vendor local marketplace: three roles (admin, store owner, customer), store approval, checkout split one order per store, verified-buyer reviews.",
    stack: ["Laravel 12", "Filament 5", "Alpine.js", "MySQL"],
    link: { href: "https://souq.folowise.com/", label: "souq.folowise.com" },
    shot: {
      src: "/work/souq.webp",
      width: 1440,
      height: 900,
      alt: "Folowise Souq homepage on a dark map background with the headline Every local shop, one place to grow and a search box for stores, products or a place",
    },
  },
  {
    id: "folowise",
    name: "folowise.com",
    summary:
      "Bilingual English and Arabic company site with localized routing and RTL, server-rendered pages and structured data.",
    stack: ["Next.js", "React", "TypeScript"],
    link: { href: "https://folowise.com", label: "folowise.com" },
    shot: {
      src: "/work/folowise.webp",
      width: 1440,
      height: 900,
      alt: "Folowise homepage with the headline Websites, online stores, mobile apps and the software your business runs on, and a bar offering to switch the site to Arabic",
    },
  },
  {
    id: "pet-store",
    name: "Pet e-commerce",
    summary:
      "Pet-supply store built twice: WordPress and WooCommerce, then a Laravel rebuild that became the first production store on FoloEngine. Arabic first, RTL.",
    stack: ["Laravel", "FoloEngine", "WooCommerce"],
    link: { href: "https://opti4club.com/", label: "opti4club.com" },
    shot: {
      src: "/work/opti4club.webp",
      width: 1440,
      height: 900,
      alt: "Opti4Club pet store homepage in Arabic, right to left, with a photo of a dog and a cat beside bowls of food",
    },
  },
  {
    id: "buildnova",
    name: "BuildNova",
    summary:
      "Construction company website built on WordPress and Elementor, with structured QA before launch.",
    stack: ["WordPress", "Elementor"],
    link: {
      href: "https://buildnovaconstruction.ca/",
      label: "buildnovaconstruction.ca",
    },
    shot: {
      src: "/work/buildnova.webp",
      width: 1440,
      height: 900,
      alt: "BuildNova Construction homepage over a photo of a bright staircase, with the headline Building Your Dreams, One Project at a Time and a Get a quote button",
    },
  },
  {
    id: "skill-assessment",
    name: "Adaptive AI Skill Assessment",
    summary:
      "25-question adaptive test for technical roles: AI does the language work, tested TypeScript owns every number, English and Arabic.",
    stack: ["Next.js", "TypeScript"],
    link: {
      href: "https://github.com/Mnourkh01/dynamic-wizard-questions",
      label: "dynamic-wizard-questions",
    },
    shot: null,
  },
  {
    id: "design-studio",
    name: "FoloPrint Design Studio",
    summary:
      "In-browser print design and mockup studio: places artwork and text on garments, produces print-ready files and realistic mockups.",
    stack: ["TypeScript", "Next.js", "Fabric.js", "sharp"],
    link: {
      href: "https://github.com/Mnourkh01/FoloPrint-design-studio",
      label: "FoloPrint-design-studio",
    },
    shot: null,
  },
  {
    id: "qrfolo",
    name: "qrfolo",
    summary:
      "Dynamic QR and URL-shortener product with geo, device and language targeting, split testing and an async analytics pipeline.",
    stack: ["TypeScript", "PostgreSQL", "Redis", "NATS"],
    link: null,
    shot: null,
  },
  {
    id: "spring-starter",
    name: "Spring Boot API Starter",
    summary:
      "Kotlin auth backend: stateless JWT, role-based access, single-use refresh-token rotation with reuse detection, per-IP rate limiting. 28 tests, green CI.",
    stack: ["Kotlin", "Spring Boot", "JWT"],
    link: {
      href: "https://github.com/Mnourkh01/Starter-Project",
      label: "Starter-Project",
    },
    shot: null,
  },
  {
    id: "url-shortener",
    name: "URL Shortener",
    summary:
      "Redis-cached redirect hot path and click analytics, Postgres as the source of truth. 18 tests, green CI.",
    stack: ["Kotlin", "Spring Boot", "Redis", "Flyway"],
    link: {
      href: "https://github.com/Mnourkh01/url-shortener",
      label: "url-shortener",
    },
    shot: null,
  },
  {
    id: "java-starter",
    name: "Java 21 Auth Starter",
    summary:
      "The same auth baseline in record-driven Java 21, Docker and CI.",
    stack: ["Java 21", "Spring Boot", "Docker"],
    link: {
      href: "https://github.com/Mnourkh01/spring-boot-java-starter",
      label: "spring-boot-java-starter",
    },
    shot: null,
  },
];
