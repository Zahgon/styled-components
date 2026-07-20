'use client';

import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { runCheck, type TestCheck } from './auto-test';

/**
 * Compact summary at the top of a test page showing overall pass/fail.
 */
export function TestSummary({ suites }: { suites: { name: string; checks: TestCheck[] }[] }) {
    throw new Error("STUB");
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Bar = styled.p<{ $pass: boolean }>`
  margin: 24px 0;
  font-size: 13px;
  font-weight: 700;
  color: ${p =>
    { throw new Error("STUB"); }};
  animation: ${fadeIn} 0.3s ease-in;
`;
