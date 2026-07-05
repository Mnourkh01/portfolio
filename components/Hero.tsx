"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ArrowRight, Github, FileDown } from "lucide-react";

gsap.registerPlugin(ScrambleTextPlugin);

const SCRAMBLE_CHARS = "アカサタナハマ0123456789<>/#";

const stats = [
  { num: "230", label: "tests green (qrfolo)" },
  { num: "100", label: "Lighthouse SEO" },
  { num: "19+", label: "gated engine features" },
  { num: "5", label: "live in production" },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero__line > span", { yPercent: 120, duration: 1.1, stagger: 0.12 })
        .from(".hero__badge", { autoAlpha: 0, y: 14, duration: 0.7 }, "-=0.8")
        // transform-only: hero__meta is the LCP element, never hide it
        .from(".hero__meta", { y: 18, duration: 0.7 }, "-=0.55")
        .from(".hero__cta", { autoAlpha: 0, y: 16, duration: 0.7 }, "-=0.5")
        .from(
          ".hero__stats .stat",
          { autoAlpha: 0, y: 18, duration: 0.6, stagger: 0.08 },
          "-=0.45"
        )
        // decode ONLY the headline accent word (.grad-text is also used by the
        // stat numbers, so scope the selector to the title).
        .to(
          ".hero__title .grad-text",
          {
            duration: 1,
            ease: "none",
            scrambleText: { text: "craft", chars: SCRAMBLE_CHARS, speed: 0.5 },
          },
          0.85
        );
    },
    { scope: root }
  );

  return (
    <section className="hero" id="top" ref={root}>
      <div className="shell hero__inner">
        <div className="badge hero__badge">
          <span className="badge__prompt" aria-hidden="true">
            ~$
          </span>
          status: open to backend / full-stack roles
          <span className="badge__cursor" aria-hidden="true" />
        </div>

        <h1 className="hero__title">
          <span className="hero__line">
            <span>Reliable systems,</span>
          </span>
          <span className="hero__line">
            <span>
              built with <span className="grad-text">craft</span>.
            </span>
          </span>
        </h1>

        <p className="hero__meta">
          I&rsquo;m Mohammad&nbsp;Nour, a backend engineer in Amman. I build
          secure, multi-tenant backend systems in Java, Kotlin, PHP, and
          TypeScript, and own them end to end, from API contracts to CI/CD and
          production.
        </p>

        <div className="hero__cta">
          <a className="btn btn--primary" href="#work">
            View work
            <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
          </a>
          <a
            className="btn btn--ghost"
            href="https://github.com/Mnourkh01"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={17} strokeWidth={1.8} aria-hidden="true" />
            GitHub
          </a>
          <a
            className="btn btn--ghost"
            href="/Mohammad-Nour-CV.pdf"
            target="_blank"
            rel="noreferrer"
            download
          >
            <FileDown size={17} strokeWidth={1.8} aria-hidden="true" />
            Resume
          </a>
        </div>

        <div className="hero__stats">
          {stats.map((s) => (
            <div className="card stat" key={s.label}>
              <div className="stat__num grad-text">{s.num}</div>
              <div className="stat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
