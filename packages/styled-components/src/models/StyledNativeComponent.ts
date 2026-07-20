import React, { createElement, Ref } from 'react';
import {
  getRN,
  matchMedia,
  MediaQueryEnv,
  useContainerContext,
  useMediaEnv,
} from '../native/responsive';
import {
  getAnimationAdapter,
  NOOP_ADAPTER,
  type AnimatedStyleInput,
} from '../native/animation/types';
import {
  ContainerContextValue,
  ContainerEntry,
  DEFAULT_CASCADE,
  DEFAULT_NATIVE_STYLE,
  EMPTY_CONTAINER_CTX,
  NativeCascadeValues,
  NativeStyleContext,
  NativeStyleContextValue,
} from '../native/NativeStyleContext';
import {
  DEFAULT_PARENT_CONTEXT,
  EMPTY_SIBLINGS,
  ParentContext,
  ParentContextValue,
  SiblingInfo,
  SiblingsList,
} from '../native/ParentContext';
import {
  getAnchorVersion,
  subscribeAnchors,
  useAnchorNamePublisher,
} from '../native/anchorRegistry';
import { applyStylePolyfills } from '../native/polyfills';
import { useSnapSettle } from '../native/snapSettle';
import { matchSupports } from '../native/supports';
import {
  getAnimatedComponentCached,
  isScrollableTargetName,
  type ScrollTimelineEntry,
  useScrollTimelinePublisher,
  useSnapOffsets,
  useSnapTargetRegistration,
  useStickyPosition,
  useViewTimelineSubject,
} from '../native/scrollTimeline';
import { applyResolvers, ResolveEnv } from '../native/transform/polyfills/resolvers';
import { concatSourceInputs } from '../parser/source';
import type {
  Attrs,
  BaseObject,
  CompiledAst,
  Dict,
  ExecutionContext,
  ExecutionProps,
  INativeStyleConstructor,
  IStyledComponent,
  IStyledComponentFactory,
  IStyledStatics,
  NativeTarget,
  OmitNever,
  RuleSet,
  StyledOptions,
} from '../types';
import determineTheme from '../utils/determineTheme';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../utils/empties';
import { themeValue } from '../utils/themePath';
import { tracePostAttr, type PostAttrsPlan } from '../utils/tracePostAttrs';
import escape from '../utils/escape';
import generateComponentId from '../utils/generateComponentId';
import generateDisplayName from '../utils/generateDisplayName';
import hoist from '../utils/hoist';
import isFunction from '../utils/isFunction';
import { IS_RSC } from '../utils/isRsc';
import isStyledComponent from '../utils/isStyledComponent';
import shallowEqual from '../utils/shallowEqual';
import { warnOnce } from '../utils/warnOnce';
import type {
  NativeStyles,
  ConditionalStyle,
  ConditionalAttr,
  NthSpec,
  PseudoState,
} from './compileNative';
import type { NthOfBranch } from '../parser/ast';
import { applyVarDeferred, hasResponsiveOutput, SPECIAL_CASE_PROPS } from './compileNative';
import { DefaultTheme, ThemeContext } from './ThemeProvider';

let _View: any;
function get3dIsolationView(): any {
    throw new Error("STUB");
}

const hasOwn = Object.prototype.hasOwnProperty;

const HOIST_EXCLUDE = {
  attrs: true,
  nativeStyle: true,
  displayName: true,
  shouldForwardProp: true,
  styledComponentId: true,
  target: true,
} as const;

function resolveContext<Props extends object>(
  theme: DefaultTheme = EMPTY_OBJECT,
  props: Props,
  attrs: Attrs<Props>[]
): ExecutionContext & Props {
    throw new Error("STUB");
}

function hasPostAttrsNative<Props extends object>(attrs: Attrs<Props>[]): boolean {
    throw new Error("STUB");
}

/**
 * Walk the final attrs chain and trace each arity-2 callback against the
 * component's rules. Output is parallel-indexed with the arity-2 entries
 * in iteration order. A `null` slot signals an untraceable callback ;
 * the render path invokes the original function for that slot.
 */
function buildPostAttrsPlans<Props extends object>(
  attrs: Attrs<Props>[],
  rules: RuleSet<Props>
): ReadonlyArray<PostAttrsPlan | null> {
    throw new Error("STUB");
}

/** Merge an arity-2 attr's result bag (plan output OR runtime return) into context. */
function mergePostAttrsResult<Props extends object>(
  context: ExecutionContext & Props,
  props: Props,
  resolved: Dict<unknown>
): void {
    throw new Error("STUB");
}

/**
 * Post-compile attrs phase. Each arity-2 attr runs in order: a static
 * plan (folded at construction by `tracePostAttr`) merges directly into
 * context and applies pops to `effectiveBase`. Untraceable callbacks
 * fall back to runtime invocation with a live `ast` accessor over
 * `effectiveBase`. `effectiveBase` is the cloned compiled base;safe to
 * mutate; the canonical compiled object is left intact for cache reuse.
 */
function applyPostAttrs<Props extends object>(
  context: ExecutionContext & Props,
  props: Props,
  attrs: Attrs<Props>[],
  plans: ReadonlyArray<PostAttrsPlan | null> | undefined,
  effectiveBase: Dict<any>
): void {
    throw new Error("STUB");
}

interface StyledComponentImplProps extends ExecutionProps {
  style?: any;
}

function buildPropsForElement(
  context: Record<string, any>,
  elementToBeCreated: NativeTarget,
  shouldForwardProp: ((prop: string, el: NativeTarget) => boolean) | undefined
): Dict<any> {
    throw new Error("STUB");
}

/**
 * The bottom of a `styled(styled(...))` chain;either a host string,
 * a component constructor, or nothing. Special-case dev warnings narrow
 * against this shape rather than `any`.
 */
type LeafTarget = string | { displayName?: string; name?: string } | null | undefined;

/**
 * Walk down through styled-component wrappers to the innermost native (or
 * unknown) leaf. Used to type-check special-case CSS like `line-clamp` ;
 * which only does something on `Text` / `TextInput`;even when the user
 * has wrapped Text once or twice with `styled(Text)\`...\``.
 */
function resolveLeafTarget(target: unknown): LeafTarget {
    throw new Error("STUB");
}

/** `Animated.createAnimatedComponent` (and reanimated's equivalent) name
 *  their wrappers `Animated(Text)` / `AnimatedComponent(Text)`; the inner
 *  name is what validOn checks and scroller detection care about. */
const ANIMATED_WRAPPER_NAME_RE = /^(?:Animated|AnimatedComponent|Reanimated)\((.+)\)$/;

function leafName(leaf: LeafTarget): string | undefined {
    throw new Error("STUB");
}

function targetMatchesValidOn(target: unknown, validOn: ReadonlyArray<string>): boolean {
    throw new Error("STUB");
}

const specialCaseWarned = new WeakSet<object>();

