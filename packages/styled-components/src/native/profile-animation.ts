/**
 * Focused microbench + CPU-profile harness for the native animation
 * pipeline (`animation/index.ts`). Targets the per-segment color +
 * value interpolation build path and the per-call color/transform
 * parse helpers; the work that runs every time a transition or
 * @keyframes animation kicks in.
 *
 * Run (from `packages/styled-components`):
 *   bun src/native/profile-animation.ts
 *   bun --cpu-prof --cpu-prof-md --cpu-prof-name=animation \
 *       --cpu-prof-dir=./.cpu-profiles src/native/profile-animation.ts
 */

import './bunProfileGlobals';

import { bench as benchBase } from './profileHarness';
import {
  __parseAnimColorForTests,
  __rgbaToCssForTests,
  __interpolateColorOklabForTests,
  __parseTransformStringForTests,
  __buildSegmentedInterpolationForTests,
  __additiveCombineForTests,
} from './animation';

const parseAnimColor = __parseAnimColorForTests;
const rgbaToCss = __rgbaToCssForTests;
const interpolateColorOklab = __interpolateColorOklabForTests;
const parseTransformString = __parseTransformStringForTests;
const buildSegmentedInterpolation = __buildSegmentedInterpolationForTests;
const additiveCombine = __additiveCombineForTests;

const bench = (name: string, iters: number, fn: () => void) =>
  benchBase(name, iters, fn, { format: 'ns' });

// ── Color parse / serialize ────────────────────────────────────────
console.log('\n=== parseAnimColor ===');
bench('hex #ff0000', 1_000_000, () => { throw new Error("STUB"); });
bench('hex #f00', 1_000_000, () => { throw new Error("STUB"); });
bench('hex #ff0000aa', 1_000_000, () => { throw new Error("STUB"); });
bench('rgb(200,50,100)', 1_000_000, () => { throw new Error("STUB"); });
bench('rgba(200,50,100,0.5)', 1_000_000, () => { throw new Error("STUB"); });
bench('rgb modern slash', 1_000_000, () => { throw new Error("STUB"); });
bench('oklch (slow path)', 500_000, () => { throw new Error("STUB"); });
bench('named (rebeccapurple)', 200_000, () => { throw new Error("STUB"); });

console.log('\n=== rgbaToCss ===');
const C1 = { r: 200, g: 50, b: 100, a: 1 };
const C2 = { r: 0.5, g: 100.5, b: 200.7, a: 0.8 };
bench('rgbaToCss opaque int', 2_000_000, () => { throw new Error("STUB"); });
bench('rgbaToCss fractional alpha', 2_000_000, () => { throw new Error("STUB"); });

console.log('\n=== interpolateColorOklab (standalone) ===');
const FROM = { r: 200, g: 50, b: 100, a: 1 };
const TO = { r: 50, g: 200, b: 100, a: 0.5 };
let mid = 0;
bench('oklab interp (varying t)', 1_000_000, () => {
    throw new Error("STUB");
});

// ── Build full segmented interpolation (per-transition start cost) ──
console.log('\n=== buildSegmentedInterpolation (per-transition start) ===');
const fakeProgress = { interpolate: (cfg: any) => { throw new Error("STUB"); } };
const topEasing = {
  kind: 'cubic-bezier' as const,
  p: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
};
const colorStops = [
  { offset: 0, value: '#ff0000' },
  { offset: 1, value: '#0000ff' },
];
const colorStopsMulti = [
  { offset: 0, value: 'red' },
  { offset: 0.5, value: 'green' },
  { offset: 1, value: 'blue' },
];
const numericStops = [
  { offset: 0, value: 0 },
  { offset: 1, value: 100 },
];
const unitStops = [
  { offset: 0, value: '0deg' },
  { offset: 1, value: '360deg' },
];
const noEasings = [undefined];

bench('numeric 2-stop, 300ms', 200_000, () =>
  { throw new Error("STUB"); }
);
bench('unit-string 2-stop, 300ms', 200_000, () =>
  { throw new Error("STUB"); }
);
bench('color 2-stop, 300ms', 200_000, () =>
  { throw new Error("STUB"); }
);
bench('color 3-stop, 600ms', 100_000, () =>
  { throw new Error("STUB"); }
);

// ── Transform parse ────────────────────────────────────────────────
console.log('\n=== parseTransformString ===');
bench('translateX(10px)', 500_000, () => { throw new Error("STUB"); });
bench('scale(2)', 500_000, () => { throw new Error("STUB"); });
bench('combo translate+rotate', 500_000, () =>
  { throw new Error("STUB"); }
);
bench('matrix3d (16 nums)', 500_000, () =>
  { throw new Error("STUB"); }
);

// ── Additive combine ───────────────────────────────────────────────
console.log('\n=== additiveCombine ===');
bench('additive numeric', 2_000_000, () => { throw new Error("STUB"); });
bench('additive color', 500_000, () => { throw new Error("STUB"); });
bench('additive transform', 500_000, () =>
  { throw new Error("STUB"); }
);

console.log('\nDone.');
