/**
 * Adapted from packages/benchmarks/src/app/Benchmark for React Native.
 * Original (web): The MIT License — Copyright (c) 2017 Paul Armstrong
 * https://github.com/paularmstrong/react-component-benchmark
 *
 * Differences from the web version:
 * - No `forceLayout` (no synchronous DOM read on native).
 * - Uses RN-global performance.now()/requestAnimationFrame (no `window`).
 * - TypeScript instead of Flow.
 */
import React from 'react';
import { NativeModules } from 'react-native';
import { getIQR, getMean, getMedian, getStdDev, getTrimmedMean } from './math';
import * as Timing from './timing';

// HermesInternal.gc() forces a major GC. Calling it before every recorded
// sample is too aggressive (it costs ms each), but calling it once before
// the run starts (after warmup) and once between case changes pushes
// stop-the-world pauses out of the measurement window.
declare const HermesInternal: { gc?: () => void } | undefined;

interface SCProfilerNative {
  enable(): boolean;
  disable(): boolean;
  dumpToFile(fileName: string): string;
}
const SCProfiler: SCProfilerNative | undefined = NativeModules.SCProfiler;

export const forceGc = (): boolean => {
    throw new Error("STUB");
};

// Toggles the Hermes sampling profiler via the SCProfiler native module
// (defined in ios/iosbench/SCProfiler.{h,mm}). Hermes's profiler API is
// pure-virtual on HermesRuntime, not exposed via HermesInternal in modern
// builds, so we route through the bridge.
export const startProfile = (): boolean => {
    throw new Error("STUB");
};

// Stops the profiler and writes the trace to `fileName`, resolved against
// the app's Documents directory. Returns the absolute file path on the
// simulator filesystem, which the host driver pulls out via
// `xcrun simctl get_app_container booted <bundle> data`.
export const stopProfile = (fileName: string): { path?: string; ok: boolean } => {
    throw new Error("STUB");
};

export const BenchmarkType = {
  MOUNT: 'mount',
  UPDATE: 'update',
  UNMOUNT: 'unmount',
} as const;

export type BenchmarkTypeValue = (typeof BenchmarkType)[keyof typeof BenchmarkType];

interface Sample {
  scriptingStart: number;
  scriptingEnd?: number;
}

export interface BenchmarkResult {
  startTime: number;
  endTime: number;
  runTime: number;
  sampleCount: number;
  warmupCount: number;
  samples: Array<{ start: number; end: number; scriptingStart: number; scriptingEnd: number }>;
  max: number;
  min: number;
  median: number;
  mean: number;
  trimmedMean: number; // 5% trimmed each side, robust to GC spikes
  iqr: number;
  stdDev: number;
  meanScripting: number;
}

export interface BenchmarkProps {
  component: React.ComponentType<any>;
  getComponentProps: (info: { cycle: number }) => Record<string, any>;
  onComplete: (result: BenchmarkResult) => void;
  sampleCount?: number;
  /** Override warmup count. Default mirrors `bench-utils.ts`:
   * `min(max(sampleCount / 10, 10), 1000)`. */
  warmupSamples?: number;
  timeout?: number;
  type?: BenchmarkTypeValue;
}

const computeWarmup = (sampleCount: number): number =>
  { throw new Error("STUB"); };

interface State {
  componentProps: Record<string, any>;
  cycle: number;
  running: boolean;
  _lastGetComponentProps: BenchmarkProps['getComponentProps'];
}

const shouldRender = (cycle: number, type: BenchmarkTypeValue) => {
    throw new Error("STUB");
};

const shouldRecord = (cycle: number, type: BenchmarkTypeValue) => {
    throw new Error("STUB");
};

const isDone = (cycle: number, sampleCount: number, type: BenchmarkTypeValue) => {
    throw new Error("STUB");
};

const sortNumbers = (a: number, b: number) => { throw new Error("STUB"); };

export default class Benchmark extends React.Component<BenchmarkProps, State> {
  static displayName = 'Benchmark';
  static defaultProps = {
    sampleCount: 500,
    timeout: 60000,
    type: BenchmarkType.MOUNT,
  };
  static Type = BenchmarkType;

  private _startTime = 0;
  private _samples: Sample[] = [];
  private _raf: number | null = null;

  constructor(props: BenchmarkProps) {
      throw new Error("STUB");
  }

  static getDerivedStateFromProps(
    nextProps: BenchmarkProps,
    prevState: State
  ): Partial<State> | null {
      throw new Error("STUB");
  }

  componentDidUpdate(_prevProps: BenchmarkProps, prevState: State) {
      throw new Error("STUB");
  }

  componentWillUnmount() {
      throw new Error("STUB");
  }

  stop() {
    if (this._raf !== null) {
      cancelAnimationFrame(this._raf);
      this._raf = null;
    }
    this._samples = [];
    this.setState({ running: false, cycle: 0 });
  }

  start() {
    this._samples = [];
    this.setState({ running: true, cycle: 0 });
  }

  render() {
      throw new Error("STUB");
  }

  private _handleCycleComplete() {
      throw new Error("STUB");
  }

  private _handleComplete(endTime: number) {
      throw new Error("STUB");
  }
}