/**
 * Single owner of the trailing prop-finalization sequence shared by
 * useStaticImpl / useDynamicImpl. Builds the forwarded prop bag,
 * attaches the assembled style, lifts compiled special-case keys onto
 * the bag (e.g. `numberOfLines` from `line-clamp`), and forwards the ref.
 */
function finalizeElementProps(
  source: Record<string, any>,
  elementToBeCreated: NativeTarget,
  shouldForwardProp: ((prop: string, el: NativeTarget) => boolean) | undefined,
  style: any,
  specialCases: Dict<any> | undefined,
  forwardedRef: Ref<any> | undefined,
  forwardedComponent: IStyledComponent<'native', any>
): Dict<any> {
    throw new Error("STUB");
}

/**
 * Spread compiled special-case props (e.g. `numberOfLines` from `line-clamp`)
 * onto element props with USER PROPS WINNING;mirrors how user `style`
 * overrides compiled styles. Emits a one-time dev warning when the rendered
 * element type doesn't read the prop (e.g. `line-clamp` on a `View`).
 */
function applySpecialCases(
  elementProps: Dict<any>,
  specialCases: Dict<any> | undefined,
  effectiveTarget: unknown,
  warningKey: object
): void {
    throw new Error("STUB");
}

const EMPTY_INSETS = Object.freeze({ top: 0, right: 0, bottom: 0, left: 0 });

function buildResolveEnv(
  env: MediaQueryEnv,
  containerCtx: ContainerContextValue,
  theme: Record<string, any>,
  cascade: NativeCascadeValues,
  parentCtx: ParentContextValue,
  props: Record<string, unknown>,
  positionAnchor?: string
): ResolveEnv {
  // Untracked position (parent isn't an indexing styled component)
  // resolves as an only child; see the tree-counting spec block for the
  // documented deviation from the spec's shadow-boundary failure value.
  const tracked = parentCtx.siblingIndex >= 0;
  const out: ResolveEnv = {
    media: env,
    container: containerCtx.nearest,
    theme: theme ?? EMPTY_OBJECT,
    insets: EMPTY_INSETS,
    rootFontSize: cascade.rootFontSize,
    fontSize: cascade.fontSize,
    lineHeight: cascade.lineHeight,
    direction: cascade.direction,
    customProperties: cascade.customProperties ?? null,
    siblingIndex: tracked ? parentCtx.siblingIndex + 1 : 1,
    siblingCount: tracked ? parentCtx.totalSiblings : 1,
    props,
  };
  if (positionAnchor !== undefined) out.positionAnchor = positionAnchor;
  return out;
}

/**
 * Derive the cascade values to publish to descendants from the
 * resolved style. Returns the original `inherited` reference when no
 * cascade-relevant property fires (the caller skips the Provider
 * wrap), otherwise a fresh merged cascade.
 *
 * The cheap short-circuit (`!compiled.publishesCascade && no user
 * style`) lives at the call site, not here: this function stays
 * monomorphic on (inherited, resolvedStyle) so V8's IC and inliner
 * see the same signature the pre-stamp form had. Adding a third
 * boolean arg to gate the walk inside the function regressed the
 * must-walk path by ~25%, traced to IC polymorphism on the boolean.
 *
 * Single right-to-left walk over array layers (matches RN's array-style
 * merge semantics; last write wins). Each layer captures all three
 * fields at once. The common case is a flat object with no cascade-
 * relevant property, which returns after one object visit.
 */
function computePublishedCascade(
  inherited: NativeCascadeValues,
  resolvedStyle: any
): NativeCascadeValues {
    throw new Error("STUB");
}

type MergedCascadeCache = {
  inherited: NativeCascadeValues;
  own: ReadonlyMap<string, string> | undefined;
  merged: NativeCascadeValues;
} | null;

/**
 * Merge own custom property declarations into the inherited cascade map.
 * Returns the inherited reference unchanged when there is nothing to add,
 * otherwise a fresh `NativeCascadeValues` with a merged `customProperties`
 * Map (own keys win over inherited keys to match CSS cascade order).
 */
function mergeCustomPropertiesIntoCascade(
  inherited: NativeCascadeValues,
  own: ReadonlyMap<string, string> | undefined
): NativeCascadeValues {
    throw new Error("STUB");
}

function collectCascadeSlots(style: any, slots: [unknown, unknown, unknown]): boolean {
    throw new Error("STUB");
}

// Mutable scratch env reused across container-query evaluations.
// matchMedia reads only `width`/`height` for container queries; the
// other fields are fixed defaults that never matter to the parser. We
// rewrite width/height in place rather than allocating a fresh object
// per condition per render.
const CONTAINER_ENV: MediaQueryEnv = {
  width: 0,
  height: 0,
  colorScheme: undefined,
  reduceMotion: false,
  fontScale: 1,
  pixelRatio: 1,
};

function conditionMatches(
  entry: ConditionalStyle,
  env: MediaQueryEnv,
  containerCtx: Pick<ContainerContextValue, 'named' | 'nearest'>
): boolean {
  if (entry.type === 'media') {
    return matchMedia(entry.condition, env);
  }
  if (entry.type === 'supports') {
    // Feature queries have their own grammar (declarations, not media
    // features); routing them through the media matcher silently
    // mismatches every condition.
    return matchSupports(entry.condition);
  }
  if (entry.type === 'container') {
    // CSS spec: anonymous `@container (…)` matches the nearest
    // container ancestor; named queries match the most-recent
    // container with that name. Fall back to `nearest` when no name
    // was written so users get sensible defaults without having to
    // declare `container-name`.
    const name = entry.containerName;
    const container = name ? containerCtx.named[name] : containerCtx.nearest;
    if (!container) return false;
    CONTAINER_ENV.width = container.width;
    CONTAINER_ENV.height = container.height;
    return matchMedia(entry.condition, CONTAINER_ENV);
  }
  return false;
}

// Pseudo-gated buckets are owned by the state callback; this walker
// is fed a precomputed `nonPseudoEntries` subset from compileNative so
// the per-render loop never iterates pseudo entries.
interface MatchedLayers {
  normal: object[];
  /** Important overlay produced by matched buckets that carry an
   *  `!important` declaration. Lazily allocated on first push so the
   *  common case (no bucket has importance) costs no extra array. */
  important: object[] | null;
}

const EMPTY_MATCHED: MatchedLayers = {
  normal: EMPTY_ARRAY as unknown as object[],
  important: null,
};

function pushMatched(out: MatchedLayers, entry: ConditionalStyle, env: ResolveEnv): void {
  // varDeferred resolves at match time against the cascade map and may
  // contribute to either the normal or important layer depending on
  // each entry's importance flag.
  let varOut: { normal: Dict<any> | null; important: Dict<any> | null } | null = null;
  if (entry.varDeferred !== undefined) {
    varOut = applyVarDeferred(entry.varDeferred, env.customProperties, null, env);
  }
  out.normal.push(resolveBucket(entry, env, varOut !== null ? varOut.normal : null));
  if (
    entry.important !== undefined ||
    entry.importantResolvers !== undefined ||
    (varOut !== null && varOut.important !== null)
  ) {
    if (out.important === null) out.important = [];
    out.important.push(
      resolveImportantBucket(entry, env, varOut !== null ? varOut.important : null)
    );
  }
}

