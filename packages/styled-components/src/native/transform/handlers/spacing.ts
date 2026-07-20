import { Dict } from '../../../types';
import {
  consumeDimensionLike,
  directional,
  tokenToValue,
  withoutSlashes,
} from '../shorthandHelpers';
import { warnOnce } from '../dev';
import { Token, TokenKind } from '../tokens';
import { TokenStream } from '../tokenStream';

// Pre-computed key sets; avoids per-call `prefix + dir + suffix`
// concatenation that showed up as ~6% of cold-compile time.
const MARGIN_KEYS = ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'] as const;
const PADDING_KEYS = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'] as const;
const BORDER_WIDTH_KEYS = [
  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',
] as const;
const BORDER_RADIUS_KEYS = [
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomRightRadius',
  'borderBottomLeftRadius',
] as const;

export function marginShorthand(tokens: Token[]) {
    throw new Error("STUB");
}

export function paddingShorthand(tokens: Token[]) {
    throw new Error("STUB");
}

/** `border-width: X [Y [Z [W]]]` → four directional widths. */
export function borderWidthShorthand(tokens: Token[]) {
    throw new Error("STUB");
}

/** `border-radius: X [Y [Z [W]]]` (simple form). Slash-separated
 * elliptical radii are browser-only; RN exposes circular corner radii. */
export function borderRadiusShorthand(tokens: Token[]) {
    throw new Error("STUB");
}

/**
 * `gap` handler. RN 0.85 has native `gap` (single value) plus separate `rowGap`
 * / `columnGap`; the two-value shorthand splits accordingly.
 */
export function gapShorthand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

function rawTokens(tokens: Token[]): string {
    throw new Error("STUB");
}

function collapseCircularSlashRadius(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

function expandRadiusValues(values: Token[]): [Token, Token, Token, Token] {
    throw new Error("STUB");
}

function isRadiusValue(t: Token): boolean {
    throw new Error("STUB");
}
