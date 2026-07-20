/**
 * Module-level registry of anchor rects for CSS Anchor Positioning.
 * Anchor names are app-global, matching the spec's global-by-default
 * naming; an element declaring `anchor-name: --x` publishes its
 * parent-relative onLayout rect here, and positioned siblings'
 * `anchor()` / `anchor-size()` resolvers read it at render time.
 *
 * Reactivity: rect changes bump a version counter and notify
 * subscribers; components whose CSS uses anchor functions subscribe
 * (useSyncExternalStore) and re-resolve. The version also participates
 * in their render-cache key so a re-render isn't served stale styles.
 */

import React from 'react';

export interface AnchorRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const rects = new Map<string, AnchorRect>();
const listeners = new Set<() => void>();
let version = 0;

function notify(): void {
    throw new Error("STUB");
}

export function setAnchorRect(name: string, rect: AnchorRect): void {
    throw new Error("STUB");
}

export function removeAnchor(name: string): void {
    throw new Error("STUB");
}

export function getAnchorRect(name: string): AnchorRect | undefined {
  return rects.get(name);
}

export function subscribeAnchors(listener: () => void): () => void {
    throw new Error("STUB");
}

export function getAnchorVersion(): number {
    throw new Error("STUB");
}

/** Test-only: clear all anchors without notifying. */
export function resetAnchorsForTest(): void {
    throw new Error("STUB");
}

/**
 * Render-path hook for elements declaring `anchor-name`: composes an
 * onLayout that publishes the parent-relative rect under the name and
 * removes it on unmount or rename. Hook order is unconditional;
 * `name === undefined` is a no-op pass-through.
 */
export function useAnchorNamePublisher(
  name: string | undefined,
  elementProps: Record<string, any>
): Record<string, any> {
    throw new Error("STUB");
}
