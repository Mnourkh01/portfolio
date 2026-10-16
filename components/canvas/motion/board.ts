import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { markActive, resetActive } from "@/lib/active";
import { all, one, unionBoxes, type Box } from "@/components/canvas/motion/dom";

type Cam = { x: number; y: number; z: number };
export type Point = { x: number; y: number };

type Stop = { key: string; hold: number; move: number; dip: number };

const STOPS: Stop[] = [
  { key: "home", hold: 0.35, move: 0, dip: 0 },
  { key: "work", hold: 0.6, move: 1.1, dip: 0 },
  { key: "karmetta", hold: 0.8, move: 1, dip: 0 },
  { key: "foloengine", hold: 0.8, move: 0.9, dip: 0.22 },
  { key: "warsha", hold: 0.8, move: 0.9, dip: 0.22 },
  { key: "echoflow", hold: 0.8, move: 1.1, dip: 0.5 },
  { key: "foloprint", hold: 0.8, move: 0.9, dip: 0.22 },
  { key: "harness", hold: 0.8, move: 0.9, dip: 0.22 },
  { key: "end", hold: 0.45, move: 1.1, dip: 0 },
];

const SCROLL_PER_UNIT = 0.7;
const FIT_FRAME = { top: 74, bottom: 58, side: 56 };
const FIT_BOARD = { top: 64, bottom: 52, side: 48 };

type Timing = { start: number; end: number };

function timings(): { list: Timing[]; total: number } {
  let t = 0;
  const list = STOPS.map((stop) => {
    t += stop.move;
    const start = t;
    t += stop.hold;
    return { start, end: t };
  });
  return { list, total: t };
}

function easeInOut(p: number): number {
  return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
}

export type Cursor = {
  pos: Point;
  place: () => void;
  scale: () => number;
};

export type BoardHandle = {
  cursor: Cursor;
  introDone: () => void;
  cleanup: () => void;
};

