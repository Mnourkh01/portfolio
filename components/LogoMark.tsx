import Image from "next/image";
import { LOGO_HEIGHT, LOGO_SRC, LOGO_WIDTH } from "@/lib/logo";

type Props = {
  height?: number;
  className?: string;
};

export default function LogoMark({ height = 26, className }: Props) {
  const width = Math.round((height * LOGO_WIDTH) / LOGO_HEIGHT);
  return (
    <Image
      src={LOGO_SRC}
      width={width}
      height={height}
      className={className}
      alt=""
      aria-hidden="true"
      priority
    />
  );
}
