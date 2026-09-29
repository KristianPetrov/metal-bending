export type ProfileId =
  | "track"
  | "stud"
  | "angle"
  | "hat-channel"
  | "sloped-track"
  | "sloped-angle"
  | "k-style"
  | "half-round"
  | "brownstone"
  | "box"
  | "double-bead";

export type Point = [number, number];

export type ProfileGeometry = {
  id: ProfileId;
  label: string;
  /** Sheet centerline, y increasing downward. */
  spine: Point[];
  thickness: number;
};

function arc(cx: number, cy: number, r: number, a0: number, a1: number, steps: number): Point[] {
  const points: Point[] = [];
  for (let i = 0; i <= steps; i++) {
    const a = a0 + ((a1 - a0) * i) / steps;
    points.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  return points;
}

function clean(points: Point[]): Point[] {
  const out: Point[] = [];
  for (const point of points) {
    const prev = out[out.length - 1];
    if (!prev || Math.hypot(point[0] - prev[0], point[1] - prev[1]) > 0.35) out.push(point);
  }
  return out;
}

function bead(cx: number, cy: number, r: number, a0: number, a1: number): Point[] {
  return arc(cx, cy, r, a0, a1, 12);
}

function halfRound(doubleBead: boolean): Point[] {
  const radius = 46;
  const points: Point[] = [];
  if (doubleBead) {
    points.push(...bead(-radius, -7, 7.5, Math.PI * 0.15, Math.PI * 1.85));
  } else {
    points.push([-radius + 2, -18], [-radius - 7, -14], [-radius - 5, -4]);
  }
  points.push(...arc(0, 0, radius, Math.PI, 0, 22));
  points.push(...bead(radius, -7, 7.5, Math.PI * 0.85, -Math.PI * 0.72));
  return clean(points);
}

function kStyle(): Point[] {
  return clean([
    [-2, -64],
    [-14, -64],
    [-14, -54],
    [-6, -54],
    [-6, 30],
    [34, 30],
    [34, 40],
    [46, 40],
    [56, 30],
    [64, 14],
    [68, -4],
    [68, -22],
    [68, -46],
    [80, -46],
    [80, -56],
    [70, -56],
  ]);
}

function brownstone(): Point[] {
  return clean([
    [-10, -58],
    [-10, 26],
    [6, 34],
    [28, 34],
    [48, 22],
    [62, 2],
    [70, -22],
    [72, -44],
    [84, -44],
    [84, -54],
    [74, -54],
  ]);
}

function boxGutter(): Point[] {
  return clean([
    [-34, -46],
    [-34, 30],
    [30, 30],
    [46, -36],
    [32, -46],
  ]);
}

export const profileGeometry: Record<ProfileId, ProfileGeometry> = {
  track: {
    id: "track",
    label: "Track",
    thickness: 7,
    spine: [
      [-30, -40],
      [-30, 28],
      [30, 28],
      [30, -40],
    ],
  },
  stud: {
    id: "stud",
    label: "Stud",
    thickness: 6.5,
    spine: [
      [8, -30],
      [26, -30],
      [26, -44],
      [-30, -44],
      [-30, 44],
      [26, 44],
      [26, 30],
      [8, 30],
    ],
  },
  angle: {
    id: "angle",
    label: "Angle",
    thickness: 8,
    spine: [
      [-4, -52],
      [-4, 8],
      [52, 8],
    ],
  },
  "hat-channel": {
    id: "hat-channel",
    label: "Hat channel",
    thickness: 6.5,
    spine: [
      [-54, 22],
      [-28, 22],
      [-28, -30],
      [28, -30],
      [28, 22],
      [54, 22],
    ],
  },
  "sloped-track": {
    id: "sloped-track",
    label: "Sloped track",
    thickness: 7,
    spine: [
      [-32, -6],
      [-32, 30],
      [32, 30],
      [32, -48],
    ],
  },
  "sloped-angle": {
    id: "sloped-angle",
    label: "Sloped angle",
    thickness: 8,
    spine: [
      [-6, -58],
      [-6, 10],
      [34, 10],
    ],
  },
  "k-style": {
    id: "k-style",
    label: "K-style",
    thickness: 5.5,
    spine: kStyle(),
  },
  "half-round": {
    id: "half-round",
    label: "Half-round",
    thickness: 5.5,
    spine: halfRound(false),
  },
  brownstone: {
    id: "brownstone",
    label: "Brownstone",
    thickness: 5.5,
    spine: brownstone(),
  },
  box: {
    id: "box",
    label: "Box",
    thickness: 5.5,
    spine: boxGutter(),
  },
  "double-bead": {
    id: "double-bead",
    label: "Double bead",
    thickness: 5.5,
    spine: halfRound(true),
  },
};

export function isFramingProfile(id: ProfileId) {
  return id === "track" || id === "stud" || id === "angle" || id === "hat-channel" || id === "sloped-track" || id === "sloped-angle";
}
