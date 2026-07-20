/**
 * Native-side style polyfills.
 *
 * {@link applyStylePolyfills} runs at the elementProps boundary, just
 * before `React.createElement`. Currently synthesizes the
 * `background-blend-mode` spec on RN native by injecting absolutely-
 * positioned blend layers + `isolation: isolate` on the wrapper.
 *
 * New polyfills should be added as separate functions in this file and
 * chained into {@link applyStylePolyfills}.
 *
 * Each individual polyfill returns the input reference unchanged when
 * no rewrite applies, so cache identity downstream stays intact.
 */

import * as React from 'react';
import { splitTopLevelCommas } from '../parser/parser';

// ──────────────────────────────────────────────────────────────────
//  Platform detection
// ──────────────────────────────────────────────────────────────────

let isWebCached: boolean | null = null;

/**
 * Single source of truth for "are we running under react-native-web?".
 * Cached after first call. Platform.OS doesn't change at runtime.
 */
export function isWebPlatform(): boolean {
  if (isWebCached !== null) return isWebCached;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const rn: { Platform?: { OS?: string } } = require('react-native');
    isWebCached = rn.Platform?.OS === 'web';
  } catch {
    isWebCached = false;
  }
  return isWebCached;
}

/** Test-only: clear the cached platform result. */
export function __resetPlatformCacheForTesting(): void {
    throw new Error("STUB");
}

type RNComponentRefs = {
  View: React.ComponentType<any> | null;
  Image: React.ComponentType<any> | null;
};

let cachedRn: RNComponentRefs | undefined = undefined;

function getRNComponents(): RNComponentRefs {
    throw new Error("STUB");
}

// ──────────────────────────────────────────────────────────────────
//  elementProps polyfills (chained at render boundary)
// ──────────────────────────────────────────────────────────────────

/**
 * Run all native-side polyfills against the resolved element props
 * just before `React.createElement`. Each polyfill returns the input
 * reference unchanged on miss, so the chain is cheap on the hot path.
 */
export function applyStylePolyfills(
  elementProps: Record<string, unknown>
): Record<string, unknown> {
    throw new Error("STUB");
}

// ── background-blend-mode ─────────────────────────────────────────

/**
 * Polyfill `background-blend-mode` on RN native. RN 0.85's
 * `experimental_backgroundImage` paints layered gradients but doesn't
 * composite them with `backgroundColor`. We synthesize the spec
 * (CSS Compositing L1) by injecting absolutely-positioned child Views,
 * one per `background-image` layer, each carrying the matching
 * `mix-blend-mode` value. The wrapper picks up `isolation: isolate` so
 * the blend stays in the element's own group:
 *
 *   "Background layers must blend with each other and with the
 *   element's background color. Background layers must not blend with
 *   the content that is behind the element, instead they must act as
 *   if they are rendered into an isolated group."
 *
 * Spec ordering: the first comma layer is on top. Absolute siblings
 * stack in DOM order, so we iterate the layer list in reverse (last
 * pushed first = bottom; first pushed last = top). Per-layer
 * `background-size`, `-position`, and `-repeat` cycle by index when
 * their comma counts mismatch the layer count, matching CSS shorthand
 * semantics.
 *
 * COLOR-SPACE PIN. Every blend layer (photo, gradient, bgColor backdrop)
 * sets `shouldRasterizeIOS: true`. iOS rasterizes through Core Graphics
 * which is 8-bit sRGB, so the subsequent compositingFilter operates on
 * gamma-encoded byte values, matching browser CSS-spec blend math.
 *
 * No equivalent fix exists on Android: `renderToHardwareTextureAndroid`
 * forces an `RGBA_F16` linear-light HardwareLayer on wide-gamut devices,
 * which is the opposite of what we want. Toggling it doesn't move the
 * needle on color-burn / color-dodge / soft-light, which still blend in
 * the activity's surface color space (linear on Pixel-class devices).
 * Recovering full parity for those modes on Android requires either
 * configuring the activity for `COLOR_MODE_DEFAULT` or rendering through
 * an explicitly-sRGB Skia surface, both outside the polyfill's reach.
 *
 * BACKDROP PLACEMENT. RN's iOS view manager paints `backgroundColor`
 * via a dedicated `_backgroundColorLayer` at zPosition=-1024, which
 * sits outside normal sibling stacking. CALayer.compositingFilter on
 * the blend layers samples the parent's normal compositing buffer, so
 * a negative-zPosition backdrop gets ignored and the blend collapses
 * (color-burn becomes solid red, lighten stays solid bgColor). The
 * polyfill lifts bgColor out of the wrapper into an explicit
 * bottom-most sibling View so it lives in the same stacking order as
 * the blend layers. Android benefits too: the saveLayer offscreen
 * buffer fills with bgColor before drawChild runs the per-child blend.
 */
