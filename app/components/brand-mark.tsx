import Image from "next/image";

export default function BrandMark({ className }: { className?: string }) {
  return (
    <Image
      className={className}
      src="/mbc-chrome-transparent.png"
      alt=""
      width={2172}
      height={724}
    />
  );
}
