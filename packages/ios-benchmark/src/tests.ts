import { BenchmarkType, type BenchmarkTypeValue } from './app/Benchmark';
import Tree from './cases/Tree';
import TreeStatic from './cases/TreeStatic';
import ParentRerender from './cases/ParentRerender';
import ParentRerenderStatic from './cases/ParentRerenderStatic';
import type { BenchComponents } from './cases/types';

export interface BenchCase {
  Component: React.ComponentType<any>;
  type: BenchmarkTypeValue;
  sampleCount: number;
  timeout?: number;
  getComponentProps: (info: { cycle: number }, components: BenchComponents) => Record<string, any>;
}

// Sample counts match the web bench (`packages/benchmarks/src/index.js`) target
// of 500. First 20 samples per run are dropped as warmup (JIT/IC stabilization,
// dispatch table fill, first-mount allocation cost). Mount cases are slower
// per sample than rerender cases on iOS sim so their runs take longer; case
// timeouts are sized accordingly.
const cases: Record<string, BenchCase> = {
  'Mount deep tree': {
    Component: Tree,
    type: BenchmarkType.MOUNT,
    sampleCount: 500,
    timeout: 240000, // 4 min @ ~460ms/sample
    getComponentProps: ({ cycle }, components) => { throw new Error("STUB"); },
  },
  'Mount wide tree': {
    Component: Tree,
    type: BenchmarkType.MOUNT,
    sampleCount: 500,
    timeout: 200000, // ~3.3 min
    getComponentProps: ({ cycle }, components) => { throw new Error("STUB"); },
  },
  'Parent rerender (200 children)': {
    Component: ParentRerender,
    type: BenchmarkType.UPDATE,
    sampleCount: 500,
    timeout: 60000,
    getComponentProps: ({ cycle }, components) => { throw new Error("STUB"); },
  },
  'Parent rerender (1000 children)': {
    Component: ParentRerender,
    type: BenchmarkType.UPDATE,
    sampleCount: 500,
    timeout: 90000,
    getComponentProps: ({ cycle }, components) => { throw new Error("STUB"); },
  },
  'Static parent rerender (1000 children)': {
    Component: ParentRerenderStatic,
    type: BenchmarkType.UPDATE,
    sampleCount: 500,
    timeout: 90000,
    getComponentProps: ({ cycle }, components) => { throw new Error("STUB"); },
  },
  'Static mount deep tree': {
    Component: TreeStatic,
    type: BenchmarkType.MOUNT,
    sampleCount: 500,
    timeout: 240000,
    getComponentProps: (_info, components) => { throw new Error("STUB"); },
  },
};

export default cases;
