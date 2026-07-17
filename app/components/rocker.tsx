// Arched "rocker" lettering after the club-patch logo: white letters with a
// black inline and a white outer outline, set on a curve. The text is drawn
// twice — an outline pass underneath, then the face on top.
// `id` must be unique per instance on the page.
export default function Rocker({
  id,
  text,
  direction = "up",
  className,
}: {
  id: string;
  text: string;
  direction?: "up" | "down";
  className?: string;
}) {
  const up = direction === "up";
  const path = up ? "M 30 150 Q 350 -30 670 150" : "M 30 70 Q 350 250 670 70";

  return (
    <svg
      className={className}
      viewBox={up ? "0 0 700 170" : "0 0 700 180"}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <path id={id} d={path} fill="none" />
      </defs>
      <text className="rocker-outline">
        <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">
          {text}
        </textPath>
      </text>
      <text className="rocker-face">
        <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">
          {text}
        </textPath>
      </text>
    </svg>
  );
}
