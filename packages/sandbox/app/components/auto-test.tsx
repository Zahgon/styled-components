'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

export interface TestCheck {
  /** Readable label for the check */
  label: string;
  /** CSS selector or data-testid to find the element */
  ref: string;
  /** Type of check to perform */
  type: 'style' | 'style-not' | 'element' | 'attr' | 'attr-absent' | 'count' | 'exists';
  /** CSS property name (for style checks) or attribute name (for attr checks) */
  prop?: string;
  /** Expected value - for style checks, compared case-insensitively; for element checks, compared against tagName */
  expected?: string;
  /** CSS var name (e.g. '--sc-colors-primary') - resolved at runtime as the expected value */
  expectedVar?: string;
}

interface Result {
  label: string;
  pass: boolean;
  detail: string;
}

function hexToRgb(hex: string): string {
    throw new Error("STUB");
}

export function runCheck(check: TestCheck): Result {
    throw new Error("STUB");
}

/**
 * Inline pass/fail indicator for a test section title.
 * Renders a colored checkmark or X after running checks post-hydration.
 */
export function TestStatus({ checks }: { checks: TestCheck[] }) {
    throw new Error("STUB");
}

const Indicator = styled.span<{ $pass: boolean }>`
  color: ${p => { throw new Error("STUB"); }};
  font-weight: 700;
  margin-left: 8px;
  font-size: 18px;
  cursor: help;
`;
