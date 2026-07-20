import type { Dict } from '../../types';
import { tokenizeFunctionArgs } from '../transform/tokenize';
import type { Token } from '../transform/tokens';
import { TokenKind } from '../transform/tokens';
import type {
  EasingDescriptor,
  AnimationDescriptor,
  AnimationTimeline,
  RangeBoundary,
  TimelineAxis,
  TransitionDescriptor,
} from './types';
import { AUTO_TIMELINE } from './types';
import { DEFAULT_EASING, parseEasing } from './css-keywords';
import { parseRangeBoundary } from './range';

const DIRECTION_KEYWORDS = new Set(['normal', 'reverse', 'alternate', 'alternate-reverse']);
const FILL_MODE_KEYWORDS = new Set(['none', 'forwards', 'backwards', 'both']);
const PLAY_STATE_KEYWORDS = new Set(['running', 'paused']);
const COMPOSITION_KEYWORDS = new Set(['replace', 'add', 'accumulate']);
const TIMING_KEYWORDS = new Set([
  'linear',
  'ease',
  'ease-in',
  'ease-out',
  'ease-in-out',
  'step-start',
  'step-end',
]);
const TRANSITION_BEHAVIOR_KEYWORDS = new Set(['normal', 'allow-discrete']);

function isCommaToken(t: Token): boolean {
  return t.kind === TokenKind.Comma;
}

/** Split tokens at top-level commas. Skips function-arg interiors (already grouped). */
function splitTopLevelCommas(tokens: Token[]): Token[][] {
  const out: Token[][] = [];
  let cur: Token[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (isCommaToken(t)) {
      if (cur.length > 0) {
        out.push(cur);
        cur = [];
      }
    } else {
      cur.push(t);
    }
  }
  if (cur.length > 0) out.push(cur);
  return out;
}

function isTimeToken(t: Token): boolean {
    throw new Error("STUB");
}

function isEasingToken(t: Token): boolean {
    throw new Error("STUB");
}

function tokenToEasing(t: Token): EasingDescriptor | null {
    throw new Error("STUB");
}

function tokenToMs(t: Token): number | null {
    throw new Error("STUB");
}

/**
 * Parse a single `<single-animation>` token sequence into a partial
 * AnimationDescriptor. First `<time>` is duration, second is delay; keywords
 * valid for non-name longhands take precedence over name. Caller fills defaults.
 */
function parseSingleAnimation(tokens: Token[]): Partial<AnimationDescriptor> | null {
    throw new Error("STUB");
}

const DEFAULT_ANIMATION: AnimationDescriptor = {
  name: 'none',
  durationMs: 0,
  timingFunction: DEFAULT_EASING,
  delayMs: 0,
  iterationCount: 1,
  direction: 'normal',
  fillMode: 'none',
  playState: 'running',
  composition: 'replace',
  rangeStart: 'normal',
  rangeEnd: 'normal',
  timeline: AUTO_TIMELINE,
};

/**
 * `animation` shorthand handler. Parses one or more `<single-animation>`
 * comma-separated entries. Output keys:
 *   - `animationName`: string | string[]
 *   - `animationDuration`: number | number[]   (ms)
 *   - `animationTimingFunction`: EasingDescriptor | EasingDescriptor[]
 *   - `animationDelay`: number | number[]      (ms; can be negative)
 *   - `animationIterationCount`: number | number[]  (Infinity for `infinite`)
 *   - `animationDirection`: string | string[]
 *   - `animationFillMode`: string | string[]
 *   - `animationPlayState`: string | string[]
 *
 * Single-animation form emits primitives; multi-animation form emits
 * arrays. The render path branches on `Array.isArray()`.
 */
export function animationShorthand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

/**
 * Per-longhand mapping: `[outputKey, descriptorField]`. Drives the
 * generic `shorthand` materializer below; the descriptor's defaults
 * fill any missing fields.
 */
