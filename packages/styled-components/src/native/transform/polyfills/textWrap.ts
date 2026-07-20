import { Dict } from '../../../types';
import { getReactNativePlatformOS, warnOnce } from '../dev';
import { register } from '../shorthands';
import { Token, TokenKind } from '../tokens';
import { TokenStream } from '../tokenStream';

/**
 * `text-wrap` shorthand. Verified against RN 0.85.2:
 * `numberOfLines` is the nowrap analogue; `textBreakStrategy` (Android
 * API 23+) maps to balance / pretty; iOS has no platform line-breaking
 * control. Both Text props are lifted via SPECIAL_CASE_PROPS.
 */

const MODES = new Set(['wrap', 'nowrap']);
const STYLES = new Set(['auto', 'balance', 'stable', 'pretty']);

function warnIosTextWrapBalancePretty(style: string): void {
    throw new Error("STUB");
}

/**
 * `numberOfLines: 1` + `ellipsizeMode: 'clip'` is the closest
 * approximation RN exposes (the line cannot truly overflow
 * horizontally; we clip instead of ellipsise). Applied silently
 * because the user-observed behavior matches the intent.
 */
function applyTextWrapNowrap(out: Dict<any>): void {
    throw new Error("STUB");
}

/** `balance`/`pretty` map to Android's `textBreakStrategy`; `stable` has no native equivalent. */
function applyTextWrapStyle(out: Dict<any>, style: string | null): void {
    throw new Error("STUB");
}

function textWrapShorthand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

/**
 * `text-wrap-mode: wrap | nowrap`. Initial `wrap`, inherited. The
 * `nowrap` value is mirrored to `numberOfLines: 1` for RN's Text lift.
 */
function textWrapModeLonghand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

/**
 * `text-wrap-style: auto | balance | stable | pretty`. Initial `auto`,
 * inherited. `balance` and `pretty` map to Android's `textBreakStrategy`;
 * iOS has no equivalent (warns once). `stable` has no native equivalent
 * at all (warns once).
 */
function textWrapStyleLonghand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

register('textWrap', textWrapShorthand);
register('textWrapMode', textWrapModeLonghand);
register('textWrapStyle', textWrapStyleLonghand);
