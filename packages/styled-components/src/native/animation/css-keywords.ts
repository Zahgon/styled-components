import type { EasingDescriptor } from './types';

/**
 * Canonical CSS Easing L1 keyword → cubic-bezier mapping.
 *
 * RN core's `Easing.ease` and reanimated 4's `Easing.ease` both ship
 * `bezier(0.42, 0, 1, 1)`, which is the CSS `ease-in` curve. Adapters
 * MUST go through this table when translating CSS keywords; passing the
 * raw `'ease'` keyword to either engine produces the wrong curve.
 *
 * Source: https://www.w3.org/TR/css-easing-1/#valdef-easing-function-ease
 */
export const CSS_EASING_KEYWORDS: Record<string, [number, number, number, number]> = {
  ease: [0.25, 0.1, 0.25, 1],
  'ease-in': [0.42, 0, 1, 1],
  'ease-out': [0, 0, 0.58, 1],
  'ease-in-out': [0.42, 0, 0.58, 1],
};

/** The `animation`/`transition` shorthand's spec initial timing function (`ease`). */
export const DEFAULT_EASING: EasingDescriptor = {
  kind: 'cubic-bezier',
  p: CSS_EASING_KEYWORDS.ease,
};

/**
 * Build an EasingDescriptor from a raw CSS easing string. Returns a
 * `linear` descriptor for the literal `linear` keyword (no work to do).
 *
 * Recognises:
 * - The four spec keywords (`ease`, `ease-in`, `ease-out`, `ease-in-out`)
 * - `linear`
 * - `step-start` (≡ `steps(1, jump-start)`)
 * - `step-end`   (≡ `steps(1, jump-end)`)
 * - `cubic-bezier(x1, y1, x2, y2)`
 * - `steps(N, <jump-term>)`
 * - `linear(<linear-stop-list>)`
 *
 * Returns `null` on unparseable input (caller falls back to default `ease`).
 */
export function parseEasing(raw: string): EasingDescriptor | null {
    throw new Error("STUB");
}

function parseCubicBezier(args: string): EasingDescriptor | null {
    throw new Error("STUB");
}

function parseSteps(args: string): EasingDescriptor | null {
    throw new Error("STUB");
}

function parseLinearStops(args: string): EasingDescriptor | null {
    throw new Error("STUB");
}

/**
 * Cubic Bézier evaluator: returns y(progress) for the easing curve
 * `cubic-bezier(p1x, p1y, p2x, p2y)` at a given input progress in [0, 1].
 *
 * Implementation: solve the bezier x equation for t given x = progress
 * (Newton's method seeded by linear, falling back to bisection), then
 * evaluate the bezier y polynomial at t.
 *
 * Used by the Animated adapter to resample easing curves into per-frame
 * sample lists when handing off to RN's interpolate (which only supports
 * linear segments on the native driver path).
 */
export function evaluateCubicBezier(
  p1x: number,
  p1y: number,
  p2x: number,
  p2y: number,
  progress: number
): number {
  if (progress <= 0) return 0;
  if (progress >= 1) return 1;
  const ax = 3 * p1x - 3 * p2x + 1;
  const bx = 3 * p2x - 6 * p1x;
  const cx = 3 * p1x;
  const ay = 3 * p1y - 3 * p2y + 1;
  const by = 3 * p2y - 6 * p1y;
  const cy = 3 * p1y;

  // Newton's method.
  let t = progress;
  for (let i = 0; i < 8; i++) {
    const x = ((ax * t + bx) * t + cx) * t - progress;
    if (Math.abs(x) < 1e-6) break;
    const dx = (3 * ax * t + 2 * bx) * t + cx;
    if (Math.abs(dx) < 1e-6) break;
    t -= x / dx;
  }
  // Clamp the solved t into [0, 1] in case Newton's overshot.
  if (t < 0) t = 0;
  else if (t > 1) t = 1;
  return ((ay * t + by) * t + cy) * t;
}

/**
 * Step easing evaluator: returns y(progress) for `steps(n, jump-type)`.
 * Determines the current step S as floor(progress * n), then maps S to
 * an output level based on jump-type.
 */
export function evaluateSteps(
  n: number,
  jump: 'jump-start' | 'jump-end' | 'jump-none' | 'jump-both',
  progress: number
): number {
  if (progress < 0) progress = 0;
  if (progress > 1) progress = 1;
  let step = Math.floor(progress * n);
  if (progress === 1) step = n; // include the final boundary
  switch (jump) {
    case 'jump-start':
      // Output levels: 1/n, 2/n, …, n/n (jumps up at the start).
      return Math.min((step + 1) / n, 1);
    case 'jump-end':
      // Output levels: 0, 1/n, …, (n-1)/n (jumps up at the end).
      return Math.min(step / n, 1);
    case 'jump-none':
      // Output levels: 0, 1/(n-1), …, 1.
      return n > 1 ? Math.min(step / (n - 1), 1) : progress;
    case 'jump-both':
      // Output levels: 1/(n+1), 2/(n+1), …, n/(n+1).
      return Math.min((step + 1) / (n + 1), 1);
  }
}

/**
 * Evaluate an EasingDescriptor at progress p ∈ [0, 1]. Returns the
 * eased output in [0, 1] (with `cubic-bezier` y values potentially
 * outside, per spec).
 */
export function evaluateEasing(easing: EasingDescriptor, progress: number): number {
  switch (easing.kind) {
    case 'linear':
      return progress;
    case 'cubic-bezier': {
      const [a, b, c, d] = easing.p;
      return evaluateCubicBezier(a, b, c, d, progress);
    }
    case 'steps':
      return evaluateSteps(easing.n, easing.jump, progress);
    case 'linear-stops': {
      const stops = easing.stops;
      if (progress <= stops[0][0]) return stops[0][1];
      const last = stops[stops.length - 1];
      if (progress >= last[0]) return last[1];
      for (let i = 1; i < stops.length; i++) {
        const [x1, y1] = stops[i];
        if (progress <= x1) {
          const [x0, y0] = stops[i - 1];
          const span = x1 - x0;
          if (span === 0) return y1;
          return y0 + ((y1 - y0) * (progress - x0)) / span;
        }
      }
      return last[1];
    }
  }
}
