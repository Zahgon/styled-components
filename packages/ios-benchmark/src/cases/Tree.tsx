import React from 'react';
import type { BenchComponents } from './types';

interface Props {
  components: BenchComponents;
  breadth: number;
  depth: number;
  id: number;
  wrap: number;
}

export default function Tree({ components, breadth, depth, id, wrap }: Props) {
    throw new Error("STUB");
}

Tree.displayName = 'Tree';
