"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

/**
 * Scroll provider. Uses NATIVE scroll on purpose: this project pins a horizontal
 * gallery, and momentum smooth-scroll engines (Lenis, ScrollSmoother) both fought
 * the pin here and broke programmatic scroll. Native scroll + ScrollTrigger is the
 * robust path the GSAP demos themselves use. Anchor clicks are eased via
 * ScrollToPlugin so navigation still feels smooth.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      if (!link || link.hash.length < 2) return;
      const target = document.querySelector(link.hash) as HTMLElement | null;
      if (!target) return;
      e.preventDefault();
      if (reduce) {
        target.scrollIntoView();
        return;
      }
      gsap.to(window, {
        duration: 0.8,
        ease: "power2.inOut",
        scrollTo: { y: target, offsetY: 72 }, // clear the fixed nav
        overwrite: "auto",
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  });

  return <>{children}</>;
}