function resolveImportantBucket(
  entry: ConditionalStyle,
  env: ResolveEnv,
  varImportant: Dict<any> | null
): object {
  const imp = entry.important ?? EMPTY_OBJECT;
  const resolved = entry.importantResolvers
    ? applyResolvers(imp as Record<string, any>, entry.importantResolvers, env)
    : imp;
  return varImportant !== null ? { ...resolved, ...varImportant } : resolved;
}

function matchConditionals(
  entries: ConditionalStyle[],
  env: MediaQueryEnv,
  containerCtx: Pick<ContainerContextValue, 'named' | 'nearest'>,
  props: Record<string, unknown>,
  resolveEnv: ResolveEnv,
  parentCtx: ParentContextValue
): MatchedLayers {
  const out: MatchedLayers = { normal: [], important: null };
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    if (entry.type === 'attr') {
      const matches = attrMatches(entry, props);
      if (entry.negate ? !matches : matches) pushMatched(out, entry, resolveEnv);
      continue;
    }
    if (entry.type === 'combinator') {
      if (!combinatorMatches(entry, parentCtx)) continue;
      pushMatched(out, entry, resolveEnv);
      continue;
    }
    if (entry.type === 'nthChild') {
      const matches = nthChildMatches(entry, parentCtx);
      if (entry.negate ? !matches : matches) pushMatched(out, entry, resolveEnv);
      continue;
    }
    if (entry.type === 'has') {
      const matches = hasMatches(entry, props.children as React.ReactNode);
      if (entry.negate ? !matches : matches) pushMatched(out, entry, resolveEnv);
      continue;
    }
    // media / container / supports;optionally gated on attrs too
    // when the at-rule body contained a nested attribute selector.
    if (!conditionMatches(entry, env, containerCtx)) continue;
    if (entry.attrs && !attrMatches(entry, props)) continue;
    pushMatched(out, entry, resolveEnv);
  }
  return out;
}

/**
 * Combinator selector match against ParentContext. Non-styled intermediaries are
 * transparent to ancestors (descendant combinator) but reset the immediate parent
 * (child combinator), since only styled components publish ParentContext.
 */
function combinatorMatches(entry: ConditionalStyle, parentCtx: ParentContextValue): boolean {
  const ancestorId = entry.condition;
  if (entry.combinator === 'child') return parentCtx.parentId === ancestorId;
  if (entry.combinator === 'adjacent-sibling') return parentCtx.prevSiblingId === ancestorId;
  if (entry.combinator === 'general-sibling') {
    const prev = parentCtx.prevSiblings;
    const cap = parentCtx.prevSiblingsCount;
    for (let i = 0; i < cap; i++) {
      if (prev[i] === ancestorId) return true;
    }
    return false;
  }
  // descendant; match the immediate parent OR any further ancestor.
  if (parentCtx.parentId === ancestorId) return true;
  const ancestors = parentCtx.ancestors;
  for (let i = 0; i < ancestors.length; i++) {
    if (ancestors[i] === ancestorId) return true;
  }
  return false;
}

/**
 * `&:has(<simple>)` match against `props.children`. Only React-element descendants
 * are inspected; descendants emitted inside a child's render body are invisible
 * because the walk reads pre-render children.
 */
function hasMatches(entry: ConditionalStyle, children: React.ReactNode): boolean {
  const inner = entry.hasInner;
  if (!inner) return false;
  return walkForHas(children, inner);
}

function walkForHas(
  children: React.ReactNode,
  inner: { kind: 'component'; id: string } | { kind: 'attr'; attr: ConditionalAttr }
): boolean {
  let found = false;
  React.Children.forEach(children, child => {
      throw new Error("STUB");
  });
  return found;
}

function matchesHasInner(
  el: React.ReactElement,
  inner: { kind: 'component'; id: string } | { kind: 'attr'; attr: ConditionalAttr }
): boolean {
  if (inner.kind === 'component') {
    const type = el.type as { styledComponentId?: string } | string;
    return typeof type !== 'string' && type.styledComponentId === inner.id;
  }
  // attr
  const attr = inner.attr;
  const props = el.props as Record<string, unknown>;
  const raw = props[attr.name];
  if (raw === undefined) return false;
  if (attr.value === undefined) return true;
  const str = typeof raw === 'boolean' ? (raw ? 'true' : 'false') : String(raw);
  const actual = attr.caseFlag === 'i' ? str.toLowerCase() : str;
  const expected = attr.caseFlag === 'i' ? attr.value.toLowerCase() : attr.value;
  return evaluateAttrOperator(attr.operator, actual, expected);
}

function nthChildMatches(entry: ConditionalStyle, parentCtx: ParentContextValue): boolean {
  const spec = entry.nthSpec;
  if (spec === undefined) return false;
  if (spec.of !== undefined) return nthChildOfSelectorMatches(entry, spec, parentCtx);
  const idx = spec.ofType ? parentCtx.siblingIndexOfType : parentCtx.siblingIndex;
  if (idx < 0) return false;
  const tot = spec.ofType ? parentCtx.totalSiblingsOfType : parentCtx.totalSiblings;
  if (spec.onlyChild && tot !== 1) return false;
  // 1-based position from start or end.
  const pos = spec.fromEnd ? tot - idx : idx + 1;
  if (pos < 1) return false;
  if (spec.a === 0) return pos === spec.b;
  const k = (pos - spec.b) / spec.a;
  return k >= 0 && Math.floor(k) === k;
}

/**
 * `:nth-child(an+b of S)` and `:nth-last-child(an+b of S)`. Filters
 * `parentCtx.siblings` against the inner simple selector, finds self's
 * 1-based position in the filter via `parentCtx.siblingIndex`, applies
 * the formula. Result is cached on the entry keyed by the siblings array
 * reference so each subsequent sibling evaluating the same rule reuses
 * the precomputed filter (O(N) per parent render, not O(N²)).
 */
