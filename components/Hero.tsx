"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Github, FileDown } from "lucide-react";
import Screws from "@/components/Screws";
import VUMeter from "@/components/VUMeter";

gsap.registerPlugin(useGSAP);

const stats = [
  { num: "230", label: "tests green (qrfolo)" },
  { num: "100", label: "Lighthouse SEO" },
  { num: "19+", label: "gated engine features" },
  { num: "5", label: "live in production" },
];

/* Lamp-surge flicker, shared by boot and re-ignition */
const FLICKER = [
  { opacity: 0.25, duration: 0.05 },
  { opacity: 1, duration: 0.06 },
  { opacity: 0.4, duration: 0.05 },
  { opacity: 1, duration: 0.09 },
  { opacity: 0.55, duration: 0.06 },
  { opacity: 1, duration: 0.12 },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const shade = useRef<HTMLDivElement>(null);
  const [powered, setPowered] = useState(true);
  const [surging, setSurging] = useState(false);

  const { contextSafe } = useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!reduce) {
        // Cold start: the room is dark, only the meter glows (the cluster sits
        // above the shade). The needle sweeps, the light flickers and catches
        // like an engine, then the panel wakes. Any input skips to the end.
        document.body.classList.add("is-booting");
        const tl = gsap.timeline({
          defaults: { ease: "expo.out" },
          onComplete: () => document.body.classList.remove("is-booting"),
        });
        tl.set(shade.current, { autoAlpha: 0.94 })
          .to(
            shade.current,
            {
              keyframes: [
                { autoAlpha: 0.94, duration: 0.7, ease: "none" },
                { autoAlpha: 0.45, duration: 0.12, ease: "none" },
                { autoAlpha: 0.8, duration: 0.1, ease: "none" },
                { autoAlpha: 0.12, duration: 0.14, ease: "none" },
                { autoAlpha: 0.32, duration: 0.08, ease: "none" },
                { autoAlpha: 0, duration: 0.3, ease: "none" },
              ],
            },
            0
          )
          .from(
            ".hero__line > span",
            { yPercent: 120, duration: 1.1, stagger: 0.12 },
            0.95
          )
          .from(".hero__badge", { autoAlpha: 0, y: 14, duration: 0.7 }, "-=0.8")
          // transform-only: hero__meta is the LCP element, never hide it
          .from(".hero__meta", { y: 18, duration: 0.7 }, "-=0.55")
          .from(".hero__cta", { autoAlpha: 0, y: 16, duration: 0.7 }, "-=0.5")
          .from(
            ".hero__stats .stat",
            { autoAlpha: 0, y: 18, duration: 0.6, stagger: 0.08 },
            "-=0.5"
          )
          .from(".led", { opacity: 0.15, duration: 0.4, stagger: 0.15 }, 1.2)
          .to(".hero__title em", { keyframes: FLICKER }, 1.25)
          .to(".stat__num", { keyframes: FLICKER, stagger: 0.06 }, 1.5);

        const skip = () => tl.progress(1);
        window.addEventListener("pointerdown", skip, { once: true });
        window.addEventListener("keydown", skip, { once: true });
        window.addEventListener("wheel", skip, { once: true, passive: true });
      }

      // The cluster faces the cursor; the glass reflection follows it.
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 980px) and (prefers-reduced-motion: no-preference) and (hover: hover)",
        () => {
          const cluster =
            root.current!.querySelector<HTMLElement>(".cluster")!;
          gsap.set(cluster, { transformPerspective: 900 });
          const rx = gsap.quickTo(cluster, "rotationX", {
            duration: 0.7,
            ease: "power3",
          });
          const ry = gsap.quickTo(cluster, "rotationY", {
            duration: 0.7,
            ease: "power3",
          });
          const move = (e: PointerEvent) => {
            const r = cluster.getBoundingClientRect();
            const nx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
            const ny =
              (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
            ry(gsap.utils.clamp(-7, 7, nx * 14));
            rx(gsap.utils.clamp(-7, 7, -ny * 14));
            cluster.style.setProperty("--px", `${50 + nx * 60}%`);
            cluster.style.setProperty("--py", `${35 + ny * 60}%`);
          };
          window.addEventListener("pointermove", move);
          return () => window.removeEventListener("pointermove", move);
        }
      );

      return () => document.body.classList.remove("is-booting");
    },
    { scope: root }
  );

  const togglePower = contextSafe(() => {
    const next = !powered;
    setPowered(next);
    // VUMeter listens and drives the needle accordingly.
    window.dispatchEvent(new CustomEvent("machine:power", { detail: next }));
    if (
      next &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      // Ignition surge: every metal panel blooms amber (CSS powerOn), the
      // switch kicks, the backlight and readouts flicker alive. Surge lives
      // in React state: a manual classList.add would be wiped by the
      // re-render that setPowered triggers.
      setSurging(true);
      gsap.delayedCall(1.4, () => setSurging(false));
      gsap.fromTo(
        ".toggle",
        { scale: 0.9 },
        { scale: 1, duration: 0.5, ease: "back.out(3)" }
      );
      gsap
        .timeline()
        .to(".hero__title em", { keyframes: FLICKER }, 0.1)
        .to(".stat__num", { keyframes: FLICKER, stagger: 0.05 }, 0.2);
    }
  });

  return (
    <section
      className={`hero${powered ? "" : " is-standby"}${surging ? " is-surge" : ""}`}
      id="top"
      ref={root}
    >
      <div className="shell hero__inner">
        <div className="boot-shade" ref={shade} aria-hidden="true" />
        <div className="hero__copy">
          <div className="badge hero__badge">
            <span className="led led--green led--pulse" aria-hidden="true" />
            status: open to backend / full-stack roles
          </div>

          <h1 className="hero__title">
            <span className="hero__line">
              <span>Reliable systems,</span>
            </span>
            <span className="hero__line">
              <span>
                built with <em>craft</em>.
              </span>
            </span>
          </h1>

          <p className="hero__meta">
            I&rsquo;m Mohammad&nbsp;Nour, a backend engineer in Amman. I build
            secure, multi-tenant backend systems in Java, Kotlin, PHP, and
            TypeScript, and own them end to end, from API contracts to CI/CD
            and production.
          </p>

          <div className="hero__cta">
            <a className="btn btn--primary" href="#work">
              View work
              <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
            </a>
            <a
              className="btn btn--alu"
              href="https://github.com/Mnourkh01"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={17} strokeWidth={1.8} aria-hidden="true" />
              GitHub
            </a>
            <a
              className="btn btn--alu"
              href="/Mohammad-Nour-CV.pdf"
              target="_blank"
              rel="noreferrer"
              download
            >
              <FileDown size={17} strokeWidth={1.8} aria-hidden="true" />
              Resume
            </a>
          </div>
        </div>

        <div className="card cluster">
          <Screws />
          <VUMeter />
          <div className="cluster__row">
            <span className="cluster__pwr">
              <button
                type="button"
                className="toggle"
                role="switch"
                aria-checked={powered}
                aria-label="Power"
                onClick={togglePower}
              />
              pwr
            </span>
            <span
              className={`led ${powered ? "led--green" : "led--off"}`}
              aria-hidden="true"
            />
          </div>
          <div className="cluster__serial">Mod. MN-01 &middot; Amman, JO</div>
        </div>

        <div className="hero__stats">
          {stats.map((s) => (
            <div className="card stat" key={s.label}>
              <div className="stat__win">
                <div className="stat__num">{s.num}</div>
              </div>
              <div className="stat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
