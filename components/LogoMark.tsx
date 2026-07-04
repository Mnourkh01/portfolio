import {
  LOGO_BARS,
  LOGO_VIEWBOX,
  LOGO_WIDTH,
  LOGO_HEIGHT,
} from "@/lib/logo";

type Props = {
  height?: number;
  className?: string;
};

/** The MN bar-mark as inline SVG. Colored via `currentColor`. */
export default function LogoMark({ height = 26, className }: Props) {
  const width = Math.round((height * LOGO_WIDTH) / LOGO_HEIGHT);
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      width={width}
      height={height}
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {LOGO_BARS.map(([x, y, w, h, rx]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx={rx} />
      ))}
    </svg>
  );
}
