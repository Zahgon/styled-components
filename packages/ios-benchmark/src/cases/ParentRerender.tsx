import React from 'react';
import type { BenchComponents } from './types';

interface Props {
  components: BenchComponents;
  count: number;
  childCount: number;
}

export default function ParentRerender({ components, count, childCount }: Props) {
    throw new Error("STUB");
}

ParentRerender.displayName = 'ParentRerender';
