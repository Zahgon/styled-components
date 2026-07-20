import React from 'react';
import { Dict } from '../types';
import type { ScrollTimelineEntry } from './scrollTimeline';
import type { GestureResponderEvent, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

/**
 * Quiet window after the last scroll-ish event before the rest position
 * is checked. Long enough that a native snap animation (which keeps
 * emitting scroll events) always postpones the check, so the corrector
 * never fights the engine; short enough that a stranded scroller visibly
 * settles right after the finger lifts.
 */
const SETTLE_QUIET_MS = 320;

/** Sub-pixel slack: fractional page widths make offsets land within a
 *  hair of the grid; only visibly off-grid rests get corrected. */
const SETTLE_TOLERANCE = 1;

interface SettleState {
  offX: number;
  offY: number;
  timer: ReturnType<typeof setTimeout> | null;
}

/**
 * Settle guarantee for the `scroll-snap-type: * mandatory` paging lift.
 *
 * RN's Android snap engine leaves holes where the scroller rests between
 * snap positions (device-verified on RN 0.85: touch-down cancels an
 * in-flight snap animation and touch-up without a drag never re-snaps).
 * css-scroll-snap-1 §6.1 requires a mandatory snap container to rest on
 * a snap position whenever there is no active scroll operation, so the
 * styled scroller watches its own rest position and issues an animated
 * scrollTo to the nearest snap point when the engine misses. iOS paging
 * is native and never misses; there the check is a no-op.
 *
 * Viewport, extent, and the host instance come from the scroll-timeline
 * entry: the publisher is always active on a styled scroller, and its
 * composed handlers already maintain those measurements. This hook only
 * shadows the latest contentOffset (the entry stores offsets as
 * Animated.Values, readable from JS only via private API).
 *
 * Snap grid precedence mirrors the engine: user-supplied `snapToOffsets`,
 * then `snapToInterval`, then full-scrollport pages.
 */
export function useSnapSettle(
  active: boolean,
  entry: ScrollTimelineEntry | null,
  elementProps: Dict<any>
): Dict<any> {
    throw new Error("STUB");
}