function nthChildOfSelectorMatches(
  entry: ConditionalStyle,
  spec: NthSpec,
  parentCtx: ParentContextValue
): boolean {
  const of = spec.of!;
  const entries = parentCtx.siblings.entries;
  const selfIdx = parentCtx.siblingIndex;
  if (entries.length === 0 || selfIdx < 0) return false;

  // Persistent single-slot cache on the entry. The `Int32Array` is
  // indexed directly by a sibling's full-list position, so lookup is
  // O(1) (typed-array indexing, no Map hashing). The buffer is grown
  // by doubling when a parent's child count exceeds capacity and
  // reused across renders; only the touched range gets zeroed on
  // cache miss. Microbench across N=10..1000: -32% to -64% vs the
  // prior `Map<number, number>` plan at all densities.
  const cache = (entry as unknown as { __ofCache?: NthOfPlan }).__ofCache;
  let plan: NthOfPlan;
  if (cache !== undefined) {
    plan = cache;
  } else {
    plan = {
      entriesRef: null,
      posByIndex: new Int32Array(NTH_OF_INITIAL_CAP),
      maxIndex: 0,
      total: 0,
    };
    (entry as unknown as { __ofCache?: NthOfPlan }).__ofCache = plan;
  }
  if (plan.entriesRef !== entries) {
    let max = 0;
    for (let i = 0; i < entries.length; i++) {
      const idx = entries[i].index;
      if (idx > max) max = idx;
    }
    const need = max + 1;
    if (plan.posByIndex.length < need) {
      let cap = plan.posByIndex.length;
      while (cap < need) cap *= 2;
      plan.posByIndex = new Int32Array(cap);
    } else {
      // Reuse buffer; clear only the range previously touched OR the
      // new active range, whichever is larger (positions outside the
      // active range never get read so leaving stale data there is OK,
      // but we cover the union to keep the invariant simple).
      const oldMax = plan.maxIndex;
      const limit = oldMax >= max ? oldMax + 1 : need;
      plan.posByIndex.fill(0, 0, limit);
    }
    plan.maxIndex = max;
    let total = 0;
    for (let i = 0; i < entries.length; i++) {
      if (matchNthOfInner(entries[i], of)) {
        total++;
        plan.posByIndex[entries[i].index] = total;
      }
    }
    plan.total = total;
    plan.entriesRef = entries;
  }
  if (plan.total === 0) return false;
  if (spec.onlyChild && plan.total !== 1) return false;
  if (selfIdx > plan.maxIndex) return false;
  const filterPos = plan.posByIndex[selfIdx];
  if (filterPos === 0) return false;
  // 1-based position from start (filterPos) or end.
  const pos = spec.fromEnd ? plan.total - filterPos + 1 : filterPos;
  if (pos < 1) return false;
  if (spec.a === 0) return pos === spec.b;
  const k = (pos - spec.b) / spec.a;
  return k >= 0 && Math.floor(k) === k;
}

interface NthOfPlan {
  entriesRef: ReadonlyArray<SiblingInfo> | null;
  /** posByIndex[fullListIndex] = 1-based filter position, 0 if not in filter. */
  posByIndex: Int32Array;
  /** Highest `index` value seen in the most recent build (lookup bound). */
  maxIndex: number;
  /** Total siblings matching the inner selector. */
  total: number;
}

/** Initial capacity for the per-entry posByIndex pool. Doubles as needed.
 *  16 covers the typical small-list case without re-alloc. */
const NTH_OF_INITIAL_CAP = 16;

/**
 * Evaluate the inner branch of `:nth-child(of S)` against a sibling.
 * Mirrors `matchesHasInner` semantics: component-ref matches the
 * sibling's `styledComponentId`; attr selectors evaluate against the
 * sibling's props bag with the existing operator + case-flag rules.
 */
function matchNthOfInner(sibling: SiblingInfo, of: NthOfBranch): boolean {
  if (of.kind === 'component') return sibling.id === of.id;
  const attr = of.attr;
  const raw = sibling.props[attr.name];
  if (raw === undefined) return false;
  if (attr.value === undefined) return true;
  const str = typeof raw === 'boolean' ? (raw ? 'true' : 'false') : String(raw);
  const actual = attr.caseFlag === 'i' ? str.toLowerCase() : str;
  const expected = attr.caseFlag === 'i' ? attr.value.toLowerCase() : attr.value;
  return evaluateAttrOperator(attr.operator, actual, expected);
}

function resolveBucket(
  entry: ConditionalStyle,
  env: ResolveEnv,
  varNormal: Dict<any> | null = null
): object {
  const resolved = entry.resolvers
    ? applyResolvers(entry.styles, entry.resolvers, env)
    : entry.styles;
  return varNormal !== null ? { ...resolved, ...varNormal } : resolved;
}

/**
 * AND-evaluate every (name, value?) pair in the bucket's chain. Boolean coercion
 * lets `aria-pressed={true}` and `aria-pressed="true"` both satisfy `value: 'true'`.
 */
function attrMatches(entry: ConditionalStyle, props: Record<string, unknown>): boolean {
  const attrs = entry.attrs;
  if (!attrs || attrs.length === 0) return false;
  for (let i = 0; i < attrs.length; i++) {
    const attr = attrs[i];
    const raw = props[attr.name];
    if (raw === undefined) return false;
    if (attr.value !== undefined) {
      const stringified = typeof raw === 'boolean' ? (raw ? 'true' : 'false') : String(raw);
      const actual = attr.caseFlag === 'i' ? stringified.toLowerCase() : stringified;
      const expected = attr.caseFlag === 'i' ? attr.value.toLowerCase() : attr.value;
      if (!evaluateAttrOperator(attr.operator, actual, expected)) return false;
    }
  }
  return true;
}

/**
 * Evaluate an attribute selector operator against the actual prop value. Default is
 * `=`. The caller pre-lowercases both operands when the `i` flag is present.
 */
function evaluateAttrOperator(
  operator: '=' | '~=' | '|=' | '^=' | '$=' | '*=' | undefined,
  actual: string,
  expected: string
): boolean {
  switch (operator) {
    case undefined:
    case '=':
      return actual === expected;
    case '~=': {
      // Whitespace-separated list contains `expected` as a complete word.
      if (expected.length === 0) return false;
      // Reject expected values with whitespace (per spec: matches nothing).
      for (let i = 0; i < expected.length; i++) {
        const c = expected.charCodeAt(i);
        if (c === 0x20 || c === 0x09 || c === 0x0a || c === 0x0d) return false;
      }
      const tokens = actual.split(/\s+/);
      return tokens.indexOf(expected) !== -1;
    }
    case '|=':
      // Equals `expected` exactly OR begins with `expected-`.
      return actual === expected || actual.startsWith(expected + '-');
    case '^=':
      return expected.length > 0 && actual.startsWith(expected);
    case '$=':
      return expected.length > 0 && actual.endsWith(expected);
    case '*=':
      return expected.length > 0 && actual.indexOf(expected) !== -1;
  }
}

/**
 * RN host components whose `style` prop rejects the function (state
 * callback) form. Pressable is the one host that invokes a function
 * style with interaction state; everything else silently drops a
 * function style, taking the component's ENTIRE rule with it. Mirrors
 * the alias list in native/index.ts (kept local to avoid an import
 * cycle); custom component targets are intentionally absent so wrappers
 * that forward style to a Pressable keep the function form.
 */
