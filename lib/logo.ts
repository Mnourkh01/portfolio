// MN bar-mark geometry, traced from the brand logo (25 bars + dot).
// Shared by LogoMark, the favicon, and the OG image so they never drift.
export const LOGO_VIEWBOX = "0 0 637 458";
export const LOGO_WIDTH = 637;
export const LOGO_HEIGHT = 458;

// [x, y, width, height, rx]
export const LOGO_BARS: ReadonlyArray<
  readonly [number, number, number, number, number]
> = [
  [0, 0, 17, 101, 6],
  [0, 120, 17, 101, 6],
  [0, 240, 17, 100, 6],
  [0, 359, 17, 99, 6],
  [37, 42, 17, 128, 6],
  [71, 102, 18, 119, 6],
  [107, 147, 17, 126, 6],
  [143, 192, 17, 136, 6],
  [179, 148, 18, 125, 6],
  [216, 113, 17, 108, 6],
  [252, 53, 17, 123, 6],
  [288, 0, 17, 101, 6],
  [288, 120, 17, 101, 6],
  [288, 240, 17, 100, 6],
  [288, 359, 17, 99, 6],
  [324, 42, 17, 128, 6],
  [358, 102, 18, 112, 6],
  [393, 159, 17, 114, 6],
  [428, 209, 17, 126, 6],
  [463, 274, 18, 127, 6],
  [512, 0, 18, 101, 6],
  [512, 120, 18, 101, 6],
  [512, 240, 18, 100, 6],
  [512, 359, 18, 99, 6],
  [579, 401, 58, 57, 10],
];
