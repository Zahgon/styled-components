'use client';

import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes, useTheme } from 'styled-components';
import { TestStatus, type TestCheck } from '../components/auto-test';
import { TestSummary } from '../components/test-summary';
import { Section, SectionTitle, SectionDesc, HintText } from '../components/test-ui';

const test1Checks: TestCheck[] = [
  { ref: 'variant-card', type: 'exists', label: 'VariantCard renders' },
];

const test2Checks: TestCheck[] = [
  { ref: 'color-text', type: 'exists', label: 'ColorText renders' },
];

const test3Checks: TestCheck[] = [
  {
    ref: 'bouncing-box',
    type: 'style-not',
    prop: 'animation-name',
    expected: 'none',
    label: 'Box has animation',
  },
];

const test4Checks: TestCheck[] = [
  {
    ref: 'disabled-btn',
    type: 'attr',
    prop: 'disabled',
    expected: '',
    label: 'Button is disabled',
  },
];

const test5Checks: TestCheck[] = [
  { ref: 'undefined-as', type: 'element', expected: 'button', label: 'Renders as <button>' },
];

const test6Checks: TestCheck[] = [
  {
    ref: 'truncated-text',
    type: 'style',
    prop: 'text-overflow',
    expected: 'ellipsis',
    label: 'Text truncates',
  },
  {
    ref: 'truncated-text',
    type: 'style',
    prop: 'white-space',
    expected: 'nowrap',
    label: 'No wrap',
  },
];

const test7Checks: TestCheck[] = [
  { ref: 'swatch-primary', type: 'exists', label: 'Primary swatch renders' },
  { ref: 'swatch-success', type: 'exists', label: 'Success swatch renders' },
];

const test8Checks: TestCheck[] = [
  {
    ref: 'chained-input',
    type: 'attr',
    prop: 'data-base',
    expected: 'yes',
    label: 'Base attrs() applied',
  },
  {
    ref: 'chained-input',
    type: 'attr',
    prop: 'data-labeled',
    expected: 'yes',
    label: 'Labeled attrs() applied',
  },
  {
    ref: 'chained-input',
    type: 'attr',
    prop: 'data-validated',
    expected: 'yes',
    label: 'Validated attrs() applied',
  },
  {
    ref: 'chained-input',
    type: 'attr',
    prop: 'aria-invalid',
    expected: 'true',
    label: 'aria-invalid reflects $hasError transient',
  },
  {
    ref: 'chained-input',
    type: 'attr',
    prop: 'type',
    expected: 'text',
    label: 'type=text from base attrs',
  },
];

const test9Checks: TestCheck[] = [
  {
    ref: 'progress-bar-fixed',
    type: 'style',
    prop: 'width',
    expected: '120px',
    label: 'CSS-var transient: width resolves from --progress (60% of 200px)',
  },
];

const clientSuites = [
  { name: '1. Variants', checks: test1Checks },
  { name: '2. Transient', checks: test2Checks },
  { name: '3. Keyframes', checks: test3Checks },
  { name: '4. attrs()', checks: test4Checks },
  { name: '5. undefined as', checks: test5Checks },
  { name: '6. css helper', checks: test6Checks },
  { name: '7. Theme', checks: test7Checks },
  { name: '8. attrs chain', checks: test8Checks },
  { name: '9. CSS-var transient', checks: test9Checks },
];

const VARIANTS = ['default', 'active', 'error'] as const;
type Variant = (typeof VARIANTS)[number];

const COLORS = ['#7c3aed', '#dc2626', '#0070f3', '#16a34a', '#d97706'] as const;

/** Cycles through an array on an interval */
function useCycle<T>(items: readonly T[], ms: number): T {
    throw new Error("STUB");
}

/** Increments on each theme change so swatches flip to a new angle */
function useThemeFlip(): number {
    throw new Error("STUB");
}

export function ClientTestingHarness() {
    throw new Error("STUB");
}

// ---------------------------------------------------------------------------
// Styled components
// ---------------------------------------------------------------------------

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
`;

const Container = styled.div``;

const Title = styled.h1`
  color: ${p => { throw new Error("STUB"); }};
  font-size: 32px;
  margin-bottom: 8px;
  margin-top: 48px;
`;

const Subtitle = styled.p`
  color: ${p => { throw new Error("STUB"); }};
  font-size: 14px;
  margin-bottom: 32px;
`;

const VariantCard = styled.div<{ $variant: Variant }>`
  padding: 24px;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s;

  ${p =>
    { throw new Error("STUB"); }}
`;

const ColorText = styled.p<{ $color: string }>`
  color: ${p => { throw new Error("STUB"); }};
  font-size: 24px;
  font-weight: 700;
  font-family: monospace;
  transition: color 0.3s;
`;

const BouncingBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${p => { throw new Error("STUB"); }};
  animation: ${bounce} 1s ease-in-out infinite;
`;

