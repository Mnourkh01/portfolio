import { gsap } from "gsap";
import { one } from "@/components/canvas/motion/dom";

export function setupVisitorCursor(): () => void {
  const el = one(".ycur");
  if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return () => undefined;

  const qx = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
  const qy = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });
  let shown = false;

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    if (!shown) {
      gsap.set(el, { x: e.clientX + 16, y: e.clientY + 16 });
      gsap.to(el, { autoAlpha: 1, duration: 0.2 });
      shown = true;
    }
    qx(e.clientX + 16);
    qy(e.clientY + 16);
  };

  const onOut = (e: MouseEvent) => {
    if (e.relatedTarget) return;
    gsap.to(el, { autoAlpha: 0, duration: 0.2 });
    shown = false;
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("mouseout", onOut);

  return () => {
    window.removeEventListener("pointermove", onMove);
    document.removeEventListener("mouseout", onOut);
    gsap.set(el, { clearProps: "all" });
  };
}
