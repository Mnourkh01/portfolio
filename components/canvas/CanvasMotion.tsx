"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { setupBoard, type BoardHandle, type Cursor, type Point } from "@/components/canvas/motion/board";
import { playIntro, type IntroHandle } from "@/components/canvas/motion/intro";
import { setupProcess } from "@/components/canvas/motion/process";
import { setupVisitorCursor } from "@/components/canvas/motion/cursor";
import { one, settleHero } from "@/components/canvas/motion/dom";

gsap.registerPlugin(ScrollTrigger, useGSAP);

let introPlayed = false;

function fontsReady(): Promise<void> {
  const ready = document.fonts ? document.fonts.ready.then(() => undefined) : Promise.resolve();
  return Promise.race([ready, new Promise<void>((resolve) => window.setTimeout(resolve, 1200))]);
}

function compactCursor(): Cursor {
  const pos: Point = { x: 0, y: 0 };
  const el = one(".mcur");
  return {
    pos,
    place: () => {
      if (el) el.style.transform = `translate(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px)`;
    },
    scale: () => 1,
  };
}

export default function CanvasMotion() {
  useGSAP(() => {
    window.__canvasReady = true;
    const root = document.documentElement;

    const onVisibility = () => {
      if (document.hidden) gsap.globalTimeline.pause();
      else gsap.globalTimeline.resume();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const safety = window.setTimeout(() => {
      if (!introPlayed && root.classList.contains("intro-pending")) settleHero();
    }, 4000);

    const mm = gsap.matchMedia();
    mm.add(
      {
        desk: "(min-width: 1200px)",
        compact: "(max-width: 1199.98px)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (ctx) => {
        const desk = Boolean(ctx.conditions?.desk);
        const reduce = Boolean(ctx.conditions?.reduce);

        if (reduce) {
          root.classList.remove("motion", "is-board");
          settleHero();
          return;
        }

        root.classList.add("motion");
        root.classList.toggle("is-board", desk);
        const cleanups: Array<() => void> = [];
        let board: BoardHandle | null = null;
        let intro: IntroHandle | null = null;
        let cancelled = false;

        if (desk) {
          board = setupBoard();
          if (board) cleanups.push(board.cleanup);
          else root.classList.remove("is-board");
        }
        cleanups.push(setupProcess(desk));
        cleanups.push(setupVisitorCursor());

        const wantsIntro =
          !introPlayed && root.classList.contains("intro-pending") && window.scrollY < window.innerHeight * 0.5;

        if (!wantsIntro) {
          settleHero();
          board?.introDone();
        } else {
          introPlayed = true;
          fontsReady().then(() => {
            if (cancelled) return;
            ScrollTrigger.refresh();
            intro = playIntro({
              board: Boolean(board),
              cursor: board ? board.cursor : compactCursor(),
              onDone: () => board?.introDone(),
            });
          });
        }

        if (!wantsIntro) {
          fontsReady().then(() => {
            if (!cancelled) ScrollTrigger.refresh();
          });
        }

        return () => {
          cancelled = true;
          intro?.finish();
          cleanups.forEach((fn) => fn());
          root.classList.remove("is-board");
          settleHero();
        };
      },
    );

    return () => {
      window.clearTimeout(safety);
      document.removeEventListener("visibilitychange", onVisibility);
      mm.revert();
    };
  });

  return null;
}
