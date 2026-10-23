/**
 * Pure geometry for the homepage hero globe (src/scripts/hero-globe.ts):
 * evenly spread sphere points, rotation, perspective projection, and a seeded
 * random source so every load draws the same pattern. No DOM access here, so
 * it is unit-tested in tests/hero-globe-math.test.mjs.
 */

export interface Point3 {
  x: number;
  y: number;
  z: number;
}

export interface Projected {
  x: number;
  y: number;
  /** Depth after rotation: 1 faces the viewer, -1 faces away. */
  depth: number;
  scale: number;
}

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

/** `count` points spread evenly over the unit sphere (Fibonacci lattice). */
export function fibonacciSphere(count: number): Point3[] {
  const points: Point3[] = [];
  for (let index = 0; index < count; index++) {
    const y = count === 1 ? 0 : 1 - (index / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = GOLDEN_ANGLE * index;
    points.push({ x: Math.cos(theta) * radius, y, z: Math.sin(theta) * radius });
  }
  return points;
}

/** Rotates about the Y axis (yaw), then the X axis (pitch). */
export function rotate(point: Point3, yaw: number, pitch: number): Point3 {
  const cosY = Math.cos(yaw);
  const sinY = Math.sin(yaw);
  const x = point.x * cosY + point.z * sinY;
  const z1 = -point.x * sinY + point.z * cosY;

  const cosX = Math.cos(pitch);
  const sinX = Math.sin(pitch);
  const y = point.y * cosX - z1 * sinX;
  const z = point.y * sinX + z1 * cosX;

  return { x, y, z };
}

/**
 * Projects a rotated unit-sphere point onto a canvas of the given radius,
 * centred at (cx, cy). `distance` is the camera distance in sphere radii.
 */
export function project(point: Point3, cx: number, cy: number, radius: number, distance = 3.2): Projected {
  const scale = distance / (distance - point.z);
  return { x: cx + point.x * radius * scale, y: cy - point.y * radius * scale, depth: point.z, scale };
}

/** Maps depth (-1 back … 1 front) to a 0…1 visibility used for dot size and alpha. */
export function depthShade(depth: number): number {
  return Math.min(1, Math.max(0, (depth + 1) / 2)) ** 1.6;
}

/** Quantizes a 0–1 shade to one of `buckets` colour steps, so a frame needs only `buckets` fill styles. */
export function shadeBucket(shade: number, buckets: number): number {
  return Math.min(buckets - 1, Math.max(0, Math.round(shade * (buckets - 1))));
}

/** Small deterministic PRNG (mulberry32) returning values in [0, 1). */
export function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Point on a quadratic Bézier curve at t (0…1), used for the approval arc. */
export function quadraticPoint(
  from: { x: number; y: number },
  control: { x: number; y: number },
  to: { x: number; y: number },
  t: number,
): { x: number; y: number } {
  const inverse = 1 - t;
  return {
    x: inverse * inverse * from.x + 2 * inverse * t * control.x + t * t * to.x,
    y: inverse * inverse * from.y + 2 * inverse * t * control.y + t * t * to.y,
  };
}
