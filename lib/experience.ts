export type Role = {
  id: string;
  company: string;
  title: string;
  place: string;
  summary: string;
  period: string;
  current: boolean;
};

export type Education = {
  school: string;
  award: string;
  period: string;
};

export type StackGroup = {
  id: string;
  name: string;
  items: string[];
};

export const roles: Role[] = [
  {
    id: "folowise",
    company: "Folowise",
    title: "Product Engineer",
    place: "Amman, Jordan · Hybrid · Full-time",
    summary:
      "I build and ship Folowise’s commerce products, from the shared engine to the live stores that run on it.",
    period: "Oct 2024 to Present",
    current: true,
  },
  {
    id: "incepticode",
    company: "InceptiCode",
    title: "Software Engineer",
    place: "Canada · Remote · Full-time",
    summary:
      "Backend services and REST APIs in Java and Kotlin (Spring Boot, Ktor) and Node.js; JWT auth, validation, PostgreSQL and MySQL schemas, Agile team with pull requests and code review.",
    period: "Mar 2023 to Oct 2024",
    current: false,
  },
  {
    id: "amdocs",
    company: "Amdocs",
    title: "Quality Assurance Automation Engineer",
    place: "Mississauga, Ontario, Canada · Remote · Contract",
    summary:
      "Mobile test automation with Appium, TestNG and JUnit, API testing, Agile teams in Jira.",
    period: "Apr 2021 to Jan 2023",
    current: false,
  },
  {
    id: "zero-one-tech",
    company: "Zero One Tech",
    title: "Product Engineer",
    place: "Remote · Freelance",
    summary:
      "Turned client ideas into working websites and web products, from layout and UX to launch and support.",
    period: "Oct 2019 to Sep 2021",
    current: false,
  },
];

export const education: Education = {
  school: "Luminus Technical University College",
  award: "Higher National Diploma, Civil Engineering",
  period: "2018 to 2021",
};

export const stack: StackGroup[] = [
  {
    id: "languages",
    name: "Languages",
    items: ["Java", "Kotlin", "PHP", "TypeScript", "Rust", "SQL"],
  },
  {
    id: "backend",
    name: "Backend",
    items: ["Spring Boot", "Ktor", "Laravel", "Node.js"],
  },
  {
    id: "frontend",
    name: "Frontend and design",
    items: ["Next.js", "React", "Tailwind", "UI and UX", "Design systems", "RTL"],
  },
  {
    id: "desktop",
    name: "Desktop",
    items: ["Tauri 2"],
  },
  {
    id: "infra",
    name: "Data and infra",
    items: ["PostgreSQL", "MySQL", "Redis", "Docker", "GitHub Actions", "Cloudflare"],
  },
];
