import Image from "next/image";

// The chrome logo carries its own drop shadow, which only reads on a mid-gray
// steel surface. Place it on `.steel-surface` (or a similar gray) rather than
// on black or white.
export default function BrandMark({
  className,
  sizes = "320px",
  preload = false,
}: {
  className?: string;
  sizes?: string;
  preload?: boolean;
}) {
  return (
    <Image
      className={className}
      src="/mbc-chrome-transparent.png"
      alt=""
      width={2172}
      height={724}
      sizes={sizes}
      preload={preload}
    />
  );
}
