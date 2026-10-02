// Concentric radii rising from below the hero, like formed sections nested on
// a die. Heavier strokes stand in for profiles, hairlines for layout lines.
const arcs = [
  { r: 330, w: 1, o: 0.18 },
  { r: 380, w: 14, o: 0.5 },
  { r: 430, w: 1, o: 0.14 },
  { r: 480, w: 6, o: 0.38 },
  { r: 545, w: 1, o: 0.12 },
  { r: 610, w: 22, o: 0.42 },
  { r: 680, w: 1, o: 0.1 },
  { r: 745, w: 4, o: 0.28 },
  { r: 820, w: 1, o: 0.08 },
  { r: 900, w: 10, o: 0.22 },
  { r: 990, w: 1, o: 0.07 },
  { r: 1080, w: 3, o: 0.14 },
];

const cx = 800;
const cy = 980;

export default function HeroArcs({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="hero-arc-steel" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5c5c5c" />
          <stop offset="0.3" stopColor="#d9d9d9" />
          <stop offset="0.5" stopColor="#ffffff" />
          <stop offset="0.7" stopColor="#bdbdbd" />
          <stop offset="1" stopColor="#4a4a4a" />
        </linearGradient>
      </defs>
      {arcs.map((arc, index) => (
        <path
          key={arc.r}
          className="hero-arc"
          d={`M ${cx - arc.r} ${cy} A ${arc.r} ${arc.r} 0 0 1 ${cx + arc.r} ${cy}`}
          pathLength={1}
          fill="none"
          stroke={arc.w > 1 ? "url(#hero-arc-steel)" : "#ffffff"}
          strokeWidth={arc.w}
          strokeOpacity={arc.o}
          style={{ animationDelay: `${120 + index * 70}ms` }}
        />
      ))}
    </svg>
  );
}
