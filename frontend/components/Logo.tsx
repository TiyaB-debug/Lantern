import Image from "next/image";
import Link from "next/link";

// The small static logo used in the header. Replace this file in /public with your logo icon
// (svg, png or webp all work). The animated webm is used by the loading screen instead.
const LOGO_SRC = "/lantern-logo.svg";
// Width divided by height of the logo image. 1 = square.
const LOGO_ASPECT = 64 / 96;

type LogoProps = {
  /** Height of the logo in pixels. */
  size?: number;
  /** Set to false if your logo image already includes the word "Lantern". */
  showWordmark?: boolean;
  asLink?: boolean;
};

export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <Image
      src={LOGO_SRC}
      alt=""
      width={Math.round(size * LOGO_ASPECT)}
      height={size}
      priority
    />
  );
}

export default function Logo({ size = 36, showWordmark = true, asLink = true }: LogoProps) {
  const content = (
    <span className="logo">
      <LogoMark size={size} />
      {showWordmark && <span className="logo-word">Lantern</span>}
    </span>
  );

  if (!asLink) return content;
  return (
    <Link href="/" aria-label="Lantern home" className="logo-link">
      {content}
    </Link>
  );
}