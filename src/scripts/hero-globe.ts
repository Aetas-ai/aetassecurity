/**
 * Homepage hero globe: a rotating particle sphere on <canvas> with the shield
 * at its centre. Every few seconds a detection appears on the front of the
 * globe ("Detected"), an arc carries it to the shield ("Analyst approval"),
 * and only then does it turn "Contained", the Expert in the Loop sequence.
 *
 * The stage tilts toward the pointer (Heimdal's easing and limits; not on
 * touch devices). The loop stops while the globe is off-screen
 * (data-motion-paused, set by Layout.astro) or the tab is hidden. Under
 * reduced motion one static frame is drawn. Chips always carry a text label.
 */
import { depthShade, fibonacciSphere, project, quadraticPoint, rotate, seededRandom, type Point3 } from './hero-globe-math';

type Phase = 'detected' | 'review' | 'contained';

interface Detection {
  point: Point3;
  born: number;
  chip: HTMLElement;
  phase: Phase;
}

// Timeline of one detection, in milliseconds from when it appears.
const ARC_START = 1100;
const ARC_END = 2100;
const CONTAIN_AT = 3300;
const FADE_AT = 5200;
const SPAWN_EVERY = 3600;
const MAX_DETECTIONS = 3;

// Pointer tilt, matched to the reference hero.
const MAX_MOVE_X = 28;
const MAX_MOVE_Y = 20;
const MAX_ROTATE_Y = 6;
const MAX_ROTATE_X = 4;
const EASE = 0.08;

const SPIN = 0.00006; // radians per millisecond
const PITCH = -0.32;

const LABELS: Record<Phase, string> = { detected: 'Detected', review: 'Analyst approval', contained: 'Contained' };

let teardown: (() => void) | undefined;

export function destroyHeroGlobe() {
  teardown?.();
  teardown = undefined;
}

