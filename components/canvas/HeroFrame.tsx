import { BriefcaseBusiness, Component, Frame, Globe, Linkedin, Mail, MapPin } from "lucide-react";
import LogoMark from "@/components/LogoMark";
import { LINKEDIN_URL, MAILTO, PERSON } from "@/lib/site";

const GRID_COLUMNS = Array.from({ length: 12 }, (_, i) => i);

export default function HeroFrame() {
  return (
    <section className="grp grp-hero" id="home" aria-labelledby="hero-name" data-key="home">
      <p className="flabel" aria-hidden="true">
        <Frame />
        <span className="fl-d">Home / Desktop 1440</span>
        <span className="fl-t">Home / Tablet</span>
        <span className="fl-m">Home / Mobile</span>
      </p>
      <p className="fbadge" aria-hidden="true">
        <span className="dot" />
        <span className="fb-live">Live</span>
        <span className="fb-draft">Draft</span>
      </p>
      <div className="frame hero">
        <div className="hero-grid" aria-hidden="true">
          {GRID_COLUMNS.map((i) => (
            <span key={i} />
          ))}
        </div>
        <div className="hero-nav">
          <a className="hn-brand" href="#home" aria-label={`${PERSON.name}, home`}>
            <span className="hn-mark" aria-hidden="true">
              <LogoMark height={18} />
            </span>
            <span className="hn-name" aria-hidden="true">
              {PERSON.name}
            </span>
          </a>
          <nav aria-label="Site">
            <ul>
              <li>
                <a href="#work">Work</a>
              </li>
              <li>
                <a href="#process">Process</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="hero-stack">
          <h1 className="hero-h1" id="hero-name">
            <span>{PERSON.firstName}</span> <span>{PERSON.lastName}</span>
          </h1>
          <p className="hero-role">{PERSON.role}</p>
          <p className="hero-line">{PERSON.line}</p>
          <div className="hero-ctas">
            <span className="ctag" aria-hidden="true">
              <Component />
              Component: Button/Primary
            </span>
            <a className="btn btn-primary btn-lg" href={MAILTO}>
              <Mail aria-hidden="true" />
              Email me
            </a>
            <a className="btn btn-secondary btn-lg" href={LINKEDIN_URL} target="_blank" rel="noopener">
              <Linkedin aria-hidden="true" />
              LinkedIn
            </a>
          </div>
        </div>
        <aside className="comment" aria-label="A note from Mohammad">
          <span className="av av-me" aria-hidden="true">
            {PERSON.initials}
          </span>
          <div>
            <p className="c-who">
              Mohammad<span>left a comment</span>
            </p>
            <p className="c-text">{PERSON.openTo}</p>
          </div>
        </aside>
        <ul className="hero-meta">
          <li>
            <MapPin aria-hidden="true" />
            {PERSON.location}
          </li>
          <li>
            <BriefcaseBusiness aria-hidden="true" />
            {PERSON.role} at {PERSON.company}
          </li>
          <li>
            <Globe aria-hidden="true" />
            {PERSON.languages}
          </li>
        </ul>
        <div className="guides" aria-hidden="true" />
        <div className="sel" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <span className="pill" />
        </div>
      </div>
    </section>
  );
}
