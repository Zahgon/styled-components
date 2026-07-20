import { Dict } from '../../../types';
import { warnOnce } from '../dev';
import { isGenericFamily, resolveGenericFamily } from '../polyfills/genericFamily';
import { buildResolver } from '../polyfills/resolvers';
import { tokenToValue, withoutSlashes } from '../shorthandHelpers';
import { Token, TokenKind } from '../tokens';
import { TokenStream } from '../tokenStream';
import { ABSOLUTE_LENGTH_PX_PER_UNIT } from '../units';

const FONT_STYLES = new Set(['italic', 'oblique']);
const FONT_WEIGHTS = new Set([
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  'bold',
  'bolder',
  'lighter',
  'normal',
]);
const FONT_VARIANTS = new Set(['small-caps']);

const FONT_WIDTH_KEYWORDS = new Set([
  'ultra-condensed',
  'extra-condensed',
  'condensed',
  'semi-condensed',
  'semi-expanded',
  'expanded',
  'extra-expanded',
  'ultra-expanded',
]);
const ABSOLUTE_SIZE_PX: Record<string, number> = {
  'xx-small': 9,
  'x-small': 10,
  small: 13,
  medium: 16,
  large: 18,
  'x-large': 24,
  'xx-large': 32,
  'xxx-large': 48,
};
const RELATIVE_SIZE_SENTINELS: Record<string, string> = {
  larger: '\0+',
  smaller: '\0-',
};
const SYSTEM_FONT_KEYWORDS = new Set([
  'caption',
  'icon',
  'menu',
  'message-box',
  'small-caption',
  'status-bar',
]);

function warnFontUnsupported(reason: 'width' | 'relative' | 'system', value: string): void {
    throw new Error("STUB");
}

function rawTokens(tokens: Token[]): string {
    throw new Error("STUB");
}

/** `font: [<style>] [<weight>] [<variant>] <size>[/<line-height>] <family>`. */
export function fontShorthand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

/**
 * `font-family: <family-name>+, …`. RN's `fontFamily` is a single string, so
 * comma-separated fallback lists collapse to the first family with a one-time
 * warn. Generic keywords (`serif`, `system-ui`, etc.) resolve to a platform
 * face on native; rn-web passes the full list through.
 */
export function fontFamilyShorthand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

/**
 * `font-style: normal | italic | oblique [ <angle [-90deg,90deg]> | left | right ]?`.
 * RN's fontStyle only accepts `normal | italic`, so `oblique` (and its angle /
 * direction arguments) collapses to `italic` on native with a dev warn naming
 * the dropped argument. rn-web passes the declaration through. Out-of-range
 * angles are rejected on both branches.
 */
const OBLIQUE_DIRECTION = new Set(['left', 'right']);

export function fontStyleHandler(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

/** Convert an Angle token's value into degrees regardless of source unit. */
function degreesOf(t: Token): number | null {
    throw new Error("STUB");
}

/**
 * Length-token fold shared by `line-height` / `letter-spacing` /
 * `font-size`: px / unitless pass through as-is, other absolute units
 * fold via the shared §5.2 ratio table, and everything else (em / rem /
 * lh / rlh / viewport / container) defers to `buildResolver` so parser
 * acceptance tracks resolver coverage automatically.
 */
type LengthFold =
  | { kind: 'value'; value: number }
  | { kind: 'resolver'; raw: string }
  | { kind: 'unsupported' };

function foldLengthToken(t: Token): LengthFold {
    throw new Error("STUB");
}

/**
 * `line-height` handler. Numeric multipliers and px resolve at compile
 * time; absolute lengths fold via §5.2 ratios; everything else delegates
 * to buildResolver so coverage tracks the resolver automatically. rn-web
 * defers to the browser.
 */
export function lineHeightHandler(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

/**
 * `letter-spacing` handler. Numeric and px values resolve at compile time;
 * absolute lengths fold via §5.2 ratios; everything else delegates to
 * buildResolver. rn-web defers to the browser.
 */
export function letterSpacingHandler(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

/**
 * Standalone `font-size` handler. Routes through the same sentinels the
 * `font:` shorthand emits so the cascade resolver can fold relative-size
 * keywords and percentages at render time.
 */
export function fontSizeHandler(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

/** `font-variant: <ident>+`. RN keeps the array form. */
export function fontVariantShorthand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

/**
 * `aspect-ratio: auto || <ratio>`. `auto` alone yields `'auto'`. A ratio
 * (combined with `auto` or not) emits the number: non-replaced boxes use
 * the specified ratio per spec, and RN exposes no natural-ratio surface
 * so the same value applies to image-like components too (that replaced
 * case is the one documented deviation). A degenerate ratio (a zero
 * component) behaves as `auto` rather than failing the declaration.
 */
export function aspectRatioShorthand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

interface FontFamilyName {
  name: string;
  quoted: boolean;
}

function readFontFamily(stream: TokenStream): FontFamilyName | null {
    throw new Error("STUB");
}
