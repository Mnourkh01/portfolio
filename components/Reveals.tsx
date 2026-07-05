"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin);

const NAV_IDS = ["about", "work", "stack", "contact"];
const SCRAMBLE_CHARS = "アカサタナハマ0123456789<>/#";

export default function Reveals() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Scroll-driven reveals. Runs only for users who allow motion; reduced-motion
    // users get the static layout from CSS (.reveal is forced visible there).
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      ScrollTrigger.batch(".reveal", {
        start: "top 85%",
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: true,
          }),
      });

      // Section headings decode in (Matrix scramble) when they enter view.
      gsap.utils.toArray<HTMLElement>(".scramble").forEach((el) => {
        const text = el.textContent || "";
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () =>
            gsap.to(el, {
              duration: 0.9,
              ease: "none",
              scrambleText: {
                text,
                chars: SCRAMBLE_CHARS,
                speed: 0.7,
                revealDelay: 0.15,
              },
            }),
        });
      });

      // Failsafe: if a .reveal never crosses the trigger (short pages, odd
      // layout), show it after load so nothing stays invisible.
      const failsafe = window.setTimeout(() => {
        gsap.to(gsap.utils.toArray(".reveal"), { autoAlpha: 1, y: 0, duration: 0.3 });
      }, 2500);
      return () => window.clearTimeout(failsafe);
    });

    // Scroll-spy: light the matching nav link while its section is centered.
    // Independent of motion preference (it is just a class toggle).
    NAV_IDS.forEach((id) => {
      const sec = document.getElementById(id);
      const link = document.querySelector<HTMLAnchorElement>(
        `.nav__link[href="#${id}"]`
      );
      if (!sec || !link) return;
      ScrollTrigger.create({
        trigger: sec,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => link.classList.toggle("is-active", self.isActive),
      });
    });

    // Spy/reveal positions depend on the pinned gallery's height. If fonts (or
    // the canvas) shift layout after these triggers are created, positions go
    // stale (sections appear to start near the top). Refresh once fonts settle.
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
  });

  return null;
}
