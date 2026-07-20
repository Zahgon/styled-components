import { Dict } from '../../../types';
import { splitTopLevelCommas } from '../../../parser/parser';
import { maybeExpandBackgroundImageSystemColors } from '../backgroundGradientNative';
import { warnOnce } from '../dev';
import {
  collapseIdenticalCommas,
  isMultiTokenPosition,
  isValidLayeredBackgroundValue,
  normalizeBackgroundPositionValue,
  substituteBackgroundSizeKeywordsForNative,
} from '../passthrough';
import { consumeColor, cssColorRawToRnStyleValue } from '../shorthandHelpers';
import { tokenize } from '../tokenize';
import { Token, TokenKind } from '../tokens';
import { TokenStream } from '../tokenStream';

/**
 * `background` shorthand. Sets all eight background longhands; comma-separated
 * layers, only the final layer may carry `background-color`; position and size
 * split by `/`. RN 0.85 has no surface for `background-attachment / origin / clip`
 * so non-surface declarations on native warn; rn-web passes everything through.
 */

const POSITION_KEYWORDS = new Set(['top', 'right', 'bottom', 'left', 'center']);
const SIZE_KEYWORDS = new Set(['cover', 'contain', 'auto']);
// `<repeat-style>`: `repeat-x | repeat-y | [repeat | space | round | no-repeat]{1,2}`.
// `repeat-x` / `repeat-y` only appear standalone; the other four can appear in pairs.
const SINGLE_REPEAT_KEYWORDS = new Set(['repeat-x', 'repeat-y']);
const TWO_VALUE_REPEAT_KEYWORDS = new Set(['repeat', 'no-repeat', 'space', 'round']);
const ATTACHMENT_KEYWORDS = new Set(['scroll', 'fixed', 'local']);
const BOX_KEYWORDS = new Set(['content-box', 'padding-box', 'border-box']);
const NONE_IDENT = 'none';

/**
 * Warn once when a conic (or repeating-conic) gradient layer is present on
 * native. RN's gradient support covers linear and radial only; conic layers
 * silently render nothing on iOS and Android. The layer still renders on
 * the web (rn-web) and on the server, so emission is left untouched; the
 * warning makes the native gap visible in dev. dedupeSuffix is the raw
 * value so distinct gradients each warn once.
 */
export function warnIfConicGradientNative(value: string): void {
  if (!__DEV__) return;
  if (__NATIVE_WEB__) return;
  if (value.indexOf('conic-gradient(') === -1) return;
  warnOnce(
    'native-conic-gradient-unsupported',
    '`' +
      value +
      '` does not render on iOS or Android; React Native gradients cover `linear-gradient()` and `radial-gradient()` only. Use a radial or linear gradient, or a prebaked image, for native. The conic gradient still renders on the web.',
    value
  );
}

interface ParsedLayer {
  image: string | null;
  position: string | null;
  size: string | null;
  repeat: string | null;
  attachment: string | null;
  origin: string | null;
  clip: string | null;
  color: string | null;
}

function emptyLayer(): ParsedLayer {
    throw new Error("STUB");
}

function isLengthLike(t: Token): boolean {
    throw new Error("STUB");
}

function isPositionToken(t: Token): boolean {
    throw new Error("STUB");
}

function isSizeToken(t: Token): boolean {
    throw new Error("STUB");
}

function parseLayer(layerSrc: string, isFinal: boolean): ParsedLayer | null {
    throw new Error("STUB");
}

export function backgroundShorthand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

function rawBackgroundLonghand(tokens: Token[]): string | null {
    throw new Error("STUB");
}

function everyIdentInSet(tokens: Token[], values: ReadonlySet<string>): boolean {
    throw new Error("STUB");
}

function everyIdentIs(tokens: Token[], value: string): boolean {
    throw new Error("STUB");
}

export function backgroundAttachmentLonghand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

export function backgroundOriginLonghand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

export function backgroundClipLonghand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}
