import { profileGeometry, type Point, type ProfileId } from "@/lib/profile-geometry";

type Metal = "copper" | "galvanized";

const palette: Record<Metal, { shadow: string; mid: string; highlight: string }> = {
  copper: { shadow: "#7a4128", mid: "#c4784a", highlight: "#f6d7be" },
  galvanized: { shadow: "#6a727a", mid: "#b7bec4", highlight: "#f4f6f7" },
};

function intersect(origin: Point, direction: Point, other: Point, otherDirection: Point): Point | null {
  const den = direction[0] * otherDirection[1] - direction[1] * otherDirection[0];
  if (Math.abs(den) < 1e-6) return null;
  const t = ((other[0] - origin[0]) * otherDirection[1] - (other[1] - origin[1]) * otherDirection[0]) / den;
  return [origin[0] + direction[0] * t, origin[1] + direction[1] * t];
}

function offsetSpine(points: Point[], distance: number): Point[] {
  const count = points.length;
  const directions: Point[] = [];
  const normals: Point[] = [];
  for (let i = 0; i < count - 1; i++) {
    const dx = points[i + 1][0] - points[i][0];
    const dy = points[i + 1][1] - points[i][1];
    const length = Math.hypot(dx, dy) || 1;
    directions.push([dx / length, dy / length]);
    normals.push([-dy / length, dx / length]);
  }

  const limit = Math.abs(distance) * 2.6;
  const result: Point[] = [];
  for (let i = 0; i < count; i++) {
    if (i === 0 || i === count - 1) {
      const segment = i === 0 ? 0 : count - 2;
      result.push([
        points[i][0] + normals[segment][0] * distance,
        points[i][1] + normals[segment][1] * distance,
      ]);
      continue;
    }
    const first: Point = [
      points[i][0] + normals[i - 1][0] * distance,
      points[i][1] + normals[i - 1][1] * distance,
    ];
    const second: Point = [
      points[i][0] + normals[i][0] * distance,
      points[i][1] + normals[i][1] * distance,
    ];
    const hit = intersect(first, directions[i - 1], second, directions[i]);
    if (!hit || Math.hypot(hit[0] - points[i][0], hit[1] - points[i][1]) > limit) {
      result.push([(first[0] + second[0]) / 2, (first[1] + second[1]) / 2]);
    } else {
      result.push(hit);
    }
  }
  return result;
}

function ringPath(outer: Point[], inner: Point[]) {
  const points = [...outer, ...[...inner].reverse()];
  return `${points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point[0].toFixed(2)} ${point[1].toFixed(2)}`)
    .join(" ")} Z`;
}

export default function ProfileArt({
  id,
  metal,
  title,
}: {
  id: ProfileId;
  metal: Metal;
  title: string;
}) {
  const geometry = profileGeometry[id];
  const half = geometry.thickness / 2;
  const outer = offsetSpine(geometry.spine, half);
  const inner = offsetSpine(geometry.spine, -half);
  const colors = palette[metal];
  const points = [...outer, ...inner];
  const xs = points.map((point) => point[0]);
  const ys = points.map((point) => point[1]);
  const pad = 14;
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  const maxX = Math.max(...xs) + pad;
  const maxY = Math.max(...ys) + pad;
  const gradientId = `${id}-metal`;

  return (
    <svg viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`} role="img" aria-label={title}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={colors.highlight} />
          <stop offset="0.45" stopColor={colors.mid} />
          <stop offset="1" stopColor={colors.shadow} />
        </linearGradient>
      </defs>
      <path
        d={ringPath(outer, inner)}
        fill={`url(#${gradientId})`}
        stroke={colors.highlight}
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
