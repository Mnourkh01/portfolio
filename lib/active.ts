let current = "";

export const BOARD_KEYS = [
  "home",
  "work",
  "karmetta",
  "foloengine",
  "warsha",
  "echoflow",
  "foloprint",
  "harness",
];

export function isBoardMode(): boolean {
  return document.documentElement.classList.contains("is-board");
}

function syncPill(frame: HTMLElement) {
  const pill = frame.querySelector<HTMLElement>(".fsel .pill");
  const box = frame.querySelector<HTMLElement>(".fwrap");
  if (!pill || !box) return;
  pill.textContent = `${Math.round(box.offsetWidth)} × ${Math.round(box.offsetHeight)}`;
}

function revealChip(link: HTMLElement) {
  const strip = link.closest<HTMLElement>(".layers");
  if (strip && strip.scrollWidth > strip.clientWidth + 1) {
    const box = strip.getBoundingClientRect();
    const r = link.getBoundingClientRect();
    strip.scrollLeft += r.left - box.left - box.width / 2 + r.width / 2;
  }
  const rail = link.closest<HTMLElement>(".ly-scroll");
  if (rail && rail.scrollHeight > rail.clientHeight + 1) {
    const box = rail.getBoundingClientRect();
    const r = link.getBoundingClientRect();
    if (r.top < box.top) rail.scrollTop -= box.top - r.top + 8;
    else if (r.bottom > box.bottom) rail.scrollTop += r.bottom - box.bottom + 8;
  }
}

export function markActive(key: string) {
  if (key === current) return;
  current = key;

  document.querySelectorAll<HTMLElement>("[data-layer]").forEach((link) => {
    if (link.dataset.layer === key) {
      link.setAttribute("aria-current", "true");
      revealChip(link);
    } else {
      link.removeAttribute("aria-current");
    }
  });

  document.querySelectorAll<HTMLElement>("[data-layer-group]").forEach((link) => {
    const keys = (link.dataset.layerGroup ?? "").split(" ");
    if (keys.includes(key)) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  });

  const board = isBoardMode();
  if (!BOARD_KEYS.includes(key)) {
    const zoom = document.querySelector<HTMLElement>("[data-zoom]");
    if (zoom) zoom.textContent = "100%";
  }
  document.querySelectorAll<HTMLElement>("[data-frame]").forEach((frame) => {
    const on = frame.dataset.frame === key;
    frame.classList.toggle("is-sel", on);
    if (on && !board) syncPill(frame);
  });
}

export function resetActive() {
  current = "";
}
