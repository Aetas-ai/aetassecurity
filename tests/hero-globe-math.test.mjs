import assert from 'node:assert/strict';
import test from 'node:test';
import {
  depthShade,
  fibonacciSphere,
  project,
  quadraticPoint,
  rotate,
  seededRandom,
  shadeBucket,
} from '../src/scripts/hero-globe-math.ts';

const close = (actual, expected, message) => assert.ok(Math.abs(actual - expected) < 1e-9, `${message}: ${actual} ≠ ${expected}`);

test('sphere points lie on the unit sphere and span both poles', () => {
  const points = fibonacciSphere(900);
  assert.equal(points.length, 900);
  for (const point of points) close(Math.hypot(point.x, point.y, point.z), 1, 'radius');
  close(points[0].y, 1, 'north pole');
  close(points.at(-1).y, -1, 'south pole');
});

test('rotation preserves distance from the centre', () => {
  const point = { x: 0.3, y: -0.4, z: Math.sqrt(1 - 0.09 - 0.16) };
  const rotated = rotate(point, 1.1, -0.35);
  close(Math.hypot(rotated.x, rotated.y, rotated.z), 1, 'length');
  const quarterTurn = rotate({ x: 1, y: 0, z: 0 }, Math.PI / 2, 0);
  close(quarterTurn.z, -1, 'yaw moves +x to -z');
});

test('projection centres the origin and enlarges points nearer the viewer', () => {
  const centre = project({ x: 0, y: 0, z: 0 }, 200, 150, 100);
  assert.deepEqual([centre.x, centre.y, centre.scale], [200, 150, 1]);
  const front = project({ x: 0, y: 1, z: 0.5 }, 200, 150, 100);
  const back = project({ x: 0, y: 1, z: -0.5 }, 200, 150, 100);
  assert.ok(front.scale > 1 && back.scale < 1);
  assert.ok(front.y < 150, 'positive y draws above the centre');
});

test('depth shading runs from hidden at the back to full at the front', () => {
  assert.equal(depthShade(-1), 0);
  assert.equal(depthShade(1), 1);
  assert.ok(depthShade(0) > 0 && depthShade(0) < 0.5);
});

test('seeded random is deterministic and stays within [0, 1)', () => {
  const first = seededRandom(42);
  const second = seededRandom(42);
  for (let index = 0; index < 50; index++) {
    const value = first();
    assert.equal(value, second());
    assert.ok(value >= 0 && value < 1);
  }
});

test('the approval arc starts and ends on its endpoints', () => {
  const from = { x: 0, y: 0 };
  const control = { x: 50, y: -40 };
  const to = { x: 100, y: 0 };
  assert.deepEqual(quadraticPoint(from, control, to, 0), from);
  assert.deepEqual(quadraticPoint(from, control, to, 1), to);
});

test('shade buckets stay in range and never decrease as shade rises', () => {
  assert.equal(shadeBucket(0, 12), 0);
  assert.equal(shadeBucket(1, 12), 11);
  assert.equal(shadeBucket(-0.5, 12), 0);
  assert.equal(shadeBucket(1.5, 12), 11);
  let previous = 0;
  for (let shade = 0; shade <= 1; shade += 0.01) {
    const bucket = shadeBucket(shade, 12);
    assert.ok(bucket >= previous && bucket <= 11);
    previous = bucket;
  }
});
