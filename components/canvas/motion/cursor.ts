import { gsap } from "gsap";
import { one } from "@/components/canvas/motion/dom";

// The arrow's tip is drawn 2px in from the top-left of its 20x22 box.
const TIP = 2;
const HIDE_NATIVE = "has-ycur";
// People who chose a high-contrast or forced-colour setup keep their own system pointer.
const KEEP_NATIVE = "(forced-colors: active), (prefers-contrast: more)";

export function setupVisitorCursor(): () => void {
  const el = one(".ycur");
  if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return () => undefined;
  const keepNative = window.matchMedia(KEEP_NATIVE);
  if (keepNative.matches) return () => undefined;

  const root = document.documentElement;
  const arrow = el.querySelector("svg");
  const setX = gsap.quickSetter(el, "x", "px");
  const setY = gsap.quickSetter(el, "y", "px");
  let shown = false;

  const hide = () => {
    if (arrow) gsap.to(arrow, { scale: 1, duration: 0.14 });
    if (!shown) return;
    shown = false;
    root.classList.remove(HIDE_NATIVE);
    gsap.to(el, { autoAlpha: 0, duration: 0.15 });
  };

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || keepNative.matches) {
      hide();
      return;
    }
    setX(e.clientX - TIP);
    setY(e.clientY - TIP);
    if (!shown) {
      shown = true;
      root.classList.add(HIDE_NATIVE);
      gsap.to(el, { autoAlpha: 1, duration: 0.15 });
    }
  };

  const onDown = (e: PointerEvent) => {
    if (e.pointerType === "mouse" && arrow) gsap.to(arrow, { scale: 0.86, transformOrigin: "2px 2px", duration: 0.08 });
  };

  const onUp = () => {
    if (arrow) gsap.to(arrow, { scale: 1, duration: 0.14 });
  };

  const onOut = (e: MouseEvent) => {
    if (!e.relatedTarget) hide();
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerdown", onDown, { passive: true });
  window.addEventListener("pointerup", onUp, { passive: true });
  window.addEventListener("pointercancel", onUp, { passive: true });
  document.addEventListener("mouseout", onOut);
  root.addEventListener("mouseleave", hide);
  window.addEventListener("blur", hide);

  return () => {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerdown", onDown);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("pointercancel", onUp);
    document.removeEventListener("mouseout", onOut);
    root.removeEventListener("mouseleave", hide);
    window.removeEventListener("blur", hide);
    gsap.killTweensOf(arrow ? [el, arrow] : el);
    root.classList.remove(HIDE_NATIVE);
    gsap.set(el, { clearProps: "all" });
    if (arrow) gsap.set(arrow, { clearProps: "all" });
  };
}
