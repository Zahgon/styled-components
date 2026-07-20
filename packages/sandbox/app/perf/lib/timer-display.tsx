'use client';

import styled from 'styled-components';
import type { AutoRunState, RenderTiming } from './use-render-timer';

interface TimerDisplayProps {
  timings: RenderTiming[];
  onClear: () => void;
  autoRun?: AutoRunState;
  onAutoStart?: (iterations: number) => void;
  onAutoStop?: () => void;
}

const PRESETS = [5, 10, 25, 50];

export function TimerDisplay({
  timings,
  onClear,
  autoRun,
  onAutoStart,
  onAutoStop,
}: TimerDisplayProps) {
    throw new Error("STUB");
}

const Wrapper = styled.div<{ $idle: boolean; $running: boolean }>`
  position: sticky;
  top: 0;
  z-index: 50;
  background: ${p => { throw new Error("STUB"); }};
  border: 2px solid
    ${p =>
      { throw new Error("STUB"); }};
  border-radius: 8px;
  padding: 6px 12px;
  font-family: ui-monospace, 'SF Mono', monospace;
  font-size: 12px;
  color: ${p => { throw new Error("STUB"); }};
  margin-bottom: 16px;
  backdrop-filter: blur(8px);
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const Label = styled.span`
  color: ${p => { throw new Error("STUB"); }};
`;

const Stat = styled.span`
  color: ${p => { throw new Error("STUB"); }};
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
`;

const Val = styled.span`
  font-weight: 700;
  font-size: 14px;
  color: ${p => { throw new Error("STUB"); }};
  font-variant-numeric: tabular-nums;
  display: inline-block;
  min-width: 7ch;
  text-align: right;
`;

const Sep = styled.div`
  width: 1px;
  height: 14px;
  background: ${p => { throw new Error("STUB"); }};
  flex-shrink: 0;
`;

const Progress = styled.span`
  font-weight: 600;
  color: ${p => { throw new Error("STUB"); }};
  font-variant-numeric: tabular-nums;
`;

const Spacer = styled.div`
  flex: 1;
`;

const Controls = styled.div`
  display: flex;
  gap: 4px;
`;

const Btn = styled.button<{ $danger?: boolean }>`
  background: ${p => { throw new Error("STUB"); }};
  border: 1px solid ${p => { throw new Error("STUB"); }};
  border-radius: 4px;
  color: ${p => { throw new Error("STUB"); }};
  padding: 1px 6px;
  font-size: 11px;
  font-family: ui-monospace, 'SF Mono', monospace;
  cursor: pointer;

  &:hover {
    border-color: ${p => { throw new Error("STUB"); }};
    color: ${p => { throw new Error("STUB"); }};
  }
`;

const Details = styled.details`
  font-size: 11px;
  color: ${p => { throw new Error("STUB"); }};

  & > summary {
    cursor: pointer;
    user-select: none;
  }
`;

const SampleList = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 4px;
`;

const Sample = styled.span<{ $latest: boolean }>`
  color: ${p => { throw new Error("STUB"); }};
  font-weight: ${p => { throw new Error("STUB"); }};
`;
