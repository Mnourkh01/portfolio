import { gsap } from "gsap";
import { all, one, setKid, setLive } from "@/components/canvas/motion/dom";
import type { Cursor, Point } from "@/components/canvas/motion/board";

type Rect = { x: number; y: number; w: number; h: number };

type IntroOptions = {
  board: boolean;
  cursor: Cursor;
  onDone: () => void;
};

export type IntroHandle = { finish: () => void };

const R = Math.round;
const SKIP_EVENTS = ["wheel", "touchstart", "pointerdown", "keydown", "scroll"] as const;

export function playIntro({ board, cursor, onDone }: IntroOptions): IntroHandle {
  const root = document.documentElement;
  const heroEl = one(".hero");
  const worldEl = one(".world");
  const h1El = one(".hero-h1");
  const selEl = one(".sel");
  const mcurEl = one(".mcur");
  const guidesEl = one(".guides");

  if (!heroEl || !worldEl || !h1El || !selEl || !mcurEl || !guidesEl) {
    root.classList.remove("intro-pending");
    setLive(true);
    onDone();
    return { finish: () => undefined };
  }

  const hero: HTMLElement = heroEl;
  const world: HTMLElement = worldEl;
  const h1: HTMLElement = h1El;
  const sel: HTMLElement = selEl;
  const mcur: HTMLElement = mcurEl;
  const guides: HTMLElement = guidesEl;
  const role = one(".hero-role");
  const line = one(".hero-line");
  const btns = all(".hero-ctas .btn");
  const tag = one(".ctag");
  const grid = one(".hero-grid");
  const pill = one(".sel .pill");
  const badge = one(".fbadge");
  const toast = one(".toast");
  const arrow = one(".mcur svg");
  const created: HTMLElement[] = [];
  const extra: gsap.core.Tween[] = [];
  const pos = cursor.pos;
  const place = cursor.place;
  let finished = false;

  const Z = () => cursor.scale();

  function rel(el: Element): Rect {
    const r = el.getBoundingClientRect();
    const b = hero.getBoundingClientRect();
    const z = Z();
    return { x: (r.left - b.left) / z, y: (r.top - b.top) / z, w: r.width / z, h: r.height / z };
  }

  function worldPoint(el: Element, fx: number, fy: number): Point {
    const r = el.getBoundingClientRect();
    const w = world.getBoundingClientRect();
    const z = Z();
    return { x: (r.left - w.left + r.width * fx) / z, y: (r.top - w.top + r.height * fy) / z };
  }

  function guide(cls: string, x: number, y: number, w: number, h: number, label: string | null): HTMLElement {
    const el = document.createElement("div");
    el.className = `g ${cls}`;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.width = `${Math.max(0, w)}px`;
    el.style.height = `${Math.max(0, h)}px`;
    if (label !== null) {
      const p = document.createElement("span");
      p.className = "pill";
      p.textContent = label;
      el.appendChild(p);
    }
    guides.appendChild(el);
    created.push(el);
    return el;
  }

  function flash(els: HTMLElement[], hold: number): gsap.core.Timeline {
    return gsap
      .timeline()
      .fromTo(els, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.14, stagger: 0.06 })
      .to(els, { autoAlpha: 0, duration: 0.3 }, `+=${hold}`);
  }

  function setPill(text: string) {
    if (pill) pill.textContent = text;
  }

  function showToast() {
    if (!toast) return;
    extra.push(gsap.fromTo(toast, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "back.out(2)" }));
    extra.push(gsap.to(toast, { autoAlpha: 0, y: 10, duration: 0.4, delay: 3.2 }));
  }

  const off: Point = board ? { x: 300, y: 128 } : { x: 32, y: 0 };
  gsap.set(h1, { x: 0, y: 0 });
  const r1 = rel(h1);
  const frame = rel(hero);
  const f0 = worldPoint(hero, 0, 0);

  setLive(false);
  gsap.set(h1, { x: off.x, y: off.y });
  if (grid) gsap.set(grid, { autoAlpha: 1 });
  gsap.set(sel, { left: r1.x + off.x, top: r1.y + off.y, width: r1.w, height: r1.h, autoAlpha: 0, scale: 1 });
  if (arrow) gsap.set(arrow, { transformOrigin: "2px 2px" });

  const snap = [
    guide("g-snap", r1.x, 0, 0, frame.h, null),
    guide("g-h", 0, r1.y + r1.h * 0.25, r1.x, 0, String(R(r1.x))),
    guide("g-v", r1.x + r1.w * 0.5, 0, 0, r1.y, String(R(r1.y))),
  ];

  const grab: Point = { x: f0.x + r1.x + off.x + r1.w * 0.6, y: f0.y + r1.y + off.y + r1.h * 0.42 };
  const start: Point = board
    ? { x: f0.x + frame.w + 140, y: f0.y + frame.h * 0.9 }
    : { x: f0.x + frame.w * 0.7, y: f0.y + r1.y + r1.h + 72 };
  pos.x = start.x;
  pos.y = start.y;
  place();

  const T = gsap.timeline({ delay: 0.2, onComplete: () => finish(true) });
  const drag = { p: 0 };
  const dragTo = (dur: number) => ({
    p: 1,
    duration: dur,
    ease: "power3.inOut",
    onUpdate: () => {
      const dx = off.x * (1 - drag.p);
      const dy = off.y * (1 - drag.p);
      gsap.set(h1, { x: dx, y: dy });
      gsap.set(sel, { left: r1.x + dx, top: r1.y + dy });
      pos.x = grab.x - off.x * drag.p;
      pos.y = grab.y - off.y * drag.p;
      place();
      setPill(`X ${R(r1.x + dx)}   Y ${R(r1.y + dy)}`);
    },
  });

  const toBadge = () =>
    badge ? { x: () => worldPoint(badge, 0.35, 0.65).x, y: () => worldPoint(badge, 0.35, 0.65).y } : { x: pos.x, y: pos.y };

  if (board && role && line && btns.length >= 2) {
    const rR = rel(role);
    const rL = rel(line);
    const b0 = rel(btns[0]);
    const b1 = rel(btns[1]);
    const rC: Rect = { x: b0.x, y: b0.y, w: Math.max(b0.x + b0.w, b1.x + b1.w) - b0.x, h: Math.max(b0.h, b1.h) };
    const wide = Math.max(r1.w, rR.w, rL.w);
    const gap1 = guide("g-gap", r1.x, r1.y + r1.h, wide, rR.y - (r1.y + r1.h), String(R(rR.y - (r1.y + r1.h))));
    const gap2 = guide("g-gap", r1.x, rR.y + rR.h, wide, rL.y - (rR.y + rR.h), String(R(rL.y - (rR.y + rR.h))));
    const gap3 = guide("g-gap", r1.x, rL.y + rL.h, wide, rC.y - (rL.y + rL.h), String(R(rC.y - (rL.y + rL.h))));

    gsap.set([role, line], { autoAlpha: 0, y: 14 });
    gsap.set(btns, { autoAlpha: 0, scale: 0.6, transformOrigin: "50% 50%" });
    if (tag) gsap.set(tag, { autoAlpha: 0, y: 6 });

    const t0 = 0.95;
    const t1 = t0 + 1.1;
    const t2 = t1 + 0.3;
    const t3 = t2 + 0.55;
    const t4 = t3 + 0.6;
    const t5 = t4 + 1.05;
    const t6 = t5 + 0.75;

    T.to(mcur, { autoAlpha: 1, duration: 0.25 }, 0)
      .to(pos, { x: grab.x, y: grab.y, duration: t0, ease: "power3.inOut", onUpdate: place }, 0)
      .add(() => {
        setKid("h1");
        setPill(`X ${R(r1.x + off.x)}   Y ${R(r1.y + off.y)}`);
      }, t0)
      .to(sel, { autoAlpha: 1, duration: 0.1 }, t0)
      .to(arrow, { scale: 0.82, duration: 0.12 }, t0)
      .to(drag, dragTo(1), t0 + 0.1)
      .add(() => setPill(`${R(r1.w)} × ${R(r1.h)}`), t1)
      .add(flash(snap, 0.75), t1)
      .fromTo(sel, { scale: 1.025 }, { scale: 1, duration: 0.35, ease: "back.out(3)" }, t1)
      .to(arrow, { scale: 1, duration: 0.15 }, t1)
      .add(() => setKid("role"), t2)
      .to([role, line], { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.14, ease: "power2.out" }, t2)
      .add(flash([gap1, gap2], 0.6), t2 + 0.1)
      .add(() => setKid("line"), t2 + 0.25)
      .to(pos, { x: f0.x + b0.x + b0.w * 0.55, y: f0.y + b0.y + b0.h * 0.6, duration: 0.6, ease: "power2.inOut", onUpdate: place }, t3)
      .to(sel, { left: rC.x, top: rC.y, width: rC.w, height: rC.h, duration: 0.45, ease: "power3.inOut" }, t3 + 0.1)
      .add(() => {
        setKid("btn");
        setPill(`${R(rC.w)} × ${R(rC.h)}`);
      }, t4)
      .add(flash([gap3], 0.6), t4)
      .to(btns, { autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.12, ease: "back.out(2.4)" }, t4)
      .add(() => setKid("btn2"), t4 + 0.3)
      .to(tag, { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" }, t4 + 0.1)
      .to(arrow, { scale: 0.82, duration: 0.1, yoyo: true, repeat: 1 }, t4 + 0.15)
      .add(() => mcur.classList.add("is-flip"), t5)
      .to(pos, { ...toBadge(), duration: 0.65, ease: "power2.inOut", onUpdate: place }, t5)
      .to(arrow, { scale: 0.82, duration: 0.1, yoyo: true, repeat: 1 }, t6 - 0.1)
      .add(() => {
        setLive(true);
        setKid(null);
        showToast();
      }, t6)
      .fromTo(badge, { scale: 1 }, { scale: 1.14, duration: 0.14, yoyo: true, repeat: 1, transformOrigin: "100% 100%" }, t6)
      .to([sel, tag, grid], { autoAlpha: 0, duration: 0.4 }, t6 + 0.1)
      .add(() => mcur.classList.remove("is-flip"), t6 + 0.4)
      .to({}, { duration: 0.3 }, t6 + 0.4);
  } else {
    const t0 = 0.5;
    const t1 = t0 + 0.55;
    const t2 = t1 + 0.25;
    const t3 = t2 + 0.5;

    T.to(mcur, { autoAlpha: 1, duration: 0.2 }, 0)
      .to(pos, { x: grab.x, y: grab.y, duration: t0, ease: "power3.inOut", onUpdate: place }, 0)
      .add(() => setPill(`X ${R(r1.x + off.x)}   Y ${R(r1.y + off.y)}`), t0)
      .to(sel, { autoAlpha: 1, duration: 0.1 }, t0)
      .to(arrow, { scale: 0.82, duration: 0.1 }, t0)
      .to(drag, dragTo(0.5), t0 + 0.05)
      .add(() => setPill(`${R(r1.w)} × ${R(r1.h)}`), t1)
      .add(flash(snap.slice(0, 2), 0.3), t1)
      .fromTo(sel, { scale: 1.05 }, { scale: 1, duration: 0.3, ease: "back.out(3)" }, t1)
      .to(arrow, { scale: 1, duration: 0.12 }, t1)
      .add(() => mcur.classList.add("is-flip"), t2)
      .to(pos, { ...toBadge(), duration: 0.45, ease: "power2.inOut", onUpdate: place }, t2)
      .to(arrow, { scale: 0.82, duration: 0.08, yoyo: true, repeat: 1 }, t3 - 0.05)
      .add(() => {
        setLive(true);
        showToast();
      }, t3)
      .fromTo(badge, { scale: 1 }, { scale: 1.14, duration: 0.12, yoyo: true, repeat: 1, transformOrigin: "100% 0%" }, t3)
      .to([sel, grid], { autoAlpha: 0, duration: 0.3 }, t3 + 0.1)
      .to(mcur, { autoAlpha: 0, duration: 0.3 }, t3 + 0.15);
  }

  root.classList.remove("intro-pending");

  const y0 = window.scrollY;
  const skip = (e: Event) => {
    if (e.type === "scroll" && Math.abs(window.scrollY - y0) < 4) return;
    finish(false);
  };
  SKIP_EVENTS.forEach((type) => window.addEventListener(type, skip, { passive: true, capture: true }));

  function finish(natural: boolean) {
    if (finished) return;
    finished = true;
    SKIP_EVENTS.forEach((type) => window.removeEventListener(type, skip, { capture: true }));
    T.kill();
    if (!natural) {
      extra.forEach((t) => t.kill());
      if (toast) gsap.set(toast, { autoAlpha: 0 });
    }
    gsap.set([h1, role, line, ...btns, badge, arrow].filter((el): el is HTMLElement => el !== null), {
      clearProps: "transform,opacity,visibility",
    });
    gsap.set([sel, tag, grid].filter((el): el is HTMLElement => el !== null), { autoAlpha: 0 });
    created.forEach((el) => el.remove());
    mcur.classList.remove("is-flip");
    if (!board) gsap.to(mcur, { autoAlpha: 0, duration: 0.2, onComplete: () => mcur.style.removeProperty("transform") });
    else gsap.set(mcur, { autoAlpha: 1 });
    setLive(true);
    setKid(null);
    root.classList.remove("intro-pending");
    onDone();
  }

  return { finish: () => finish(false) };
}