const STATELESS_STYLE_TARGETS = new Set([
  'ActivityIndicator',
  'Button',
  'FlatList',
  'Image',
  'ImageBackground',
  'InputAccessoryView',
  'KeyboardAvoidingView',
  'Modal',
  'RefreshControl',
  'SafeAreaView',
  'ScrollView',
  'SectionList',
  'StatusBar',
  'Switch',
  'Text',
  'TextInput',
  'TouchableHighlight',
  'TouchableNativeFeedback',
  'TouchableOpacity',
  'TouchableWithoutFeedback',
  'View',
  'VirtualizedList',
]);

/** Leaf target name when it cannot receive a function style; null otherwise. */
function inertStateStyleTargetName(target: unknown): string | null {
    throw new Error("STUB");
}

const PSEUDO_TO_SELECTOR: Record<PseudoState, string> = {
  pressed: ':active',
  hover: ':hover',
  focus: ':focus',
  disabled: ':disabled',
};

/**
 * Dev warning for pseudo-state buckets that can never fire because the
 * target cannot receive interaction state. Skips buckets whose
 * environmental gate (media / container / supports) does not currently
 * match, so a web-only rule fenced behind `@media (hover: hover)` stays
 * silent on touch platforms.
 */
function warnInertPseudoStates(
  entries: ConditionalStyle[],
  env: MediaQueryEnv,
  containerCtx: Pick<ContainerContextValue, 'named' | 'nearest'>,
  targetName: string
): void {
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    const pseudo = entry.type === 'pseudo' ? (entry.condition as PseudoState) : entry.pseudo!;
    if (
      entry.type !== 'pseudo' &&
      entry.type !== 'attr' &&
      entry.type !== 'combinator' &&
      entry.type !== 'nthChild' &&
      entry.type !== 'has' &&
      !conditionMatches(entry, env, containerCtx)
    ) {
      continue;
    }
    warnOnce(
      'native-pseudo-state-inert',
      '`' +
        PSEUDO_TO_SELECTOR[pseudo] +
        '` styles on a styled ' +
        targetName +
        ' never apply on React Native: only `Pressable` provides interaction state to its style. Use `styled.Pressable` for press / hover / focus styling, or fence a web-only rule behind `@media (hover: hover)`.',
      targetName + ':' + PSEUDO_TO_SELECTOR[pseudo]
    );
    return;
  }
}

// Maps our pseudo-state names to the field RN's `style` callback exposes.
const PSEUDO_TO_STATE_KEY: Record<PseudoState, 'pressed' | 'hovered' | 'focused' | 'disabled'> = {
  pressed: 'pressed',
  hover: 'hovered',
  focus: 'focused',
  disabled: 'disabled',
};

function pseudoActive(
  pseudo: PseudoState,
  state: { pressed?: boolean; hovered?: boolean; focused?: boolean; disabled?: boolean }
): boolean {
  return !!state[PSEUDO_TO_STATE_KEY[pseudo]];
}

function pseudoStylesForState(
  entries: ConditionalStyle[],
  state: { pressed?: boolean; hovered?: boolean; focused?: boolean; disabled?: boolean },
  env: MediaQueryEnv,
  containerCtx: Pick<ContainerContextValue, 'named' | 'nearest'>,
  props: Record<string, unknown>,
  resolveEnv: ResolveEnv,
  parentCtx: ParentContextValue
): MatchedLayers {
  // Caller passes the precomputed `pseudoEntries` subset; every entry
  // is guaranteed pseudo-bearing (either `type==='pseudo'` or a
  // compound carrying `entry.pseudo`), so the inner branches skip the
  // membership re-check.
  const out: MatchedLayers = { normal: [], important: null };
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    if (entry.type === 'pseudo') {
      const active = pseudoActive(entry.condition as PseudoState, state);
      if (entry.negate ? !active : active) pushMatched(out, entry, resolveEnv);
      continue;
    }
    // Compound: entry.pseudo is guaranteed set here.
    if (!pseudoActive(entry.pseudo!, state)) continue;
    // Attrs AND-gate for compound forms like `&[disabled]:hover`.
    if (entry.attrs) {
      const attrOk = attrMatches(entry, props);
      if (entry.negate ? attrOk : !attrOk) continue;
    }
    // Structural AND-gate for Tier 2 combinations like
    // `&:nth-child(2):hover` or `${Foo} > &:active`.
    if (entry.type === 'combinator') {
      if (!combinatorMatches(entry, parentCtx)) continue;
    } else if (entry.type === 'nthChild') {
      const matches = nthChildMatches(entry, parentCtx);
      if (entry.negate ? matches : !matches) continue;
    } else if (entry.type === 'has') {
      const matches = hasMatches(entry, props.children as React.ReactNode);
      if (entry.negate ? matches : !matches) continue;
    } else if (entry.type !== 'attr' && !conditionMatches(entry, env, containerCtx)) {
      // media / container / supports environmental gate.
      continue;
    }
    pushMatched(out, entry, resolveEnv);
  }
  return out;
}

// [props, theme, propsKeyCount, context, compiled, env, nativeStyleCtx,
//  composedStyle, elementToBeCreated, elementProps, resolveEnv, effectiveBase]
//
// Slot 6 holds the full NativeStyleContext (container + cascade), not
// just the container. The cache must invalidate when an ancestor
// publishes a fresh cascade (font-size / line-height / direction)
// even if the container side is unchanged; otherwise em / lh /
// `text-align: start | end` / sentinel-base relative colors render
// with stale `ResolveEnv` values.
type RenderCache = [
  object,
  DefaultTheme | undefined,
  number,
  object,
  NativeStyles,
  MediaQueryEnv,
  NativeStyleContextValue,
  any,
  NativeTarget,
  Dict<any>,
  ResolveEnv,
  Dict<any>,
  ParentContextValue,
  number,
];

/**
 * Compose a static `base` style with the user-supplied `props.style`. RN's
 * `Pressable`/`TextInput` accept a function for `style` (state callback);
 * pass-through that shape by wrapping the function call.
 *
 * INTENTIONALLY DUPLICATED with `appendStyle` below: a generic
 * `composeStyles(existing, layer, normalizeLayer)` regressed the static
 * path by 50-65% (extra polymorphic branch + a shared concat helper that
 * pays for Array.isArray on both operands when the caller knows one
 * side's shape statically). Keep these specialized.
 */
export function composeBase(base: object, userStyle: any): any {
    throw new Error("STUB");
}

/**
 * Resolve the runtime container name for a component. Returns the
 * explicit `container-name` CSS value if the user wrote one, otherwise
 * the component's `styledComponentId` so anonymous-from-CSS containers
 * still have a stable identity for the runtime publisher and for
 * `${Component}` interpolation in `@container <name>` queries.
 *
 * Returns `undefined` when the component doesn't declare any
 * containment (`container-type` absent or set to `normal`); the
 * render path uses that to short-circuit `ContainerPublisher`.
 */
function resolveContainerName(
  info: NativeStyles['containerInfo'] | undefined,
  styledComponentId: string
): string | undefined {
    throw new Error("STUB");
}