export function initHeroGlobe() {
  destroyHeroGlobe();

  const root = document.querySelector<HTMLElement>('[data-hero-globe]');
  const canvas = root?.querySelector<HTMLCanvasElement>('canvas');
  const stage = root?.querySelector<HTMLElement>('[data-globe-stage]');
  const chipLayer = root?.querySelector<HTMLElement>('[data-globe-chips]');
  const context = canvas?.getContext('2d');
  if (!root || !canvas || !stage || !chipLayer || !context) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hero = root.closest<HTMLElement>('section') ?? root;

  let points: Point3[] = [];
  let size = 0;
  let ratio = 1;
  let frame = 0;
  let running = false;
  let lastSpawn = 0;
  let spinOffset = 0;
  let lastTime = 0;
  const random = seededRandom(20261023);
  const detections: Detection[] = [];

  // Pointer tilt state.
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  const reviewChip = makeChip('review');
  reviewChip.classList.add('globe-chip--centre');
  chipLayer.append(reviewChip);

  function makeChip(phase: Phase) {
    const chip = document.createElement('span');
    chip.className = `globe-chip globe-chip--${phase}`;
    chip.textContent = LABELS[phase];
    return chip;
  }

  function setPhase(detection: Detection, phase: Phase) {
    detection.phase = phase;
    detection.chip.className = `globe-chip globe-chip--${phase} is-visible`;
    detection.chip.textContent = LABELS[phase];
  }

  function resize() {
    const rect = stage!.getBoundingClientRect();
    size = Math.max(1, Math.round(Math.min(rect.width, rect.height || rect.width)));
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas!.width = size * ratio;
    canvas!.height = size * ratio;
    canvas!.style.width = `${size}px`;
    canvas!.style.height = `${size}px`;
    const count = size < 420 ? 460 : 900;
    if (points.length !== count) points = fibonacciSphere(count);
    if (!running) draw(performance.now());
  }

  function yawAt(time: number) {
    return time * SPIN + spinOffset + currentX * 0.004;
  }

  function spawn(time: number) {
    if (detections.length >= MAX_DETECTIONS) return;
    const yaw = yawAt(time);
    const pitch = PITCH - currentY * 0.003;
    // Pick a point facing the viewer, away from the shield in the middle.
    for (let attempt = 0; attempt < 40; attempt++) {
      const candidate = points[Math.floor(random() * points.length)];
      const rotated = rotate(candidate, yaw, pitch);
      if (rotated.z > 0.35 && Math.hypot(rotated.x, rotated.y) > 0.45 && Math.abs(rotated.y) < 0.8) {
        const chip = makeChip('detected');
        chipLayer!.append(chip);
        requestAnimationFrame(() => chip.classList.add('is-visible'));
        detections.push({ point: candidate, born: time, chip, phase: 'detected' });
        return;
      }
    }
  }

  function draw(time: number) {
    const ctx = context!;
    const cx = size / 2;
    const cy = size / 2;
    const radius = size * 0.4;
    const yaw = yawAt(time);
    const pitch = PITCH - currentY * 0.003;

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, size, size);

    // Atmosphere around the sphere.
    const halo = ctx.createRadialGradient(cx, cy, radius * 0.6, cx, cy, radius * 1.25);
    halo.addColorStop(0, 'rgba(47, 107, 255, 0.16)');
    halo.addColorStop(0.7, 'rgba(34, 211, 238, 0.06)');
    halo.addColorStop(1, 'rgba(34, 211, 238, 0)');
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, size, size);

    // Particles: blue at the back, cyan at the front.
    for (const point of points) {
      const rotated = rotate(point, yaw, pitch);
      const projected = project(rotated, cx, cy, radius);
      const shade = depthShade(rotated.z);
      const red = Math.round(47 + (34 - 47) * shade);
      const green = Math.round(107 + (211 - 107) * shade);
      const blue = Math.round(255 + (238 - 255) * shade);
      ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${0.1 + shade * 0.75})`;
      const dot = (0.55 + shade * 1.25) * projected.scale;
      ctx.fillRect(projected.x - dot / 2, projected.y - dot / 2, dot, dot);
    }

    // A dark core keeps the shield readable over the particles.
    const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.48);
    core.addColorStop(0, 'rgba(5, 11, 22, 0.9)');
    core.addColorStop(0.65, 'rgba(5, 11, 22, 0.55)');
    core.addColorStop(1, 'rgba(5, 11, 22, 0)');
    ctx.fillStyle = core;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.48, 0, Math.PI * 2);
    ctx.fill();

    let reviewing = false;

    for (const detection of detections) {
      const age = time - detection.born;
      const rotated = rotate(detection.point, yaw, pitch);
      const at = project(rotated, cx, cy, radius);
      const facing = rotated.z > 0;

      if (age >= CONTAIN_AT && detection.phase !== 'contained') setPhase(detection, 'contained');
      if (age >= ARC_START && age < CONTAIN_AT) reviewing = true;

      const colour = detection.phase === 'contained' ? '58, 174, 224' : '240, 82, 61';
      if (facing) {
        // Point marker with an expanding pulse.
        const pulse = (age % 1400) / 1400;
        ctx.strokeStyle = `rgba(${colour}, ${0.55 * (1 - pulse)})`;
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.arc(at.x, at.y, 4 + pulse * 14, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = `rgb(${colour})`;
        ctx.beginPath();
        ctx.arc(at.x, at.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Arc from the detection to the shield, drawn as it travels.
      if (age >= ARC_START && age < FADE_AT && facing) {
        const progress = Math.min(1, (age - ARC_START) / (ARC_END - ARC_START));
        const fade = age > CONTAIN_AT ? Math.max(0, 1 - (age - CONTAIN_AT) / (FADE_AT - CONTAIN_AT)) : 1;
        const control = { x: (at.x + cx) / 2, y: Math.min(at.y, cy) - radius * 0.35 };
        const gradient = ctx.createLinearGradient(at.x, at.y, cx, cy);
        gradient.addColorStop(0, `rgba(34, 211, 238, ${0.9 * fade})`);
        gradient.addColorStop(1, `rgba(47, 107, 255, ${0.9 * fade})`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(at.x, at.y);
        const steps = 24;
        for (let step = 1; step <= steps * progress; step++) {
          const p = quadraticPoint(at, control, { x: cx, y: cy }, step / steps);
          ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // Chip follows its point; hidden while the point is behind the globe.
      detection.chip.style.transform = `translate3d(${at.x}px, ${at.y}px, 0)`;
      detection.chip.classList.toggle('is-behind', !facing);
      if (age >= FADE_AT) detection.chip.classList.remove('is-visible');
    }

    reviewChip.classList.toggle('is-visible', reviewing);
    reviewChip.style.transform = `translate3d(${cx}px, ${cy + radius * 0.42}px, 0)`;

    // Retire finished detections once their chip has faded.
    for (let index = detections.length - 1; index >= 0; index--) {
      if (time - detections[index].born > FADE_AT + 600) {
        detections[index].chip.remove();
        detections.splice(index, 1);
      }
    }
  }

  function applyTilt() {
    currentX += (targetX - currentX) * EASE;
    currentY += (targetY - currentY) * EASE;
    const rotateY = (currentX / MAX_MOVE_X) * MAX_ROTATE_Y;
    const rotateX = (-currentY / MAX_MOVE_Y) * MAX_ROTATE_X;
    stage!.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
  }

  function loop(time: number) {
    if (!running) return;
    if (lastTime && time - lastTime > 500) {
      // Returning from a pause: keep the globe where it was and start fresh.
      spinOffset -= (time - lastTime) * SPIN;
      lastSpawn = time;
    }
    lastTime = time;
    if (time - lastSpawn > SPAWN_EVERY) {
      lastSpawn = time;
      spawn(time);
    }
    if (finePointer) applyTilt();
    draw(time);
    frame = requestAnimationFrame(loop);
  }

  const shouldRun = () => !reducedMotion && !document.hidden && !root.hasAttribute('data-motion-paused');

  function sync() {
    if (shouldRun() && !running) {
      running = true;
      frame = requestAnimationFrame(loop);
    } else if (!shouldRun() && running) {
      running = false;
      cancelAnimationFrame(frame);
    }
  }

  const onPointerMove = (event: PointerEvent) => {
    const rect = hero.getBoundingClientRect();
    const percentX = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const percentY = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    targetX = Math.max(-1, Math.min(1, percentX)) * MAX_MOVE_X;
    targetY = Math.max(-1, Math.min(1, percentY)) * MAX_MOVE_Y;
  };
  const onPointerLeave = () => {
    targetX = 0;
    targetY = 0;
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(stage);
  const pauseObserver = new MutationObserver(sync);
  pauseObserver.observe(root, { attributes: true, attributeFilter: ['data-motion-paused'] });
  document.addEventListener('visibilitychange', sync);
  if (finePointer && !reducedMotion) {
    hero.addEventListener('pointermove', onPointerMove);
    hero.addEventListener('pointerleave', onPointerLeave);
  }

  resize();
  if (reducedMotion) {
    // One still frame showing the end of the sequence.
    const time = 0;
    spawn(time);
    for (const detection of detections) setPhase(detection, 'contained');
    draw(time + CONTAIN_AT);
  } else {
    lastSpawn = performance.now() - SPAWN_EVERY + 900;
    sync();
  }
  root.setAttribute('data-ready', '');

  teardown = () => {
    running = false;
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    pauseObserver.disconnect();
    document.removeEventListener('visibilitychange', sync);
    hero.removeEventListener('pointermove', onPointerMove);
    hero.removeEventListener('pointerleave', onPointerLeave);
    chipLayer.replaceChildren();
  };
}
