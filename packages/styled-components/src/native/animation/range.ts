import { resolveStaticMathFunction } from '../transform/polyfills/mathFns';
import { tokenize } from '../transform/tokenize';
import type { Token } from '../transform/tokens';
import { TokenKind } from '../transform/tokens';
import { ABSOLUTE_LENGTH_PX_PER_UNIT } from '../transform/units';
import type { RangeBoundary, RangeOffset, TimelineRangeName } from './types';

const TIMELINE_RANGE_NAMES: ReadonlySet<string> = new Set([
  'cover',
  'contain',
  'entry',
  'exit',
  'entry-crossing',
  'exit-crossing',
  'scroll',
]);

function offsetFromToken(rangeName: TimelineRangeName | null, t: Token): RangeOffset | null {
    throw new Error("STUB");
}

function isOffsetToken(t: Token): boolean {
    throw new Error("STUB");
}

/**
 * Parse one range boundary starting at `tokens[i]`:
 *   normal | <length-percentage> | <timeline-range-name> <length-percentage>?
 * A bare range name defaults its offset to 0% (range-start) or 100%
 * (range-end). Returns the boundary plus the next unconsumed index, or
 * `null` when the tokens don't form a boundary.
 */
export function parseRangeBoundary(
  tokens: Token[],
  i: number,
  isStart: boolean
): [RangeBoundary, number] | null {
    throw new Error("STUB");
}

export interface NamedRangeRect {
  startPx: number;
  endPx: number;
}

const PERCENT_IN_CALC_RE = /(-?\d*\.?\d+)%/g;

/**
 * Resolve an attachment-range boundary to a fraction of its timeline.
 *
 * `timelineExtentPx` is the timeline's total scroll distance; `null`
 * while unknown (pre-measurement), which defers any px-bearing boundary.
 * `namedRanges` carries the view-timeline segments when the timeline
 * defines them; boundaries naming a range the timeline lacks resolve to
 * `null` (the engine then treats the animation as inactive, matching the
 * spec's "keyframes attached to points on that named timeline range are
 * ignored" posture for missing ranges).
 */
export function resolveRangeBoundary(
  boundary: RangeBoundary,
  isStart: boolean,
  timelineExtentPx: number | null,
  namedRanges: Partial<Record<TimelineRangeName, NamedRangeRect>> | null
): number | null {
  if (boundary === 'normal') return isStart ? 0 : 1;

  let segStartPx = 0;
  let segLenPx: number | null = timelineExtentPx;
  if (boundary.rangeName !== null) {
    const rect = namedRanges === null ? undefined : namedRanges[boundary.rangeName];
    if (rect === undefined) return null;
    segStartPx = rect.startPx;
    segLenPx = rect.endPx - rect.startPx;
  }

  if (boundary.calcRaw !== null) {
    if (segLenPx === null || timelineExtentPx === null) return null;
    const seg = segLenPx;
    const substituted = boundary.calcRaw.replace(
      PERCENT_IN_CALC_RE,
      (_, n: string) => { throw new Error("STUB"); }
    );
    const tok = tokenize(substituted)[0];
    const folded = tok === undefined ? null : resolveStaticMathFunction(tok);
    if (folded === null || (folded.unit !== 'px' && folded.unit !== '')) return null;
    return (segStartPx + folded.value) / timelineExtentPx;
  }

  if (boundary.unit === '%') {
    if (boundary.rangeName === null) return boundary.value / 100;
    if (segLenPx === null || timelineExtentPx === null || timelineExtentPx === 0) return null;
    return (segStartPx + (boundary.value / 100) * segLenPx) / timelineExtentPx;
  }

  // px offset measured from the segment start.
  if (timelineExtentPx === null || timelineExtentPx === 0) return null;
  return (segStartPx + boundary.value) / timelineExtentPx;
}
