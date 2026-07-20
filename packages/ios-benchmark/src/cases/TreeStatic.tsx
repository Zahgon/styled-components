import React from 'react';
import type { BenchComponents } from './types';

interface Props {
  components: BenchComponents;
  breadth: number;
  depth: number;
}

// Static-CSS variant: every node is `BoxStatic`, exercising the lite render
// path on every mount when SC v7 is in use.
export default function TreeStatic({ components, breadth, depth }: Props) {
    throw new Error("STUB");
}

TreeStatic.displayName = 'TreeStatic';