const ANIMATION_LONGHAND_MAPPING: ReadonlyArray<[string, keyof AnimationDescriptor]> = [
  ['animationName', 'name'],
  ['animationDuration', 'durationMs'],
  ['animationTimingFunction', 'timingFunction'],
  ['animationDelay', 'delayMs'],
  ['animationIterationCount', 'iterationCount'],
  ['animationDirection', 'direction'],
  ['animationFillMode', 'fillMode'],
  ['animationPlayState', 'playState'],
  // Reset-only sub-properties: `parseSingleAnimation` never sets these,
  // so the materializer always emits the spec initial (`normal`),
  // giving the `animation` shorthand its reset semantics for free.
  ['animationRangeStart', 'rangeStart'],
  ['animationRangeEnd', 'rangeEnd'],
  // Settable via the scroll()/view() function forms; otherwise resets
  // to auto like the range properties.
  ['animationTimeline', 'timeline'],
];

/**
 * Generic shorthand materializer: parses each comma group into a
 * partial descriptor, then fans the parsed values out into the longhand
 * keys. Single-group input emits scalar values; multi-group emits
 * arrays. Returns `null` on any unparseable group, or when `validate`
 * (run once over every parsed group) returns `false`.
 */
function shorthand<T>(
  tokens: Token[],
  parseOne: (g: Token[]) => Partial<T> | null,
  mapping: ReadonlyArray<[string, keyof T]>,
  defaults: T,
  validate?: (parsed: Partial<T>[]) => boolean
): Dict<any> | null {
  const groups = splitTopLevelCommas(tokens);
  if (groups.length === 0) return null;
  const parsed: Partial<T>[] = [];
  for (let i = 0; i < groups.length; i++) {
    const single = parseOne(groups[i]);
    if (single === null) return null;
    parsed.push(single);
  }
  if (validate && !validate(parsed)) return null;
  const out: Dict<any> = {};
  const single = parsed.length === 1;
  for (let i = 0; i < mapping.length; i++) {
    const [key, field] = mapping[i];
    if (single) {
      out[key] = parsed[0][field] ?? defaults[field];
    } else {
      const arr = new Array(parsed.length);
      for (let j = 0; j < parsed.length; j++) arr[j] = parsed[j][field] ?? defaults[field];
      out[key] = arr;
    }
  }
  return out;
}

const DEFAULT_TRANSITION: TransitionDescriptor = {
  property: 'all',
  durationMs: 0,
  timingFunction: DEFAULT_EASING,
  delayMs: 0,
  behavior: 'normal',
};

function parseSingleTransition(tokens: Token[]): Partial<TransitionDescriptor> | null {
    throw new Error("STUB");
}

/**
 * `transition` shorthand handler. Parses one or more
 * `<single-transition>` comma-separated entries.
 *
 * Output keys: `transitionProperty | transitionDuration |
 * transitionTimingFunction | transitionDelay | transitionBehavior`.
 */
export function transitionShorthand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

const TRANSITION_LONGHAND_MAPPING: ReadonlyArray<[string, keyof TransitionDescriptor]> = [
  ['transitionProperty', 'property'],
  ['transitionDuration', 'durationMs'],
  ['transitionTimingFunction', 'timingFunction'],
  ['transitionDelay', 'delayMs'],
  ['transitionBehavior', 'behavior'],
];

// Longhand handlers;for users who write the longhand directly
// (e.g. `animation-name: pulse`). Each delegates to the generic
// `listLonghand` with a per-token validator/extractor.

export function animationNameLonghand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

export function animationDurationLonghand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

export function animationDelayLonghand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

export function animationTimingFunctionLonghand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

// Positive `infinity` inside a calc() body maps to JS Infinity for the
// iteration-count slot. The boundary class `[^\w-]` excludes `-`, so
// `-infinity` and `NaN` fall through to the null path.
const CALC_HAS_INFINITY_RE = /(?:^|[^\w-])infinity(?:[^\w-]|$)/i;

function calcToIterationCount(args: string): number | null {
    throw new Error("STUB");
}

export function animationIterationCountLonghand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

export function animationDirectionLonghand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

export function animationFillModeLonghand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

export function animationPlayStateLonghand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

export function animationCompositionLonghand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

const TIMELINE_AXES = new Set(['block', 'inline', 'x', 'y']);
const TIMELINE_SCROLLERS = new Set(['nearest', 'root', 'self']);

