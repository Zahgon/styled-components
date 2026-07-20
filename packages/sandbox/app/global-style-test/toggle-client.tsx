'use client';

import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

const BodyLockStyles = createGlobalStyle`
  body {
    overflow: hidden !important;
    outline: 6px solid #dc2626 !important;
    outline-offset: -6px;
  }
`;

type Phase = 'idle' | 'mounting' | 'mounted' | 'unmounting' | 'unmounted' | 'done';

interface CheckResult {
  label: string;
  pass: boolean;
}

const PHASE_LABELS: Record<Phase, string> = {
  idle: 'Waiting to start...',
  mounting: 'Mounting conditional global style...',
  mounted: 'Verifying: outline + scroll lock applied',
  unmounting: 'Unmounting conditional global style...',
  unmounted: 'Verifying: outline + scroll lock removed',
  done: 'Complete',
};

const PHASE_COLORS: Record<Phase, string> = {
  idle: '#6b7280',
  mounting: '#0070f3',
  mounted: '#dc2626',
  unmounting: '#d97706',
  unmounted: '#0070f3',
  done: '#16a34a',
};

export default function ToggleClient() {
    throw new Error("STUB");
}

const Card = styled.div`
  background: var(--sc-colors-surface, #f9fafb);
  border-radius: 10px;
  padding: 24px;
  border: 1px solid var(--sc-colors-border, #e5e7eb);
  margin-bottom: 24px;
`;

const Heading = styled.h2`
  font-size: 18px;
  margin-bottom: 16px;
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`;

const PhaseBar = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  color: ${p => { throw new Error("STUB"); }};
  background: ${p => { throw new Error("STUB"); }}12;
  border: 1px solid ${p => { throw new Error("STUB"); }}30;
  margin-bottom: 16px;
`;

const PhaseDot = styled.span<{ $color: string; $animate: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${p => { throw new Error("STUB"); }};
  animation: ${p => { throw new Error("STUB"); }} 0.8s ease-in-out infinite;
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const ResultsBox = styled.div<{ $allPass: boolean }>`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid
    ${p =>
      { throw new Error("STUB"); }}40;
  background: ${p =>
    { throw new Error("STUB"); }}08;
  animation: ${fadeIn} 0.3s ease-in;
`;

const ResultTitle = styled.p`
  font-weight: 700;
  font-size: 13px;
  margin-bottom: 8px;
  color: var(--sc-colors-text, #111827);
`;

const ResultRow = styled.div`
  font-size: 12px;
  color: var(--sc-colors-textMuted, #6b7280);
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ResultIcon = styled.span<{ $pass: boolean }>`
  color: ${p =>
    { throw new Error("STUB"); }};
  font-weight: 700;
`;
