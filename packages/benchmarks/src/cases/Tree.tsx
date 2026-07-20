import React from 'react';
import { BenchmarkType } from '../app/Benchmark';

interface IBox {
  color?: number;
  layout?: 'column' | 'row';
  outer?: boolean;
  fixed?: boolean;
}

interface ITree {
  breadth: number;
  components: {
    Box: React.FC<IBox>;
  };
  depth: number;
  id: number;
  wrap: number;
}

export default function Tree({ breadth, components, depth, id, wrap }: ITree) {
    throw new Error("STUB");
}

Tree.displayName = 'Tree';
Tree.benchmarkType = BenchmarkType.MOUNT;