export function applyBackgroundBlendModePolyfill(
  elementProps: Record<string, unknown>
): Record<string, unknown> {
    throw new Error("STUB");
}

const BG_BLEND_STRIP_KEYS: ReadonlySet<string> = new Set([
  'backgroundImage',
  'experimental_backgroundImage',
  'backgroundSize',
  'experimental_backgroundSize',
  'backgroundPosition',
  'experimental_backgroundPosition',
  'backgroundRepeat',
  'experimental_backgroundRepeat',
  'backgroundBlendMode',
]);

/**
 * Build one absolutely-positioned blend layer. Shared shell for the
 * bgColor backdrop, photo wrappers, and gradient wrappers; the call
 * sites differ only in `extraStyle` and the optional Image child.
 *
 * `blend === null` is the bgColor backdrop case: no mixBlendMode
 * (compositing it would re-blend the bgColor with the wrapper's
 * parent), but raster pinning still applies so the backdrop bitmap
 * lives in the same sRGB-encoded buffer as the overlay layers.
 */
function createBlendLayer(
  View: React.ComponentType<any>,
  key: string,
  blend: string | null,
  extraStyle: Record<string, unknown>,
  child?: React.ReactNode
): React.ReactElement {
    throw new Error("STUB");
}

/**
 * Cycle a layered `background-*` value into the per-layer style at
 * index `i`. Mirrors CSS shorthand semantics: when there are fewer
 * commas than image layers, values cycle by `i % length`. Empty-string
 * values are dropped (no behavioral difference vs. unset).
 */
function applyLayered(
  out: Record<string, unknown>,
  values: string[] | null,
  i: number,
  experimentalKey: string,
  standardKey: string
): void {
    throw new Error("STUB");
}

// ──────────────────────────────────────────────────────────────────
//  Shared helpers
// ──────────────────────────────────────────────────────────────────

/**
 * Flatten array-form style into a plain object (later entries win).
 * Function-form styles (Pressable state callbacks) and primitives are
 * skipped: the polyfill chain doesn't try to evaluate callbacks.
 */
function flatten(style: unknown, out: Record<string, unknown>): void {
    throw new Error("STUB");
}

/**
 * Cheap pre-check that walks arrays without flattening, returning at
 * the first hit. The hot path for components without
 * `backgroundBlendMode` pays roughly one property-existence check.
 */
function hasBackgroundBlendMode(style: unknown): boolean {
    throw new Error("STUB");
}

/**
 * Read a `background-*` value (preferring the `experimental_*` form
 * when both are present) and split it on top-level commas. Returns
 * `null` when the value isn't a string the polyfill can consume.
 */
function readLayered(
  flat: Record<string, unknown>,
  experimentalKey: string,
  standardKey: string
): string[] | null {
    throw new Error("STUB");
}

/**
 * Recognize `url(...)` background layers and extract the URL. Strips
 * surrounding single or double quotes per the CSS Values spec. Returns
 * `null` for anything that isn't a `url()` reference (gradient, color,
 * keyword) so the caller can fall back to the gradient render path.
 */
function parseUrlLayer(image: string): string | null {
    throw new Error("STUB");
}

/**
 * Map a `background-size` keyword to the `Image` `resizeMode` prop.
 * `cover` and `contain` map directly; the percentage / pixel forms,
 * `auto`, and unset all default to `'cover'` (the most common photo-
 * background expectation, matching CSS's `cover` keyword behavior).
 */
function parseResizeMode(size: string | undefined): 'cover' | 'contain' | 'stretch' | 'center' {
    throw new Error("STUB");
}
