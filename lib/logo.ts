// "Frame to code" mark: the corners of a design frame fold into the brackets of <MN/>.
// One geometry for LogoMark, the favicon and the OG image so they never drift.
// Both states keep the same command layout so GSAP can tween the numbers between them.
export const LOGO_VIEWBOX = "2 10 60 44";
export const LOGO_WIDTH = 60;
export const LOGO_HEIGHT = 44;

export const LOGO_CODE = {
  left: "M13 20L5 32L5 32M5 32L5 32L13 44",
  right: "M43 46L46 32L49 18M52 20L59 32L52 44",
} as const;

export const LOGO_FRAME = {
  left: "M17 13L9 13L9 21M9 43L9 51L17 51",
  right: "M47 13L55 13L55 21M55 43L55 51L47 51",
} as const;

export const LOGO_LETTERS = "M15 39V25l4.75 7.5 4.75-7.5v14M30.5 39V25l8.5 14V25";

// Letters sit left of centre in the code state; in the frame state they grow back to the middle.
export const LOGO_LETTERS_FRAME = { x: 5, scale: 1.18 } as const;

export const LOGO_STROKE = { bracket: 3, letters: 3.4 } as const;

export const LOGO_LIVE_EVENT = "canvas:live";
