export default function About() {
  return (
    <section className="about shell" id="about">
      <h2 className="section-label">
        <span className="num" aria-hidden="true">01</span> About
        <span className="rule" aria-hidden="true" />
      </h2>

      <div className="about__grid">
        <p className="about__lead reveal">
          I build secure, multi-tenant backend systems and{" "}
          <span className="grad-text">ship them to production</span>.
        </p>

        <div className="about__body reveal">
          <p>
            At <strong>Folowise</strong> I architected and built{" "}
            <strong>FoloEngine</strong>, a licensed multi-tenant commerce engine
            (Laravel&nbsp;12, PHP&nbsp;8.4) shipped as a Composer package +
            control-plane and now powering multiple live storefronts and a
            marketplace.
          </p>
          <p>
            I work across <strong>Java / Kotlin</strong> (Spring Boot, Ktor),{" "}
            <strong>Laravel / PHP</strong>, and <strong>TypeScript / Node</strong>,
            owning architecture end to end: API contracts, data modeling,{" "}
            <strong>HMAC-signed APIs</strong>, RBAC, security hardening, CI/CD,
            and releases.
          </p>
          <p>
            I work in an AI-driven workflow (Claude Code, Codex, Cursor) and
            build AI into products: RAG and tool-using agents. Bilingual
            EN&nbsp;/&nbsp;AR.
          </p>
        </div>
      </div>
    </section>
  );
}
