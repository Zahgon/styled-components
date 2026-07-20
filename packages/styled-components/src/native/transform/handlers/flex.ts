import { Dict } from '../../../types';
import { warnOnce } from '../dev';
import { tokenToValue, withoutSlashes } from '../shorthandHelpers';
import { Token, TokenKind } from '../tokens';
import { TokenStream } from '../tokenStream';

const FLEX_WRAP = new Set(['nowrap', 'wrap', 'wrap-reverse']);
const FLEX_DIRECTION = new Set(['row', 'row-reverse', 'column', 'column-reverse']);

/**
 * `flex: none | auto | <grow> [<shrink>] [<basis>]`
 * Matches the CSS spec short-circuits: `none` → 0/0/auto, `auto` → 1/1/auto.
 */
export function flexShorthand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

/** `flex-flow: <direction> || <wrap>`; order-agnostic, either/both. */
export function flexFlowShorthand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

const ALIGN_CONTENT = new Set([
  'flex-start',
  'flex-end',
  'center',
  'start',
  'end',
  'stretch',
  'space-between',
  'space-around',
  'space-evenly',
]);
const JUSTIFY_CONTENT = new Set([
  'flex-start',
  'flex-end',
  'center',
  'start',
  'end',
  'space-between',
  'space-around',
  'space-evenly',
]);
const CONTENT_POSITION_NORMALIZE: Record<string, string> = {
  start: 'flex-start',
  end: 'flex-end',
};

function joinRaw(tokens: Token[]): string {
    throw new Error("STUB");
}

/**
 * `place-content: <align-content> <justify-content>?`. Normalizes
 * start/end to the flex- forms on native; rn-web passes the raw
 * declaration through so the browser sees the full CSS grammar.
 */
export function placeContentShorthand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

/**
 * Keyword set for `align-items` / `justify-items` / `align-self` / `justify-self`.
 * Authors writing `start` / `end` / `self-start` / `self-end` get normalized to
 * RN's flex-prefixed enum since Yoga and rn-web both accept only those forms
 * (see `knowledge_rnweb_alignment_enum.md`). `first baseline` / `last baseline`
 * collapse to `baseline` (with a dev warn); `safe` / `unsafe` overflow prefixes
 * are stripped (with a dev warn).
 */
const SELF_POSITION_NORMALIZE: Record<string, string> = {
  start: 'flex-start',
  end: 'flex-end',
  'self-start': 'flex-start',
  'self-end': 'flex-end',
};

const ITEMS_SELF_KEYWORDS = new Set([
  'normal',
  'stretch',
  'center',
  'start',
  'end',
  'flex-start',
  'flex-end',
  'self-start',
  'self-end',
  'baseline',
]);

const OVERFLOW_POSITION = new Set(['safe', 'unsafe']);
const BASELINE_QUALIFIER = new Set(['first', 'last']);

function readAlignKeyword(stream: TokenStream, allowed: ReadonlySet<string>): string | null {
    throw new Error("STUB");
}

function readItemsKeyword(stream: TokenStream): string | null {
    throw new Error("STUB");
}

/**
 * `place-items: <'align-items'> <'justify-items'>?`. First value is align-items,
 * second (or repeated first) is justify-items. `justify-items` is a no-op under
 * Yoga.
 */
export function placeItemsShorthand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

/**
 * `place-self: <'align-self'> <'justify-self'>?`. Same expansion as `place-items`,
 * plus `auto` since both longhands default to `auto`.
 */
const SELF_KEYWORDS_WITH_AUTO = new Set([...ITEMS_SELF_KEYWORDS, 'auto']);

function readSelfKeyword(stream: TokenStream): string | null {
    throw new Error("STUB");
}

export function placeSelfShorthand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}
