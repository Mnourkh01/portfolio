import { Code2, Server, Wrench } from "lucide-react";

const columns = [
  {
    icon: Code2,
    title: "Languages",
    items: [
      ["Java", "JVM"],
      ["Kotlin", "JVM"],
      ["PHP 8.4", "Laravel"],
      ["TypeScript", "Node"],
      ["SQL", "Postgres"],
    ],
  },
  {
    icon: Server,
    title: "Backend & Arch",
    items: [
      ["Spring Boot / Ktor", "JVM"],
      ["Laravel 12 / Filament", "PHP"],
      ["REST · JWT / Sanctum", "auth"],
      ["HMAC signing · RBAC", "security"],
      ["Multi-tenant engines", "arch"],
    ],
  },
  {
    icon: Wrench,
    title: "Data & Infra",
    items: [
      ["PostgreSQL / MySQL", "data"],
      ["Redis / TimescaleDB", "cache · TS"],
      ["Docker · GitHub Actions", "CI/CD"],
      ["Nginx · Linux VPS", "deploy"],
      ["Stripe · Sentry", "pay · obs"],
    ],
  },
];

export default function Skills() {
  return (
    <section className="skills shell" id="stack">
      <div className="section-label">
        <span className="num">03</span> Stack
        <span className="rule" />
      </div>

      <div className="skills__grid">
        {columns.map((col) => {
          const Icon = col.icon;
          return (
            <div className="card skills__col reveal" key={col.title}>
              <h3>
                <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                {col.title}
              </h3>
              <ul className="skills__list">
                {col.items.map(([name, note]) => (
                  <li key={name}>
                    <span>{name}</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