/** Custom-property-shaped ident check; dashed idents are case-sensitive. */
function isDashedIdent(t: Token): boolean {
    throw new Error("STUB");
}

/**
 * Parse `scroll( [ <scroller> || <axis> ]? )` / `view( [ <axis> ||
 * <view-timeline-inset> ]? )` into an AnimationTimeline. `||` grammar:
 * each component at most once, any order.
 */
function parseTimelineFunction(t: Token): AnimationTimeline | null {
    throw new Error("STUB");
}

function parseSingleTimelineValue(t: Token): AnimationTimeline | null {
    throw new Error("STUB");
}

export function animationTimelineLonghand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

/**
 * `scroll-timeline-name: [ none | <dashed-ident> ]#`. Emits the raw
 * (case-sensitive) ident, or the string `'none'`.
 */
export function scrollTimelineNameLonghand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

export function scrollTimelineAxisLonghand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

/** `scroll-timeline: [ <'scroll-timeline-name'> <'scroll-timeline-axis'>? ]#` */
export function scrollTimelineShorthand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

/**
 * Parse a comma list of range boundaries for the `animation-range-start`
 * / `-end` longhands. Each comma group must be exactly one boundary
 * (1-2 tokens); any unparseable group invalidates the declaration.
 */
function rangeBoundaryLonghand(tokens: Token[], key: string, isStart: boolean): Dict<any> | null {
    throw new Error("STUB");
}

export function animationRangeStartLonghand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

export function animationRangeEndLonghand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

/**
 * `animation-range` shorthand: `[ <'animation-range-start'>
 * <'animation-range-end'>? ]#`. When the end boundary is omitted, a
 * named start copies its range name with 100%; an unnamed start leaves
 * the end at its initial `normal`.
 */
export function animationRangeShorthand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

export function transitionPropertyLonghand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

export function transitionDurationLonghand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

export function transitionDelayLonghand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

export function transitionTimingFunctionLonghand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

export function transitionBehaviorLonghand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

/**
 * Generic comma-separated longhand parser. Splits at top-level commas,
 * runs `parseOne` on each group's single token, and emits `{[key]:
 * scalar | array}` (scalar when the list has one entry). Any group
 * that's not exactly one token, or whose token doesn't validate,
 * fails the whole declaration.
 */
function listLonghand<T>(
  tokens: Token[],
  key: string,
  parseOne: (t: Token) => T | null
): Dict<any> | null {
    throw new Error("STUB");
}

function enumValidator(valid: Set<string>): (t: Token) => string | null {
  return t => {
      throw new Error("STUB");
  };
}

// Hoisted so each longhand handler reuses one validator closure instead of
// allocating a fresh one per call.
const validateDirection = enumValidator(DIRECTION_KEYWORDS);
const validateFillMode = enumValidator(FILL_MODE_KEYWORDS);
const validatePlayState = enumValidator(PLAY_STATE_KEYWORDS);
const validateComposition = enumValidator(COMPOSITION_KEYWORDS);
const validateTransitionBehavior = enumValidator(TRANSITION_BEHAVIOR_KEYWORDS);

/**
 * Set of camelCase animation+transition longhand keys. Used by the
 * compileNative extraction pass to lift these off the base style object
 * into the dedicated `animation` / `transition` fields.
 */
export const ANIMATION_LONGHAND_KEYS = new Set([
  'animationName',
  'animationDuration',
  'animationTimingFunction',
  'animationDelay',
  'animationIterationCount',
  'animationDirection',
  'animationFillMode',
  'animationPlayState',
  'animationComposition',
  'animationRangeStart',
  'animationRangeEnd',
  'animationTimeline',
]);

/**
 * Scroller-side timeline declaration keys; lifted off the base style
 * into `NativeStyles.scrollTimeline` by compileNative.
 */
export const SCROLL_TIMELINE_KEYS = new Set(['scrollTimelineName', 'scrollTimelineAxis']);

export const TRANSITION_LONGHAND_KEYS = new Set([
  'transitionProperty',
  'transitionDuration',
  'transitionTimingFunction',
  'transitionDelay',
  'transitionBehavior',
]);
