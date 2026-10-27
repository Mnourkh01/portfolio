export function one<T extends Element = HTMLElement>(selector: string, root: ParentNode = document): T | null {
  return root.querySelector<T>(selector);
}

export function all<T extends Element = HTMLElement>(selector: string, root: ParentNode = document): T[] {
  return Array.from(root.querySelectorAll<T>(selector));
}

export function setKid(name: string | null) {
  all("[data-kid]").forEach((li) => li.classList.toggle("is-on", li.dataset.kid === name));
}

export function setLive(live: boolean) {
  one(".fbadge")?.classList.toggle("is-draft", !live);
}

export function settleHero() {
  setLive(true);
  setKid(null);
  document.documentElement.classList.remove("intro-pending");
}

export type Box = { x: number; y: number; w: number; h: number };

export function unionBoxes(boxes: Box[]): Box {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  boxes.forEach((b) => {
    x0 = Math.min(x0, b.x);
    y0 = Math.min(y0, b.y);
    x1 = Math.max(x1, b.x + b.w);
    y1 = Math.max(y1, b.y + b.h);
  });
  return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
}
