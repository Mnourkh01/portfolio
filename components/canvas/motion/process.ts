import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { all, one } from "@/components/canvas/motion/dom";

export function setupProcess(horizontal: boolean): () => void {
  const wrap = one(".flow-wrap");
  const psel = one(".psel");
  if (!wrap || !psel) return () => undefined;

  const nodes = all(".node", wrap);
  const arrows = all<SVGElement>(horizontal ? ".arrow .ar-h" : ".arrow .ar-v", wrap);
  let last = -1;

  gsap.set(arrows, horizontal ? { scaleX: 0, transformOrigin: "0% 50%" } : { scaleY: 0, transformOrigin: "50% 0%" });

  const select = (i: number) => {
    if (i === last) return;
    last = i;
    const n = nodes[i];
    if (!n) return;
    gsap.to(psel, {
      autoAlpha: 1,
      left: n.offsetLeft - 6,
      top: n.offsetTop - 6,
      width: n.offsetWidth + 12,
      height: n.offsetHeight + 12,
      duration: horizontal ? 0.4 : 0.3,
      ease: "power3.out",
      overwrite: true,
    });
  };

  const st = ScrollTrigger.create({
    trigger: wrap,
    start: "top 75%",
    end: "bottom 45%",
    onUpdate: (self) => {
      const p = self.progress;
      const count = nodes.length;
      select(Math.min(count - 1, Math.floor(p * count)));
      arrows.forEach((a, k) => {
        const local = Math.max(0, Math.min(1, p * count - k - 0.55));
        gsap.set(a, horizontal ? { scaleX: local } : { scaleY: local });
      });
    },
    onLeaveBack: () => {
      last = -1;
      gsap.to(psel, { autoAlpha: 0, duration: 0.2, overwrite: true });
    },
  });

  return () => {
    st.kill();
    gsap.set(arrows, { clearProps: "transform" });
    gsap.set(psel, { clearProps: "all" });
  };
}
