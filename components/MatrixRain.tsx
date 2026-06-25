"use client";

import { useEffect, useRef } from "react";

const CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789ABCDEF<>/{}[]$#*+=";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let cols = 0;
    let fontSize = 16;
    let drops: number[] = [];
    let raf = 0;
    let last = 0;

    const setup = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fontSize = Math.max(13, Math.round(w / 95));
      cols = Math.ceil(w / fontSize);
      drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -60));
      ctx.textBaseline = "top";
    };

    const draw = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      // Fade previous frame to build trailing tails.
      ctx.fillStyle = "rgba(2, 4, 2, 0.11)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px ui-monospace, "JetBrains Mono", monospace`;

      for (let i = 0; i < cols; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const ch = CHARS[(Math.random() * CHARS.length) | 0];

        // Previous head settles into a green body char.
        ctx.fillStyle = "rgba(0, 255, 95, 0.9)";
        ctx.fillText(ch, x, y - fontSize);
        // New bright head.
        ctx.fillStyle = "rgba(200, 255, 210, 0.95)";
        ctx.fillText(ch, x, y);

        if (y > h && Math.random() > 0.975) {
          drops[i] = Math.floor(Math.random() * -16);
        }
        drops[i]++;
      }
    };

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (t - last < 55) return; // ~18fps "step" cadence, classic + cheap
      last = t;
      draw();
    };

    setup();

    if (reduce) {
      // One calm static frame, no animation.
      ctx.font = `${fontSize}px ui-monospace, monospace`;
      ctx.fillStyle = "rgba(0, 255, 95, 0.22)";
      for (let i = 0; i < cols; i++) {
        const ch = CHARS[(Math.random() * CHARS.length) | 0];
        ctx.fillText(ch, i * fontSize, (Math.random() * parent.clientHeight) | 0);
      }
      return;
    }

    raf = requestAnimationFrame(loop);
    const onResize = () => setup();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}
