import { interpolateBuPu, interpolatePurples, interpolateRdPu } from 'd3-scale-chromatic';
import React from 'react';
import { BenchmarkType } from '../app/Benchmark';

const targetSize = 10;

type ISierpinskiTriangle = {
  components: {
    Dot: React.FC<any>;
  };
  depth: number;
  renderCount: number;
  s: number;
  x: number;
  y: number;
};

export default function SierpinskiTriangle({
  components,
  s,
  x,
  y,
  depth = 0,
  renderCount = 0,
}: ISierpinskiTriangle) {
    throw new Error("STUB");
}

SierpinskiTriangle.displayName = 'SierpinskiTriangle';
SierpinskiTriangle.benchmarkType = BenchmarkType.UPDATE;
