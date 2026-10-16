import {
  LOGO_CODE,
  LOGO_HEIGHT,
  LOGO_LETTERS,
  LOGO_STROKE,
  LOGO_VIEWBOX,
  LOGO_WIDTH,
} from "@/lib/logo";

type Props = {
  height?: number;
  className?: string;
};

/** The <MN/> mark. Brackets use `currentColor`; letters use the frame colour. Rendered in its final (code) state. */
export default function LogoMark({ height = 26, className }: Props) {
  const width = Math.round((height * LOGO_WIDTH) / LOGO_HEIGHT);
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
      focusable="false"
      data-logo=""
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path data-logo-left="" d={LOGO_CODE.left} stroke="currentColor" strokeWidth={LOGO_STROKE.bracket} />
      <path data-logo-right="" d={LOGO_CODE.right} stroke="currentColor" strokeWidth={LOGO_STROKE.bracket} />
      <path data-logo-letters="" d={LOGO_LETTERS} style={{ stroke: "var(--frame)" }} strokeWidth={LOGO_STROKE.letters} />
    </svg>
  );
}
