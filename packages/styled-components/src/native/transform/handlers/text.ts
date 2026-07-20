import { Dict } from '../../../types';
import { getReactNativePlatformOS, warnOnce } from '../dev';
import {
  colorTokenToRnStyleValue,
  consumeColor,
  consumeDimensionLike,
  tokenToValue,
  withoutSlashes,
} from '../shorthandHelpers';
import { register } from '../shorthands';
import { Token, TokenKind } from '../tokens';
import { TokenStream } from '../tokenStream';

const DECORATION_LINES = new Set(['none', 'underline', 'line-through', 'overline', 'blink']);
const DECORATION_STYLES = new Set(['solid', 'double', 'dotted', 'dashed', 'wavy']);

/**
 * `text-align` handler. RN's `textAlign` accepts only `auto | left | right |
 * center | justify`. `start` / `match-parent` compile to `'left'` and `end`
 * compiles to `'right'`; RN's platform text engine (Android TextLayoutManager
 * + iOS RCTTextAttributes) re-swaps the visual edge when the inherited
 * paragraph direction is rtl, so pre-flipping here would double-correct and
 * land the text on the wrong edge. `justify-all` degrades to `justify` with a
 * dev warn. rn-web passes the full grammar through.
 */
const TEXT_ALIGN_NATIVE_PASS = new Set(['auto', 'left', 'right', 'center', 'justify']);

export function textAlignHandler(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

// `text-align-all` shares the `text-align` grammar; route through the same
// handler so direction-aware folding and `justify-all` degradation match.
register('textAlignAll', textAlignHandler);

/**
 * `text-decoration: <line> || <style> || <color>` → split into longhands.
 * Supports the dual-line form `underline line-through`, which is stored as
 * a single space-separated value in canonical order (underline first).
 */
export function textDecorationShorthand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

/**
 * `text-decoration-thickness`, `text-underline-offset`, and
 * `text-underline-position` have no React Native surface: RN draws a
 * fixed-position, fixed-weight underline with no control over thickness,
 * vertical offset, or which side of the text it sits on. Each native
 * handler drops the declaration and points at the border-bottom workaround.
 * rn-web passes the authored value straight through to the browser.
 */
function makeUnsupportedTextDecorationLonghand(
  styleKey: 'textDecorationThickness' | 'textUnderlineOffset' | 'textUnderlinePosition',
  cssName: string,
  code: string
): (tokens: Token[]) => Dict<any> | null {
  return (tokens: Token[]): Dict<any> | null => {
      throw new Error("STUB");
  };
}

export const textDecorationThicknessHandler = makeUnsupportedTextDecorationLonghand(
  'textDecorationThickness',
  'text-decoration-thickness',
  'native-text-decoration-thickness-unsupported'
);
export const textUnderlineOffsetHandler = makeUnsupportedTextDecorationLonghand(
  'textUnderlineOffset',
  'text-underline-offset',
  'native-text-underline-offset-unsupported'
);
export const textUnderlinePositionHandler = makeUnsupportedTextDecorationLonghand(
  'textUnderlinePosition',
  'text-underline-position',
  'native-text-underline-position-unsupported'
);

/**
 * `text-decoration-line: <line>{1,4}`. The `none` keyword is exclusive; it
 * can't combine with any other line keyword.
 */
export function textDecorationLineShorthand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

/**
 * `text-shadow: none | <shadow>#`, each layer `<offset-x> <offset-y>
 * [<blur>] [<color>]` (any order relative to the color) → RN's three
 * split longhands. RN renders one shadow, so a comma-separated list keeps
 * the first (topmost) layer and warns. rn-web passes the authored value
 * through raw: the browser ships the full grammar, and react-native-web
 * deprecates the textShadow* longhands in favor of a `textShadow` string.
 */
export function textShadowShorthand(tokens: Token[], rawValue: string): Dict<any> | null {
    throw new Error("STUB");
}

function splitShadowLayers(tokens: Token[]): Token[][] {
    throw new Error("STUB");
}

function isNoneLayer(layer: Token[]): boolean {
    throw new Error("STUB");
}

/** `shadow-offset` / `text-shadow-offset`: `<x> [<y>]` → `{width, height}`. */
export function shadowOffsetShorthand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

export function textShadowOffsetShorthand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

interface ParsedShadow {
  offset: { width: number | string; height: number | string };
  radius: number | string;
  color: unknown;
}

function parseShadow(tokens: Token[]): ParsedShadow | null {
    throw new Error("STUB");
}
