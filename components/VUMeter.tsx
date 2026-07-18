"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Analog VU meter. The needle rests near -18deg and kicks toward +40deg with
 * scroll velocity, then settles back. Reduced motion: CSS pins it at -18deg
 * and this component renders the static dial only.
 */

const MIN_DEG = -46;
const IDLE_DEG = -18;
const MAX_DEG = 40;

type Tick = { x1: number; y1: number; x2: number; y2: number; major: boolean };

const PIVOT_X = 100;
const PIVOT_Y = 100;

/* Round every coordinate: full-precision floats serialize differently between
   the Node SSR pass and the browser and trigger a hydration mismatch. */
const r2 = (v: number) => Math.round(v * 100) / 100;

const ticks: Tick[] = [];
for (let i = 0; i <= 12; i++) {
  const deg = MIN_DEG + ((MAX_DEG + 6 - MIN_DEG) * i) / 12;
  const rad = (deg * Math.PI) / 180;
  const major = i % 3 === 0;
  const rOuter = 84;
  const rInner = major ? 73 : 78;
  ticks.push({
    x1: r2(PIVOT_X + rInner * Math.sin(rad)),
    y1: r2(PIVOT_Y - rInner * Math.cos(rad)),
    x2: r2(PIVOT_X + rOuter * Math.sin(rad)),
    y2: r2(PIVOT_Y - rOuter * Math.cos(rad)),
    major,
  });
}

const label = (deg: number, r: number) => {
  const rad = (deg * Math.PI) / 180;
  return {
    x: r2(PIVOT_X + r * Math.sin(rad)),
    y: r2(PIVOT_Y - r * Math.cos(rad)),
  };
};

const l0 = label(MIN_DEG, 64);
const l50 = label((MIN_DEG + MAX_DEG + 6) / 2, 64);
const l100 = label(MAX_DEG + 6, 64);

export default function VUMeter() {
  const root = useRef<HTMLDivElement>(null);
  const needle = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const el = needle.current!;
      let last = window.scrollY;
      let load = 0;
      let cur = IDLE_DEG;
      let running = false;

      const tick = (time: number) => {
        const y = window.scrollY;
        const dv = Math.abs(y - last);
        last = y;
        // decay toward idle, kick with scroll speed, clamp
        load = Math.max(load * 0.93, Math.min(dv * 1.6, 100));
        const wobble = Math.sin(time * 1.6) * 1.2;
        const target = IDLE_DEG + (load / 100) * (MAX_DEG - IDLE_DEG) + wobble;
        cur += (target - cur) * 0.12;
        gsap.set(el, { rotation: cur });
      };
      const startTicker = () => {
        if (!running) {
          running = true;
          cur = IDLE_DEG;
          gsap.ticker.add(tick);
        }
      };
      const stopTicker = () => {
        if (running) {
          running = false;
          gsap.ticker.remove(tick);
        }
      };
      const sweepOn = (delay = 0) =>
        gsap.fromTo(
          el,
          { rotation: MIN_DEG },
          {
            rotation: IDLE_DEG,
            duration: 1.6,
            delay,
            ease: "elastic.out(1, 0.45)",
            onComplete: startTicker,
          }
        );

      // Boot: power-on sweep, then hand the needle to the velocity ticker.
      sweepOn(0.5);

      // The PWR switch (Hero) drives the needle through this event.
      const onPower = (e: Event) => {
        const on = (e as CustomEvent<boolean>).detail;
        if (on) {
          sweepOn(0.1);
        } else {
          stopTicker();
          gsap.killTweensOf(el);
          gsap.to(el, { rotation: MIN_DEG, duration: 0.9, ease: "power3.inOut" });
        }
      };
      window.addEventListener("machine:power", onPower);

      return () => {
        window.removeEventListener("machine:power", onPower);
        stopTicker();
      };
    },
    { scope: root }
  );

  return (
    <div
      className="vu"
      ref={root}
      role="img"
      aria-label="Analog VU meter labeled system load. Decorative, the needle reacts to scroll speed."
    >
      <div className="vu__face">
        <svg className="vu__dial" viewBox="0 0 200 112" aria-hidden="true">
          {ticks.map((t, i) => (
            <line
              key={i}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke={t.major ? "#d9d2c0" : "#6f695a"}
              strokeWidth={t.major ? 2 : 1}
            />
          ))}
          {/* overload zone */}
          <path
            d="M 100 100 m 55.9 -57.8 a 80 80 0 0 1 3.8 5.2"
            fill="none"
            stroke="#ff4d4d"
            strokeWidth="4"
            strokeLinecap="round"
            transform="translate(1.5 -4)"
          />
          <text x={l0.x} y={l0.y} textAnchor="middle" fontSize="9" fill="#b5ae9c">
            0
          </text>
          <text x={l50.x} y={l50.y} textAnchor="middle" fontSize="9" fill="#b5ae9c">
            50
          </text>
          <text
            x={l100.x}
            y={l100.y}
            textAnchor="middle"
            fontSize="9"
            fill="#ffb454"
          >
            100
          </text>
        </svg>
        <div className="vu__needle" ref={needle} />
        <div className="vu__pivot" aria-hidden="true" />
        <div className="vu__glass" aria-hidden="true" />
      </div>
      <div className="vu__plate">
        <span>System load</span>
        <span>VU</span>
      </div>
    </div>
  );
}