export function setupBoard(): BoardHandle | null {
  const boardEl = one("#board");
  const vpEl = one(".viewport");
  const worldEl = one(".world");
  const mcurEl = one(".mcur");
  if (!boardEl || !vpEl || !worldEl || !mcurEl) return null;
  const board: HTMLElement = boardEl;
  const vp: HTMLElement = vpEl;
  const world: HTMLElement = worldEl;
  const mcur: HTMLElement = mcurEl;
  const zoomEl = one("[data-zoom]");
  const hint = one(".hint");

  const tb = one(".topbar")?.offsetHeight ?? 48;
  const { list: times, total } = timings();
  const views = new Map<string, Cam>();
  const rests = new Map<string, Point>();
  const proxy = { t: 0 };
  const cur: Point = { x: 0, y: 0 };
  let VW = 0;
  let VH = 0;
  let scale = 1;
  let lastZ = 0;
  let activeKey = "home";
  let introFinished = false;
  let cursorTween: gsap.core.Tween | null = null;
  let ignoreFocus = false;

  all<HTMLElement>(".fsel .pill").forEach((p) => {
    if (p.dataset.size) p.textContent = p.dataset.size;
  });

  function boxOf(el: Element): Box {
    const r = el.getBoundingClientRect();
    const w = world.getBoundingClientRect();
    return { x: r.left - w.left, y: r.top - w.top, w: r.width, h: r.height };
  }

  function groupBox(g: HTMLElement): Box {
    const parts = [g, ...all(".sticky, .pcard", g)];
    return unionBoxes(parts.map(boxOf));
  }

  function fit(b: Box, pad: { top: number; bottom: number; side: number }): Cam {
    const s = Math.min((VW - 2 * pad.side) / b.w, (VH - pad.top - pad.bottom) / b.h);
    return { x: b.x + b.w / 2, y: b.y + b.h / 2 - (pad.top - pad.bottom) / 2 / s, z: Math.log(s) };
  }

  function point(el: Element | null, fx: number, fy: number): Point {
    if (!el) return { x: 0, y: 0 };
    const b = boxOf(el);
    return { x: b.x + b.w * fx, y: b.y + b.h * fy };
  }

  function measure() {
    VW = vp.clientWidth;
    VH = vp.clientHeight;
    const saved = world.style.transform;
    world.style.transform = "none";

    const hero = one(".hero");
    const groups = all<HTMLElement>(".grp-proj");
    const title = one(".board-title");
    if (hero) views.set("home", fit(boxOf(hero), FIT_FRAME));
    groups.forEach((g) => views.set(g.id, fit(groupBox(g), FIT_FRAME)));
    const parts: Box[] = groups.map(groupBox);
    if (hero) parts.push(boxOf(hero));
    if (title) parts.push(boxOf(title));
    const overview = fit(unionBoxes(parts), FIT_BOARD);
    views.set("work", overview);
    views.set("end", overview);

    rests.set("home", point(one(".comment"), 0.86, 1.12));
    rests.set("work", point(one("#foloengine .eng-plane"), 0.82, 0.9));
    rests.set("end", point(one("#foloengine .eng-plane"), 0.82, 0.9));
    groups.forEach((g) => rests.set(g.id, point(one(".sticky", g), 0.78, 0.82)));

    world.style.transform = saved;
  }

  function camAt(t: number): { cam: Cam; key: string } {
    for (let i = 0; i < STOPS.length; i++) {
      const span = times[i];
      const here = views.get(STOPS[i].key);
      if (!here) continue;
      if (t <= span.end) {
        if (t >= span.start || i === 0) return { cam: here, key: STOPS[i].key };
        const prev = views.get(STOPS[i - 1].key) ?? here;
        const p = (t - times[i - 1].end) / STOPS[i].move;
        const e = easeInOut(Math.min(1, Math.max(0, p)));
        return {
          cam: {
            x: prev.x + (here.x - prev.x) * e,
            y: prev.y + (here.y - prev.y) * e,
            z: prev.z + (here.z - prev.z) * e - STOPS[i].dip * Math.sin(Math.PI * e),
          },
          key: p < 0.5 ? STOPS[i - 1].key : STOPS[i].key,
        };
      }
    }
    const last = STOPS[STOPS.length - 1].key;
    return { cam: views.get(last) ?? { x: 0, y: 0, z: 0 }, key: last };
  }

  function placeCursor() {
    mcur.style.transform = `translate(${cur.x.toFixed(1)}px, ${cur.y.toFixed(1)}px) scale(${(1 / scale).toFixed(4)})`;
  }

  function moveCursorTo(key: string) {
    const target = rests.get(key);
    if (!target || !introFinished) return;
    cursorTween?.kill();
    cursorTween = gsap.to(cur, {
      x: target.x,
      y: target.y,
      duration: 0.9,
      ease: "power3.inOut",
      onUpdate: placeCursor,
    });
  }

  let trigger: ScrollTrigger | null = null;

  function setKey(key: string) {
    const past = trigger !== null && window.scrollY > trigger.end + 2;
    if (!past) markActive(key === "end" ? "work" : key);
    if (key === activeKey) return;
    activeKey = key;
    if (hint) gsap.to(hint, { autoAlpha: key === "home" ? 1 : 0, duration: 0.3 });
    moveCursorTo(key);
  }

  function render() {
    const { cam, key } = camAt(proxy.t);
    scale = Math.exp(cam.z);
    const tx = VW / 2 - cam.x * scale;
    const ty = VH / 2 - cam.y * scale;
    world.style.transform = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px) scale(${scale.toFixed(5)})`;
    if (Math.abs(scale - lastZ) / scale > 0.01) {
      lastZ = scale;
      world.style.setProperty("--z", scale.toFixed(4));
    }
    let g = 24 * scale;
    while (g < 12) g *= 2;
    vp.style.backgroundSize = `${g.toFixed(2)}px ${g.toFixed(2)}px`;
    vp.style.backgroundPosition = `${tx.toFixed(2)}px ${ty.toFixed(2)}px`;
    const zoom = `${Math.round(scale * 100)}%`;
    const past = trigger !== null && window.scrollY > trigger.end + 2;
    if (zoomEl && !past && zoomEl.textContent !== zoom) zoomEl.textContent = zoom;
    placeCursor();
    setKey(key);
  }

  measure();
  resetActive();
  render();

  const tween = gsap.to(proxy, {
    t: total,
    ease: "none",
    onUpdate: render,
    scrollTrigger: {
      trigger: board,
      start: () => `top ${tb}px`,
      end: () => `+=${Math.round(window.innerHeight * total * SCROLL_PER_UNIT)}`,
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  trigger = tween.scrollTrigger ?? null;

  const onRefresh = () => {
    measure();
    render();
  };
  ScrollTrigger.addEventListener("refresh", onRefresh);

  function scrollToKey(key: string, smooth: boolean): boolean {
    const st = tween.scrollTrigger;
    const index = STOPS.findIndex((s) => s.key === key);
    if (!st || index < 0) return false;
    const span = times[index];
    const mid = index === 0 ? 0 : (span.start + span.end) / 2;
    window.scrollTo({ top: st.start + (mid / total) * (st.end - st.start), behavior: smooth ? "smooth" : "auto" });
    return true;
  }

  const onClick = (e: MouseEvent) => {
    if (!(e.target instanceof Element)) return;
    const a = e.target.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a) return;
    const key = a.getAttribute("href")?.slice(1) ?? "";
    if (!scrollToKey(key, true)) return;
    e.preventDefault();
    const target = document.getElementById(key);
    if (target && key !== "home" && key !== "work") {
      ignoreFocus = true;
      target.focus({ preventScroll: true });
      ignoreFocus = false;
    }
  };
  document.addEventListener("click", onClick);

  const onFocus = (e: FocusEvent) => {
    if (ignoreFocus || !(e.target instanceof Element)) return;
    const g = e.target.closest<HTMLElement>("[data-key]");
    if (g?.dataset.key) scrollToKey(g.dataset.key, false);
  };
  world.addEventListener("focusin", onFocus);

  const eager = window.setTimeout(() => {
    all<HTMLImageElement>("img[loading='lazy']", world).forEach((img) => {
      img.loading = "eager";
    });
  }, 1500);

  const hash = window.location.hash.slice(1);
  const deepLink = hash
    ? requestAnimationFrame(() => {
      if (scrollToKey(hash, false)) return;
      document.getElementById(hash)?.scrollIntoView();
    })
    : 0;

  return {
    cursor: { pos: cur, place: placeCursor, scale: () => scale },
    introDone: () => {
      introFinished = true;
      moveCursorTo(activeKey);
    },
    cleanup: () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      document.removeEventListener("click", onClick);
      world.removeEventListener("focusin", onFocus);
      window.clearTimeout(eager);
      cancelAnimationFrame(deepLink);
      cursorTween?.kill();
      tween.scrollTrigger?.kill(true);
      tween.kill();
      world.style.removeProperty("transform");
      world.style.removeProperty("--z");
      vp.style.removeProperty("background-size");
      vp.style.removeProperty("background-position");
      mcur.style.removeProperty("transform");
      if (zoomEl) zoomEl.textContent = "100%";
      resetActive();
    },
  };
}
