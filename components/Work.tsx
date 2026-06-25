import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";

export default function Work() {
  return (
    <section className="work" id="work">
      <div className="shell">
        <div className="section-label">
          <span className="num">02</span> Selected work
          <span className="rule" />
        </div>

        <div className="projects">
          {projects.map((p) => (
            <a
              key={p.index}
              className="card project reveal"
              href={p.href}
              target="_blank"
              rel="noreferrer"
            >
              <div className="project__top">
                <span className="project__index">{p.index}</span>
                <span className="project__tagline">
                  <span className="project__tag">{p.tag}</span>
                  <span className="project__year">{p.year}</span>
                </span>
              </div>

              <h3 className="project__title">
                {p.title}
                <ArrowUpRight
                  className="arrow"
                  size={24}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </h3>
              <p className="project__blurb">{p.blurb}</p>
              <div className="project__meta">
                {p.stack.map((s) => (
                  <span className="tag" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
