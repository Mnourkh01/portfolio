"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { LOGO_CODE, LOGO_FRAME, LOGO_LETTERS_FRAME, LOGO_LIVE_EVENT } from "@/lib/logo";

type Mark = { left: SVGPathElement; right: SVGPathElement; letters: SVGPathElement; host: Element | null };

function marks(): Mark[] {
  return Array.from(document.querySelectorAll<SVGSVGElement>("svg[data-logo]")).flatMap((svg) => {
    const left = svg.querySelector<SVGPathElement>("[data-logo-left]");
    const right = svg.querySelector<SVGPathElement>("[data-logo-right]");
    const letters = svg.querySelector<SVGPathElement>("[data-logo-letters]");
    return left && right && letters ? [{ left, right, letters, host: svg.closest("a") }] : [];
  });
}

function toFrame(m: Mark) {
  gsap.set(m.left, { attr: { d: LOGO_FRAME.left } });
  gsap.set(m.right, { attr: { d: LOGO_FRAME.right } });
  gsap.set(m.letters, { x: LOGO_LETTERS_FRAME.x, scale: LOGO_LETTERS_FRAME.scale, svgOrigin: "27 32" });
}

function toCode(m: Mark, delay = 0) {
  const ease = "power3.inOut";
  const duration = 0.8;
  gsap.to(m.left, { attr: { d: LOGO_CODE.left }, duration, ease, delay });
  gsap.to(m.right, { attr: { d: LOGO_CODE.right }, duration, ease, delay });
  gsap.to(m.letters, { x: 0, scale: 1, svgOrigin: "27 32", duration, ease, delay });
}

/** Shows every <MN/> mark as a design frame while the hero is Draft, folds it into code brackets when it goes Live, and again on hover. Mounted before CanvasMotion so its layout effect listens before the intro starts. */
export default function LogoMorph() {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const all = marks();
    if (all.length === 0) return;

    let morphed = false;
    const morph = () => {
      if (morphed) return;
      morphed = true;
      all.forEach((m, i) => toCode(m, i * 0.08));
    };

    let fallback = 0;
    const onLive = (e: Event) => {
      if (!(e instanceof CustomEvent)) return;
      if (e.detail === true) {
        window.clearTimeout(fallback);
        morph();
      } else if (!morphed) {
        all.forEach(toFrame);
        window.clearTimeout(fallback);
        fallback = window.setTimeout(morph, 8000);
      }
    };
    if (document.documentElement.classList.contains("intro-pending")) all.forEach(toFrame);
    window.addEventListener(LOGO_LIVE_EVENT, onLive);

    const replays = all.flatMap((m) => {
      if (!m.host) return [];
      const replay = () => {
        if (!morphed || gsap.isTweening(m.left)) return;
        toFrame(m);
        toCode(m, 0.15);
      };
      m.host.addEventListener("pointerenter", replay);
      m.host.addEventListener("focus", replay);
      return [() => {
        m.host?.removeEventListener("pointerenter", replay);
        m.host?.removeEventListener("focus", replay);
      }];
    });

    return () => {
      window.removeEventListener(LOGO_LIVE_EVENT, onLive);
      window.clearTimeout(fallback);
      replays.forEach((off) => off());
      all.forEach((m) => gsap.killTweensOf([m.left, m.right, m.letters]));
    };
  }, []);

  return null;
}