/** Append an `extra` style object onto a composed style, preserving its function-or-array shape. */
function appendStyle(composed: any, extra: object): any {
    throw new Error("STUB");
}

/**
 * Inject `container-name: <styledComponentId>` into the rendered
 * style when a component declares `container-type` without an
 * explicit `container-name`. Lets rn-web emit the matching CSS so
 * `@container <id> (...)` queries written via `${Component}`
 * interpolation match against the source on the browser side; on
 * native this prop is ignored by the view manager (the runtime
 * publisher carries the same name through `ContainerContext`).
 */
function injectAutoContainerName(
  composed: any,
  info: NativeStyles['containerInfo'] | undefined,
  styledComponentId: string
): any {
    throw new Error("STUB");
}

function composeStaticStyle(
  compiled: NativeStyles,
  userStyle: any,
  styledComponentId: string
): any {
    throw new Error("STUB");
}

function createFastElement(
  elementToBeCreated: NativeTarget,
  elementProps: Dict<any>,
  containerName: string | undefined
): React.ReactElement {
    throw new Error("STUB");
}

interface StaticContainerPublisherDispatchProps {
  name: string;
  elementType: NativeTarget;
  elementProps: Dict<any>;
}

/**
 * Container-publish dispatch for the static path. `NativeStyleContext`
 * is read only when the rendered component declares `container-type`
 * in its CSS, so the common case of a non-container component pays no
 * useContext for the container/cascade pair.
 */
function StaticContainerPublisherDispatch({
  name,
  elementType,
  elementProps,
}: StaticContainerPublisherDispatchProps): React.ReactElement {
    throw new Error("STUB");
}

// Eligibility is frozen at construction (INativeStyle.staticEligible) so hook
// ordering stays stable. Reads ParentContext so descendants of this
// element see it as an ancestor under Tier 2 combinator selectors
// (`${Foo} &`, `${Foo} > &`). Without this read, every static-eligible
// styled component would be invisible to the chain, which would mean
// `${Foo} &` only matches when Foo happens to have responsive CSS.
function useStaticImpl<Props extends StyledComponentImplProps>(
  forwardedComponent: IStyledComponent<'native', Props>,
  props: Props,
  forwardedRef: Ref<any> | undefined
): React.ReactElement {
    throw new Error("STUB");
}

/**
 * Render path for any component that needs runtime work: `attrs`,
 * `shouldForwardProp`, function interpolations, responsive features
 * (`@media`, `@container`, `@supports`, pseudo states, attribute
 * selectors, theme tokens, viewport units), animations, transitions,
 * `@starting-style`, or container publishing.
 *
 * Hooks (5, stable per component lifetime): useContext (theme),
 * useMediaEnv, useContainerContext, useRef (cache),
 * adapter.useAnimatedStyle.
 *
 * Tier'd cache:
 *  - Full hit (props/theme/env/containerCtx all reference-equal): reuse
 *    every cached field including elementProps. The adapter is still
 *    invoked for hook-order, but on stable inputs the default adapter
 *    returns the same style and wrapped element-type references it
 *    returned last render, so the cached elementProps stays valid.
 *  - Partial hit (props/theme equal, env or containerCtx changed):
 *    reuse compile, re-run assembly so media/container buckets and
 *    viewport/container-unit resolvers reflect the new env.
 *  - Miss: re-resolve attrs, recompile.
 *
 * Components with provably-static CSS (no responsive features, no
 * animations, no cascade-significant declarations) bypass this path
 * entirely and use `useStaticImpl`, which reads `ParentContext` and a
 * memoization ref but skips theme / env / container subscription and
 * the full assembly pipeline.
 */
function useDynamicImpl<Props extends StyledComponentImplProps>(
  forwardedComponent: IStyledComponent<'native', Props>,
  props: Props,
  forwardedRef: Ref<any> | undefined
) {
    throw new Error("STUB");
}

/**
 * Compute the {@link ParentContextValue} this component publishes to
 * descendants. Identity = `styledComponentId` + element target; the
 * ancestor chain accumulates the parent's so descendant combinators
 * can match an ancestor anywhere up the tree.
 *
 * Returns `null` when the inherited `parentId` already equals this
 * component's id (defensive; would accumulate duplicates on
 * re-render). The caller should fall through to the inherited context
 * without re-wrapping in a Provider.
 *
 * Result is memoized per-component in `ParentPublishCache` so the
 * `value` handed to `ParentContext.Provider` stays reference-stable
 * across renders with unchanged inherited context. That stability lets
 * `React.memo` on styled descendants short-circuit when their props
 * are equal: the provider's `value` no longer changes by reference on
 * every parent render.
 */
function buildPublishedParentValue(
  cache: ParentPublishCache,
  parent: ParentContextValue,
  styledComponentId: string,
  elementType: NativeTarget
): ParentContextValue | null {
    throw new Error("STUB");
}

interface PerChildCacheEntry {
  id: string | null;
  target: NativeTarget | null;
  total: number;
  prevId: string | null;
  prevTarget: NativeTarget | null;
  prevSiblingsKey: string;
  idxOfType: number;
  totalOfType: number;
  parentValue: ParentContextValue;
  /** Identity of the SiblingsList wrapper at the time perChildValue was built. */
  siblings: SiblingsList;
  perChildValue: ParentContextValue;
}

interface ParentPublishCache {
  publishedKeyParentCtx: ParentContextValue | null;
  publishedKeyElementType: NativeTarget | null;
  publishedValue: ParentContextValue | null;
  perChild: Array<PerChildCacheEntry | null>;
  /** Stable SiblingsList wrapper; `entries` is mutated each render. */
  siblingsList: SiblingsList | null;
}

function createParentPublishCache(): ParentPublishCache {
    throw new Error("STUB");
}

const EMPTY_PREV_SIBLINGS: ReadonlyArray<string> = Object.freeze([]);

/**
 * Walk `children`, identifying styled descendants (those carrying a
 * `styledComponentId` static) and wrapping each one in a per-child
 * `ParentContext.Provider` that publishes its sibling position.
 * Non-styled children pass through untouched.
 *
 * Returns the original `children` when no styled children are present
 * so callers can reuse the original `elementProps` reference and keep
 * the render cache identity intact.
 *
 * Sibling info reflects literal JSX position among the parent's direct
 * children. Combinator selectors only see immediate styled-child
 * relationships of a styled parent; a non-styled wrapper between them
 * means a deeper styled descendant sees no sibling info (its inherited
 * Provider holds the default values).
 *
 * Each per-child Provider's `value` is cached structurally by position:
 * when the next render produces the same (id, target, total, prev*,
 * idx-of-type, total-of-type, parentValue ref) at slot i, the same
 * `ParentContextValue` reference is reused. JSX re-creation in the
 * caller produces fresh React elements each render, but the per-child
 * Provider `value` stays reference-stable, which lets `React.memo` on
 * styled descendants short-circuit cleanly.
 */
