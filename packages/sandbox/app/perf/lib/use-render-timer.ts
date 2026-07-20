'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface RenderTiming {
  label: string;
  ms: number;
}

export function useRenderTimer(historySize = 50) {
    throw new Error("STUB");
}

export interface AutoRunState {
  running: boolean;
  remaining: number;
  total: number;
}

export function useAutoRun(action: () => void, autoStart?: number) {
    throw new Error("STUB");
}
