"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ArrowUpRight, MoveRight } from "lucide-react";
import { projects } from "@/lib/projects";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin);

const SCRAMBLE_CHARS = "アカサタナハマ0123456789<>/#";

export default function Work() {
  const section = useRef<HTMLElement>(null);
  const gallery = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pin the gallery and translate the track sideways as the user
      // scrolls down, snapping to each project. This is the only snapper active
      // in this range, so nothing fights it. Mobile/reduced-motion skip this
      // branch entirely and the track stays a normal vertical grid.
      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const trackEl = track.current!;
        const galleryEl = gallery.current!;
        const panels = gsap.utils.toArray<HTMLElement>(trackEl.children);

        // Translate distance uses the stable viewport width, NOT the gallery
        // width: while pinned the gallery is position:fixed and shrink-wraps to
        // the full track, so its offsetWidth balloons and would break the math.
        const amount = () => trackEl.scrollWidth - window.innerWidth;

        // Snap points (one per panel, = its left edge as page progress) are
        // cached on refresh when the pin is released and measurements are clean,
        // then read live during scroll. panel.offsetLeft is relative to the
        // track (unaffected by the pin), so it stays correct.
        let snapPoints: number[] = [];
        const computeSnap = () => {
          const a = amount();
          snapPoints =
            a > 0
              ? panels.map((p) => gsap.utils.clamp(0, 1, p.offsetLeft / a))
              : [0];
        };

        gsap.to(trackEl, {
          x: () => -amount(),
          ease: "none",
          scrollTrigger: {
            trigger: galleryEl,
            start: "top top",
            end: () => "+=" + amount(),
            pin: true,
            scrub: 0.4, // tight follow; scrub:1 lagged a full second behind fast scroll
            invalidateOnRefresh: true, // re-measure on resize
            refreshPriority: 1, // measure this pin BEFORE the scroll-spy triggers
            onRefresh: computeSnap,
            // Freeze the full-screen rain repaint while the gallery is pinned:
            // the cards cover it anyway, and it frees the main thread + GPU for
            // a smooth horizontal scrub.
            onToggle: (self) =>
              window.dispatchEvent(
                new CustomEvent("gallery:pinned", { detail: self.isActive })
              ),
            snap: {
              snapTo: (value) =>
                snapPoints.reduce(
                  (prev, curr) =>
                    Math.abs(curr - value) < Math.abs(prev - value)
                      ? curr
                      : prev,
                  snapPoints[0] ?? value
                ),
              duration: { min: 0.2, max: 0.5 },
              delay: 0.05,
              ease: "power2.inOut",
              directional: true,
            },
          },
        });
      });

      // Decode-on-hover for project titles (Matrix scramble). Skipped for
      // reduced motion and harmless on touch (no hover event fires).
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.utils.toArray<HTMLElement>(".project").forEach((card) => {
          const titleEl = card.querySelector<HTMLElement>(".project__title-text");
          if (!titleEl) return;
          const text = titleEl.textContent || "";
          let busy = false;
          card.addEventListener("mouseenter", () => {
            if (busy) return;
            busy = true;
            gsap.to(titleEl, {
              duration: 0.5,
              ease: "none",
              scrambleText: { text, chars: SCRAMBLE_CHARS, speed: 0.9 },
              onComplete: () => (busy = false),
            });
          });
        });
      }
    },
    { scope: section }
  );

  return (
    <section className="work" id="work" ref={section}>
      <div className="shell">
        <h2 className="section-label reveal">
          <span className="num" aria-hidden="true">
            02
          </span>{" "}
          <span className="scramble">Selected work</span>
          <span className="rule" aria-hidden="true" />
        </h2>
      </div>

      <div className="gallery" ref={gallery}>
        <div className="gallery__track" ref={track}>
          {projects.map((p) => (
            <a
              key={p.index}
              className="card project gallery__panel"
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
                <span className="project__title-text">{p.title}</span>
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

        <div className="gallery__hint" aria-hidden="true">
          scroll
          <MoveRight size={16} strokeWidth={1.8} />
        </div>
      </div>
    </section>
  );
}
