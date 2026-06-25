import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

const EMAIL = "m.nourkh01@gmail.com";
const GITHUB = "https://github.com/Mnourkh01";
const LINKEDIN =
  "https://www.linkedin.com/in/mohammad-nour-alkhusheiny-467bbb3b6/";

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <span className="orb" aria-hidden="true" />

      <div className="shell contact__inner">
        <div className="section-label">
          <span className="num">04</span> Contact
          <span className="rule" />
        </div>

        <h2 className="contact__big reveal">
          Let&rsquo;s build something that{" "}
          <span className="grad-text">stays calm under load</span>.
        </h2>

        <div className="contact__cta reveal">
          <a className="btn btn--primary" href={`mailto:${EMAIL}`}>
            Say hello
            <ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
          </a>
          <a
            className="btn btn--ghost"
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
          >
            <Github size={17} strokeWidth={1.8} aria-hidden="true" />
            GitHub
          </a>
        </div>

        <div className="contact__row">
          <div className="contact__links">
            <a
              className="contact__link"
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
            >
              <Github size={16} strokeWidth={1.6} aria-hidden="true" />
              github.com/Mnourkh01
            </a>
            <a
              className="contact__link"
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={16} strokeWidth={1.6} aria-hidden="true" />
              LinkedIn
            </a>
            <a className="contact__link" href={`mailto:${EMAIL}`}>
              <Mail size={16} strokeWidth={1.6} aria-hidden="true" />
              {EMAIL}
            </a>
          </div>
          <span className="contact__copyright">
            &copy; 2026 Mohammad Nour &middot; Amman, Jordan
          </span>
        </div>
      </div>
    </section>
  );
}
