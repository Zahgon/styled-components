import { Dict } from '../../../types';
import { warnOnce } from '../dev';
import { register } from '../shorthands';
import { Token, TokenKind } from '../tokens';
import { tokenizeFunctionArgs } from '../tokenize';

/**
 * Minimal `display: grid` subset for React Native.
 *
 * The supported subset is fixed equal columns: `grid-template-columns:
 * repeat(N, 1fr)` or an explicit all-`1fr` track list, plus `gap` /
 * `row-gap` / `column-gap` and `grid-column: span N` on items. The
 * `display: grid` declaration itself is intercepted in `transformDecl`
 * (it maps to a wrapping flex row, not a registered shorthand). These
 * handlers cover the track list, item placement, and auto-flow.
 *
 * Each handler emits a native-only sentinel (`__scGridColumns` /
 * `__scGridSpan`) that `compileNative` lifts into `gridInfo` / `gridSpan`
 * and removes from the style object. On rn-web the browser ships grid, so
 * every handler passes the raw value straight through and never warns.
 *
 * The handlers return `{}` (parsed, emit nothing) rather than `null` when
 * a value is outside the subset, so the generic `native-shorthand-parse`
 * warning does not also fire; the grid-specific warning below names the
 * supported alternative instead.
 */

const GRID_TEMPLATE_SUPPORTED =
  '`grid-template-columns: repeat(N, 1fr)` or an equal `1fr` track list (e.g. `1fr 1fr 1fr`). Fixed px tracks, `minmax()`, `auto`, `auto-fill` / `auto-fit`, and unequal `fr` factors are not supported on React Native; size with `flex` on the children, or render on the web where the browser lays out the grid.';

/**
 * Count the equal `1fr` columns described by a track list. Returns the
 * column count for `repeat(<int>, 1fr)` or N consecutive `1fr` tokens,
 * and `null` for anything else (px, minmax, auto, auto-fill / auto-fit,
 * unequal fr factors).
 */
function countEqualFrColumns(tokens: Token[]): number | null {
    throw new Error("STUB");
}

function isOneFr(tok: Token): boolean {
    throw new Error("STUB");
}

function gridTemplateColumnsHandler(tokens: Token[], rawValue: string): Dict<any> | null {
    throw new Error("STUB");
}

function gridColumnHandler(tokens: Token[], rawValue: string): Dict<any> | null {
    throw new Error("STUB");
}

function gridPlacementUnsupportedHandler(
  rawValue: string,
  camelKey: string,
  cssName: string
): Dict<any> | null {
  if (__NATIVE_WEB__) return { [camelKey]: rawValue };
  if (__DEV__) {
    warnOnce(
      'native-grid-placement-unsupported',
      `the \`${cssName}\` property is not supported on React Native. Place grid items with \`grid-column: span N\` (integer N >= 1) instead. The declaration was ignored.`,
      `${cssName}:${rawValue}`
    );
  }
  return {};
}

function gridAutoFlowHandler(tokens: Token[], rawValue: string): Dict<any> | null {
    throw new Error("STUB");
}

// `grid-row` and `grid-area` share the placement-unsupported handler;
// the prop names are bound here so the warning and the rn-web passthrough
// key name the right property.
register('gridTemplateColumns', gridTemplateColumnsHandler);
register('gridColumn', gridColumnHandler);
register('gridRow', (_tokens, rawValue) =>
  { throw new Error("STUB"); }
);
register('gridArea', (_tokens, rawValue) =>
  { throw new Error("STUB"); }
);
register('gridAutoFlow', gridAutoFlowHandler);
