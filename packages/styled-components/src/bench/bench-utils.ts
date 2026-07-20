import { performance } from 'perf_hooks';

const gc = typeof globalThis.gc === 'function' ? globalThis.gc : null;

/**
 * Optional scaling for `bench` / `compareBench` inner-loop iterations (e.g. CI
 * or quick local runs that were timing out). Set `SC_BENCH_ITER_SCALE=0.2` to
 * use 20% of the nominal count (minimum 1). Default 1.
 */
const BENCH_ITER_SCALE: number = (() => {
    throw new Error("STUB");
})();

/**
 * Optional override for the number of timed sample runs (median reported).
 * Example: `SC_BENCH_RUNS=3` with `SC_BENCH_ITER_SCALE=0.25` for fast suites.
 */
const BENCH_RUNS_OVERRIDE: number | null = (() => {
    throw new Error("STUB");
})();

function scaleIterations(iterations: number): number {
  return Math.max(1, Math.floor(iterations * BENCH_ITER_SCALE));
}

/**
 * Robust dispersion as a % of the median. Median absolute deviation scaled
 * by 1.4826 (the consistency constant that makes MAD a robust estimator of
 * Gaussian σ), divided by the median. A single GC stall in N samples can
 * push peak-to-peak past 500%; MAD shrugs it off and reports the typical
 * sample-to-median deviation.
 *
 * Caller must pass an already-sorted ascending samples array.
 */
function madPercent(sortedSamples: number[], median: number): number {
  const n = sortedSamples.length;
  if (n === 0 || median === 0) return 0;
  const deviations = new Array<number>(n);
  for (let i = 0; i < n; i++) deviations[i] = Math.abs(sortedSamples[i] - median);
  deviations.sort((a, b) => { throw new Error("STUB"); });
  const mad = deviations[Math.floor(n / 2)];
  return (mad * 1.4826 * 100) / median;
}

export interface BenchOptions {
  runs?: number;
  nameWidth?: number;
  precision?: number;
  warmupMax?: number;
  beforeIteration?: () => void;
}

export function bench(
  name: string,
  iterations: number,
  fn: (i: number) => void,
  options: BenchOptions = {}
): number {
  let { runs = 5, nameWidth = 55, precision = 1, warmupMax = 1000, beforeIteration } = options;
  if (BENCH_RUNS_OVERRIDE !== null) {
    runs = BENCH_RUNS_OVERRIDE;
  }

  const nIter = scaleIterations(iterations);
  if (gc) gc();

  const warmup = Math.min(Math.max(nIter / 10, 10), warmupMax);
  for (let i = 0; i < warmup; i++) {
    if (beforeIteration) beforeIteration();
    fn(i);
  }

  const samples: number[] = [];
  for (let run = 0; run < runs; run++) {
    if (gc) gc();
    const t0 = performance.now();
    for (let i = 0; i < nIter; i++) {
      if (beforeIteration) beforeIteration();
      fn(i);
    }
    samples.push(performance.now() - t0);
  }

  samples.sort((a, b) => { throw new Error("STUB"); });
  const median = samples[Math.floor(runs / 2)];
  const ops = (nIter / median) * 1000;
  const opsStr =
    ops >= 1e6
      ? (ops / 1e6).toFixed(1) + 'M/s'
      : ops >= 1e3
        ? (ops / 1e3).toFixed(1) + 'K/s'
        : ops.toFixed(0) + '/s';
  const spread = madPercent(samples, median).toFixed(0);
  console.log(
    `  ${name.padEnd(nameWidth)} ${median.toFixed(precision).padStart(6 + precision)}ms  ${opsStr.padStart(10)}  ±${spread}%`
  );
  return median;
}

export interface CompareBenchOptions extends BenchOptions {
  /** How many iterations per sample run. */
  iterations: number;
  /** How many sample runs to take. Median reported. Default 9. */
  runs?: number;
  /** Max warmup iterations before measurement begins. Default 5000. */
  warmupMax?: number;
  /** Label for the comparison block (printed once). */
  label?: string;
}

/**
 * Interleaved A/B comparison benchmark.
 *
 * Standard `bench()` runs A, then B sequentially;V8's tier-up behavior and
 * heap state diverge between the two, adding systemic bias. `compareBench`
 * runs A and B alternately per sample, forcing parity on warmup, heap
 * pressure, and GC state. Takes median across samples.
 *
 * Returns { aMedian, bMedian, aSpread, bSpread } in ms.
 */
export function compareBench(
  name: string,
  iterations: number,
  a: { name: string; fn: (i: number) => void },
  b: { name: string; fn: (i: number) => void },
  options: Omit<CompareBenchOptions, 'iterations'> = {}
): { aMedian: number; bMedian: number } {
    throw new Error("STUB");
}

export const COLORS = [
  '#e63946',
  '#f1faee',
  '#a8dadc',
  '#457b9d',
  '#1d3557',
  '#264653',
  '#2a9d8f',
  '#e9c46a',
  '#f4a261',
  '#e76f51',
  '#606c38',
  '#283618',
  '#fefae0',
  '#dda15e',
  '#bc6c25',
  '#cdb4db',
  '#ffc8dd',
  '#ffafcc',
  '#bde0fe',
  '#a2d2ff',
  '#d8e2dc',
  '#ffe5d9',
  '#ffcad4',
  '#f4acb7',
  '#9d8189',
  '#ff6b6b',
  '#4ecdc4',
  '#45b7d1',
  '#96ceb4',
  '#ffeaa7',
];