function indexStyledChildren(
  cache: ParentPublishCache,
  children: React.ReactNode,
  parentValue: ParentContextValue
): React.ReactNode {
    throw new Error("STUB");
}

/**
 * Substitute `children` on `elementProps` with `indexedChildren` if the
 * latter is a fresh reference. When `indexedChildren === elementProps.children`,
 * the original object is returned so the render-cache identity is preserved.
 */
function withIndexedChildren(elementProps: Dict<any>, indexedChildren: React.ReactNode): Dict<any> {
    throw new Error("STUB");
}

/** Prepended below the composed style: anything in props.style beats
 *  ScrollView's base `flexGrow: 1` regardless of position, and sitting
 *  first keeps a runtime `style={{ flexGrow: 1 }}` (and any authored
 *  declaration) above this library default. Authored flex factors also
 *  suppress the pin at compile time (see `scrollerFlexPin`). */
const SCROLLER_FLEX_PIN = Object.freeze({ flexGrow: 0 });

/**
 * Web-parity defaults for styled scrollers. User-supplied props and
 * authored flex declarations always win.
 *
 * - `nestedScrollEnabled: true`: browsers nest scrolling natively, while
 *   Android's ScrollView requires the opt-in before an inner scroller may
 *   claim a gesture from a scrollable ancestor. Inert on iOS and rn-web.
 * - `pinGrow` (compiled `scrollerFlexPin`): an authored width/height
 *   holds instead of stretching with RN ScrollView's `flexGrow: 1` base.
 *   The companion `flexShrink: 0` lives in the styled scroller baseline
 *   in `native/index.ts` instead: as authored CSS it participates in the
 *   cascade, so `flex-shrink` declarations override it anywhere
 *   (including inside @media buckets the compile-time pin scan can't
 *   see).
 */
function withScrollerDefaults(
  isScroller: boolean,
  pinGrow: boolean,
  elementProps: Dict<any>
): Dict<any> {
    throw new Error("STUB");
}

/**
 * Scroller ergonomics + CSS scroll snap wiring, shared by both render
 * paths. Hook order is unconditional; the gates only shape the props.
 * The settle corrector activates only for the `scroll-snap-type: *
 * mandatory` lift (`pagingEnabled` enters `specialCases` from that lift
 * alone): proximity and bare user-supplied snap props carry no CSS
 * must-rest contract, so correcting them would be an overreach.
 */
function useScrollerSnapProps(
  isScroller: boolean,
  compiled: NativeStyles,
  snapTarget: { align: string; stop: boolean } | undefined,
  timelineEntry: ScrollTimelineEntry | null,
  elementProps: Dict<any>
): Dict<any> {
    throw new Error("STUB");
}

interface ContainerPublisherProps {
  name: string;
  /** Inherited NativeStyle from the nearest ancestor publisher; the
   *  cascade fields carry through unchanged and only `container.named`
   *  / `container.nearest` get rewritten with this publisher's entry. */
  parent: NativeStyleContextValue;
  /** Cascade values to publish if this component overrides any of
   *  font-size / line-height / direction. `null` when the inherited
   *  cascade should flow through. */
  cascadeOverride: NativeCascadeValues | null;
  elementType: NativeTarget;
  elementProps: Dict<any>;
}

/**
 * Sum the explicit horizontal and vertical insets (padding + border) on
 * a styled-components-emitted RN style. Walks arrays of style objects
 * and respects RN's longhand-overrides-shorthand rule (`paddingLeft`
 * beats `paddingHorizontal` beats `padding`; logical `paddingStart` /
 * `paddingEnd` map to left / right since Yoga's only writing mode is
 * horizontal-tb LTR-equivalent).
 *
 * Used by `ContainerPublisher` to convert RN's border-box `onLayout`
 * width into the content-box width that CSS `%` and `cq*` units
 * resolve against.
 */
function getContentBoxInsets(style: any): { horizontal: number; vertical: number } {
    throw new Error("STUB");
}

function mergeStyle(style: any, out: Record<string, any>): void {
    throw new Error("STUB");
}

/**
 * Compute the width of a grid item from the published grid entry.
 *
 * Each `1fr` column's share of the container's content-box is the
 * leftover space (content width minus the gutters between columns)
 * divided by the column count (CSS Grid 2 §7.2.4: each track's share is
 * `<flex> * leftover / sum-of-flex-factors`, here `1 * leftover / N`). A
 * span of S items is S column widths plus the (S-1) interior gutters it
 * bridges.
 *
 * Before the container's first layout (`contentWidth === 0`), fall back
 * to a percentage so the item still occupies its share of the row; the
 * pixel form takes over once the measured width arrives.
 */
function computeGridItemWidth(
  grid: NonNullable<NativeCascadeValues['grid']>,
  span: number
): number | string {
    throw new Error("STUB");
}

/**
 * True when any compiled animation descriptor binds to a view progress
 * timeline. Gates the subject-layout hook's work; the descriptor list is
 * compile-time data, so the answer is stable per compiled style.
 */
function animationsUseViewTimeline(animations: NativeStyles['animations'] | undefined): boolean {
    throw new Error("STUB");
}

function numOrZero(v: unknown): number {
    throw new Error("STUB");
}

/**
 * Mounted only for styled components that publish themselves as a
 * container (CSS `container-type` declaration present). Owns the
 * layout-tracking state and provides the updated `ContainerContext`
 * value to descendants. Pulled out of the main render path so the four
 * extra hook slots only fire when the feature is actually used.
 */
function ContainerPublisher({
  name,
  parent,
  cascadeOverride,
  elementType,
  elementProps,
}: ContainerPublisherProps): React.ReactElement {
    throw new Error("STUB");
}

interface GridPublisherProps {
  ownerId: string;
  columns: number;
  columnGap: number;
  rowGap: number;
  /** Set when the grid container also declares `container-type`: the
   *  element is a query container regardless of display type, so the
   *  grid role must publish the container box too instead of eating it. */
  containerName: string | undefined;
  /** Inherited NativeStyle; container + cascade pass through, with this
   *  publisher's grid entry added to the cascade. */
  parent: NativeStyleContextValue;
  /** Cascade override when the grid container also changes a cascade
   *  key (font-size / line-height / direction); `null` otherwise. */
  cascadeOverride: NativeCascadeValues | null;
  elementType: NativeTarget;
  elementProps: Dict<any>;
}

/**
 * Read the column / row gutters off a resolved grid-container style. The
 * `gap` shorthand stays as a single `gap` key for equal gutters; the
 * two-value form is split into `rowGap` / `columnGap` by the gap handler.
 * Longhand `column-gap` / `row-gap` win over the shorthand.
 */
function readGridGutters(style: any): { columnGap: number; rowGap: number } {
    throw new Error("STUB");
}

const EMPTY_BOX = { width: 0, height: 0 };