const DisabledButton = styled.button.attrs({ disabled: true })`
  padding: 10px 20px;
  border: 1px solid ${p => { throw new Error("STUB"); }};
  border-radius: 6px;
  background: ${p => { throw new Error("STUB"); }};
  color: ${p => { throw new Error("STUB"); }};
  font-size: 14px;
  cursor: not-allowed;
  opacity: 0.6;
`;

const UndefinedAsTest = styled.button`
  padding: 10px 20px;
  border: 1px solid ${p => { throw new Error("STUB"); }};
  border-radius: 6px;
  background: ${p => { throw new Error("STUB"); }};
  color: ${p => { throw new Error("STUB"); }};
  font-size: 14px;
  cursor: pointer;
`;

const truncate = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TruncatedText = styled.p`
  ${truncate}
  max-width: 300px;
  font-size: 14px;
  color: ${p => { throw new Error("STUB"); }};
  background: ${p => { throw new Error("STUB"); }};
  border: 1px solid ${p => { throw new Error("STUB"); }};
  border-radius: 8px;
  padding: 16px;
`;

const ThemeSwatches = styled.div`
  display: flex;
  gap: 16px;
`;

/**
 * Swatch colors are intentionally polar opposites between light/dark
 * so the theme reactivity test produces a dramatic, unmistakable shift.
 * These are separate from the main theme colors used by the rest of the UI.
 */
const swatchColors = {
  light: { primary: '#0070f3', accent: '#7c3aed', danger: '#dc2626', success: '#16a34a' },
  dark: { primary: '#f97316', accent: '#eab308', danger: '#06b6d4', success: '#ec4899' },
};

const Swatch = styled.div<{
  $color: 'primary' | 'accent' | 'danger' | 'success';
  $flip: number;
}>`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  background: ${p => { throw new Error("STUB"); }};
  transition:
    background 0.6s,
    transform 0.6s;
  transform: perspective(400px) rotateY(${p => { throw new Error("STUB"); }}deg);

  @media (prefers-color-scheme: dark) {
    background: ${p => { throw new Error("STUB"); }};
  }

  .dark & {
    background: ${p => { throw new Error("STUB"); }};
  }

  .light & {
    background: ${p => { throw new Error("STUB"); }};
  }

  &:nth-child(2) {
    transition-delay: 0.05s;
  }
  &:nth-child(3) {
    transition-delay: 0.1s;
  }
  &:nth-child(4) {
    transition-delay: 0.15s;
  }
`;

// ---------------------------------------------------------------------------
// 8. attrs chaining (function form + transient prop dependency)
// ---------------------------------------------------------------------------

/**
 * Each attrs() layer earns its own visible side of the input via attribute
 * selectors so a missing layer leaves that side gray.
 *   left  = #16a34a   data-base="yes"          (base)
 *   bottom= #2563eb   data-labeled="yes"       (labeled)
 *   right = #d97706   data-validated="yes"     (validated)
 *   top   = #dc2626   aria-invalid="true"      (function-form attrs reading $hasError)
 */
const ChainedBase = styled.input.attrs({
  type: 'text',
  'data-base': 'yes',
})`
  padding: 10px 14px;
  border: 2px solid ${p => { throw new Error("STUB"); }};
  border-radius: 6px;
  font-size: 14px;
  background: ${p => { throw new Error("STUB"); }};
  color: ${p => { throw new Error("STUB"); }};
  width: 320px;
  box-sizing: border-box;

  &[data-base='yes'] {
    border-left: 6px solid #16a34a;
  }
`;

const ChainedLabeled = styled(ChainedBase).attrs({
  autoComplete: 'off',
  spellCheck: false,
  'data-labeled': 'yes',
})`
  letter-spacing: 0.02em;

  &[data-labeled='yes'] {
    border-bottom: 6px solid #2563eb;
  }
`;

const ChainedValidated = styled(ChainedLabeled).attrs<{ $hasError?: boolean }>(p => { throw new Error("STUB"); })`
  &[data-validated='yes'] {
    border-right: 6px solid #d97706;
  }

  &[aria-invalid='true'] {
    border-top: 6px solid #dc2626;
  }
`;

// ---------------------------------------------------------------------------
// 9. CSS custom property driven by transient input
// ---------------------------------------------------------------------------

const ProgressColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ProgressLabel = styled.span`
  font-size: 12px;
  color: ${p => { throw new Error("STUB"); }};
`;

const ProgressTrack = styled.div`
  /* override the BaseStyle border-box reset so 60% of width = 120px exactly */
  box-sizing: content-box;
  width: 200px;
  height: 16px;
  background: ${p => { throw new Error("STUB"); }};
  border: 1px solid ${p => { throw new Error("STUB"); }};
  border-radius: 8px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: var(--progress, 0%);
  background: ${p => { throw new Error("STUB"); }};
  transition: width 0.6s ease;
`;
