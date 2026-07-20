'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

type Props = {
  /** Expected count for the pass state. */
  expected: number;
  /** Short noun describing what is being counted (rendered after the count). */
  unit: React.ReactNode;
  /** Optional tooltip text exposed via the `title` attribute. */
  title?: string;
} & (
  | {
      /** RSC path: count `<style data-styled-global="<tagId>">` elements. */
      tagId: string;
      ruleNeedle?: never;
    }
  | {
      /** Client path: count rules in styled-components CSSOM sheets containing `ruleNeedle`. */
      ruleNeedle: string;
      tagId?: never;
    }
);

/**
 * Live count vs expected, rendered as a green/red pill.
 * Counting strategy is inferred from which discriminator prop is supplied:
 *   tagId - RSC injection path (DOM-tag-tagged with the global id)
 *   ruleNeedle - Client/CSSOM injection path (substring match in cssRules)
 *
 * Both strategies take strings so the component stays usable from RSC pages
 * (function props can't cross the server→client boundary).
 */
export function DedupCountBadge(props: Props) {
    throw new Error("STUB");
}

/**
 * Counts how many CSSOM rules in styled-components-managed sheets contain
 * `needle` in their cssText. The client path injects rules via `insertRule`
 * into a single shared `<style data-styled>` tag (CSSOM), so the dedup
 * invariant is "needle appears once across all sc sheets," not "one tag
 * carries this id."
 */
function countSheetRuleOccurrences(needle: string): number {
    throw new Error("STUB");
}

const Badge = styled.div<{ $ok: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  background: ${p => { throw new Error("STUB"); }};
  color: ${p => { throw new Error("STUB"); }};
  border: 1px solid ${p => { throw new Error("STUB"); }};
  font-family: monospace;
`;