/**
 * Mounted only for `display: grid` containers. Mirrors
 * `ContainerPublisher`: measures the content-box width via a composed
 * onLayout and publishes the grid entry through `NativeStyleContext` so
 * direct children compute their widths. The container query state and
 * the rest of the cascade pass through unchanged.
 */
function GridPublisher({
  ownerId,
  columns,
  columnGap,
  rowGap,
  containerName,
  parent,
  cascadeOverride,
  elementType,
  elementProps,
}: GridPublisherProps): React.ReactElement {
    throw new Error("STUB");
}

/**
 * Assemble the final `style` value passed to the underlying RN element.
 * Pulled out of the render hook so the cache-hit path can short-circuit
 * to a single property read without paying for any of this work.
 */
export function assembleFinalStyle(
  compiled: NativeStyles,
  env: MediaQueryEnv,
  containerCtx: ContainerContextValue,
  theme: Record<string, any>,
  userStyle: any,
  props: Record<string, unknown>,
  baseOverride?: Dict<any>,
  cascade: NativeCascadeValues = DEFAULT_CASCADE,
  parentCtx: ParentContextValue = DEFAULT_PARENT_CONTEXT,
  varImportant?: Dict<any>,
  inertStateTarget?: string | null
): any {
  const nonPseudoEntries = compiled.nonPseudoEntries;
  const pseudoEntries = compiled.pseudoEntries;
  const hasConditional = nonPseudoEntries.length > 0;
  const hasPseudoState = compiled.hasPseudo;
  const resolveEnv = buildResolveEnv(
    env,
    containerCtx,
    theme,
    cascade,
    parentCtx,
    props,
    compiled.positionAnchor
  );

  const activeMatched: MatchedLayers = hasConditional
    ? matchConditionals(nonPseudoEntries, env, containerCtx, props, resolveEnv, parentCtx)
    : EMPTY_MATCHED;
  const activeConditional = activeMatched.normal;

  // Use post-attrs `effectiveBase` (clone with pops applied) when supplied;
  // otherwise the canonical compiled base.
  const sourceBase = baseOverride !== undefined ? baseOverride : compiled.base;
  const base = compiled.resolvers
    ? applyResolvers(sourceBase, compiled.resolvers, resolveEnv)
    : sourceBase;

  // Build the unconditional important overlay once (base + resolvers +
  // var-deferred important). Matched bucket importants are appended per
  // state callback firing so they reflect the current state's hits.
  // Skip the call entirely for components that ship no important at
  // all — the function would just allocate a frame and return null.
  const baseImportantLayer =
    compiled.important !== undefined ||
    compiled.importantResolvers !== undefined ||
    varImportant !== undefined
      ? buildBaseImportantLayer(compiled, resolveEnv, varImportant)
      : null;

  if (hasPseudoState) {
    const preStateStyles: object[] =
      activeConditional.length > 0 ? [base as object].concat(activeConditional) : [base as object];
    const stateStyle = (state: any) => {
      const styles: any[] = preStateStyles.slice();
      const matched = pseudoStylesForState(
        pseudoEntries,
        state || EMPTY_OBJECT,
        env,
        containerCtx,
        props,
        resolveEnv,
        parentCtx
      );
      for (let i = 0; i < matched.normal.length; i++) styles.push(matched.normal[i]);
      if (isFunction(userStyle)) {
        const userResolved = userStyle(state);
        Array.isArray(userResolved)
          ? styles.push.apply(styles, userResolved)
          : styles.push(userResolved);
      } else if (userStyle) {
        Array.isArray(userStyle) ? styles.push.apply(styles, userStyle) : styles.push(userStyle);
      }
      // Important overlay (after user style; beats it). Source order
      // wins among importants: base, then non-pseudo bucket importants,
      // then pseudo-bucket importants (effectively latest layer).
      if (baseImportantLayer !== null) styles.push(baseImportantLayer);
      if (activeMatched.important !== null) {
        for (let i = 0; i < activeMatched.important.length; i++) {
          styles.push(activeMatched.important[i]);
        }
      }
      if (matched.important !== null) {
        for (let i = 0; i < matched.important.length; i++) styles.push(matched.important[i]);
      }
      return styles;
    };
    // Only Pressable invokes a function `style` with interaction state;
    // every other RN host treats a function style as invalid and drops
    // the WHOLE style. For those targets, evaluate once with empty state
    // so the base + matched conditional layers still apply and the
    // pseudo buckets are simply inert.
    if (inertStateTarget !== undefined && inertStateTarget !== null) {
      if (__DEV__) {
        warnInertPseudoStates(pseudoEntries, env, containerCtx, inertStateTarget);
      }
      return stateStyle(EMPTY_OBJECT);
    }
    return stateStyle;
  }

  if (isFunction(userStyle)) {
    const preStateStyles: object[] =
      activeConditional.length > 0 ? [base as object].concat(activeConditional) : [base as object];
    return (state: any) => {
        throw new Error("STUB");
    };
  }
  const importantTail: ReadonlyArray<object> =
    baseImportantLayer !== null
      ? activeMatched.important !== null
        ? [baseImportantLayer, ...activeMatched.important]
        : [baseImportantLayer]
      : activeMatched.important !== null
        ? activeMatched.important
        : EMPTY_ARRAY;
  if (userStyle) {
    if (importantTail.length > 0) {
      return activeConditional.length > 0
        ? [base as object].concat(activeConditional, [userStyle], importantTail)
        : [base as object, userStyle].concat(importantTail);
    }
    return activeConditional.length > 0
      ? [base as object].concat(activeConditional, userStyle)
      : [base as object, userStyle];
  }
  if (importantTail.length > 0) {
    return activeConditional.length > 0
      ? [base as object].concat(activeConditional, importantTail)
      : [base as object].concat(importantTail);
  }
  if (activeConditional.length > 0) {
    return [base as object].concat(activeConditional);
  }
  return base;
}

/**
 * Build the base-level important overlay layer that beats every normal
 * declaration (including the user `style` prop). Returns `null` when
 * the compiled output has no base important values, no important
 * resolvers, and no var-deferred important partial.
 */
function buildBaseImportantLayer(
  compiled: NativeStyles,
  resolveEnv: ResolveEnv,
  varImportant: Dict<any> | undefined
): object | null {
  const baseImp = compiled.important;
  const impRes = compiled.importantResolvers;
  if (baseImp === undefined && impRes === undefined && varImportant === undefined) {
    return null;
  }
  const seed = (baseImp as Record<string, any> | undefined) ?? EMPTY_OBJECT;
  const resolved = impRes !== undefined ? applyResolvers(seed, impRes, resolveEnv) : seed;
  // Spread when var-deferred important values exist; never mutate
  // compiled.important (shared across renders) or applyResolvers'
  // identity-cached output.
  return varImportant !== undefined ? { ...resolved, ...varImportant } : resolved;
}

export default (NativeStyle: INativeStyleConstructor<any>) => {
    throw new Error("STUB");
};
