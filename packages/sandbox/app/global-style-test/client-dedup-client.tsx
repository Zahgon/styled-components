'use client';

import styled, { createGlobalStyle } from 'styled-components';
import { DedupCountBadge } from '../components/dedup-count-badge';

const NEEDLE = '[data-client-dedup-marker]';

const ClientDedupGlobalStyle = createGlobalStyle`
  ${NEEDLE} {
    outline: 3px dotted #0070f3 !important;
    outline-offset: 2px;
  }
`;

export function ClientDedupSection() {
    throw new Error("STUB");
}

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

const Marker = styled.div`
  align-self: stretch;
  padding: 16px;
  border: 2px solid var(--sc-colors-border, #e5e7eb);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--sc-colors-text, #111827);
  background: var(--sc-colors-surface, #f9fafb);
`;
