import { Dict } from '../../../types';
import { warnOnce } from '../dev';
import {
  colorTokenToRnStyleValue,
  consumeColor,
  consumeDimensionLike,
  directionalColor,
  tokenToValue,
  withoutSlashes,
} from '../shorthandHelpers';
import { Token, TokenKind } from '../tokens';
import { TokenStream } from '../tokenStream';

const BORDER_COLOR_KEYS = [
  'borderTopColor',
  'borderRightColor',
  'borderBottomColor',
  'borderLeftColor',
] as const;
const RN_BORDER_STYLES = new Set(['solid', 'dotted', 'dashed', 'none']);
const CSS_LINE_STYLES = new Set([
  'none',
  'hidden',
  'dotted',
  'dashed',
  'solid',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset',
]);
const RN_OUTLINE_STYLES = new Set(['solid', 'dotted', 'dashed']);
const WEB_ONLY_OUTLINE_STYLES = new Set(['auto', 'double', 'groove', 'ridge', 'inset', 'outset']);

function warnUnsupportedBorderStyle(name: string): void {
    throw new Error("STUB");
}

function warnMultipleBorderStyles(value: string): void {
    throw new Error("STUB");
}

function normalizeNativeBorderStyle(name: string): Dict<any> | null {
    throw new Error("STUB");
}

/**
 * Consumes an already-matched style token from `stream` and returns its
 * name, or returns `null` (without consuming) when `t` isn't a style
 * token for this shorthand. Shared by `border` and `outline`, which
 * differ only in which style keywords they accept and whether a match
 * warns.
 */
type StyleMatcher = (t: Token, stream: TokenStream) => string | null;

function matchBorderStyle(t: Token, stream: TokenStream): string | null {
    throw new Error("STUB");
}

function matchOutlineStyle(t: Token, stream: TokenStream): string | null {
    throw new Error("STUB");
}

/**
 * Order-agnostic `width || style || color` scan shared by `border` and
 * `outline`. `matchStyle` encapsulates the per-shorthand style keyword
 * set (and any warn side effect on match).
 */
function consumeWidthStyleColor(
  stream: TokenStream,
  matchStyle: StyleMatcher
): { width: Token | null; style: string | null; color: Token | null } | null {
    throw new Error("STUB");
}

/**
 * `border: <width> || <style> || <color>`; order-agnostic composite.
 * v7 fix vs. CSSTN: `border: none` now emits `borderStyle: 'none'`
 * (not `'solid'`), matching web.
 */
export function borderShorthand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

/** `border-color: <color> [<color> [<color> [<color>]]]`. */
export function borderColorShorthand(tokens: Token[]) {
    throw new Error("STUB");
}

/**
 * `outline: <width> || <style> || <color>`. RN 0.85 has the longhands but not
 * the shorthand; outlineStyle on RN is restricted to solid / dotted / dashed.
 * Web-only styles warn and pass through so rn-web honors them.
 */
export function outlineShorthand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

/**
 * `border-style: <style>`; RN only accepts a single style, not per-side.
 * When multiple styles are supplied, we dev-warn and use the first.
 */
export function borderStyleShorthand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

function hasMixedValues(values: string[]): boolean {
    throw new Error("STUB");
}
