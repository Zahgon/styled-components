import React, { createElement, Ref } from 'react';
import isPropValid from '../utils/isPropValid';

/** React.memo's `$$typeof` symbol; constructed in-place to skip the
 *  `React.memo()` call's allocation + the per-static property transition
 *  that mutating its result would force. Pre-shaping the wrapper as a
 *  single object literal keeps every styled component on a single hidden
 *  class. */
const REACT_MEMO_TYPE = Symbol.for('react.memo');
import { SC_ATTR, SC_VERSION } from '../constants';
import { IS_RSC } from '../utils/isRsc';
import type StyleSheet from '../sheet';
import type {
  AnyComponent,
  Attrs,
  BaseObject,
  CompiledAst,
  Dict,
  ExecutionContext,
  ExecutionProps,
  IStyledComponent,
  Compiler,
  IStyledComponentFactory,
  IStyledStatics,
  OmitNever,
  RuleSet,
  StyledOptions,
  WebTarget,
} from '../types';
import { NodeKind, type Root, type TemplateValue } from '../parser/ast';
import { evaluateForFastPath, type FastPathFragment } from '../parser/compile';
import { getSource, Source } from '../parser/source';
import { themeValue } from '../utils/themePath';
import { tracePostAttr, type PostAttrsPlan } from '../utils/tracePostAttrs';
import { checkDynamicCreation } from '../utils/checkDynamicCreation';
import createWarnTooManyClasses, {
  LIMIT as TOO_MANY_CLASSES_LIMIT,
} from '../utils/createWarnTooManyClasses';
import { fifoSet } from '../utils/fifoMap';
import determineTheme from '../utils/determineTheme';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../utils/empties';
import escape from '../utils/escape';
import generateComponentId from '../utils/generateComponentId';
import getComponentName from '../utils/getComponentName';
import hoist from '../utils/hoist';
import isFunction from '../utils/isFunction';
import isStyledComponent from '../utils/isStyledComponent';
import isTag from '../utils/isTag';
import { joinRules, joinStrings, stripSplitter } from '../utils/joinStrings';
import { createRSCCache } from '../utils/rscCache';
import { setToString } from '../utils/setToString';
import shallowEqual from '../utils/shallowEqual';
import { warnOnce } from '../utils/warnOnce';
import WebStyle, { GeneratedStyle } from './WebStyle';
import { useStyleSheetContext } from './StyleSheetManager';
import { DefaultTheme, ThemeContext } from './ThemeProvider';

declare const __SERVER__: boolean;

const hasOwn = Object.prototype.hasOwnProperty;

const identifiers: { [key: string]: number } = {};

/**
 * Shared `toString` for styled components: returns `.styledComponentId` so
 * `${StyledFoo}` interpolation resolves to the class selector.
 */
function styledToString(this: { styledComponentId: string }): string {
    throw new Error("STUB");
}

/**
 * SC-specific statics are copied explicitly into the wrapper, so the
 * hoist pass must skip them or it would stomp the wrapper's own values.
 */
const HOIST_EXCLUDE = {
  attrs: true,
  webStyle: true,
  displayName: true,
  foldedComponentIds: true,
  shouldForwardProp: true,
  styledComponentId: true,
  target: true,
} as const;

/** Test-only: clear the per-displayName counter so component IDs stay stable
 *  across tests. Not for production use. */
export const resetIdentifiers = (): void => {
    throw new Error("STUB");
};

function generateId(
  displayName?: string | undefined,
  parentComponentId?: string | undefined
): string {
    throw new Error("STUB");
}

function useInjectedStyle<T extends ExecutionContext>(
  webStyle: WebStyle,
  resolvedAttrs: T,
  styleSheet: StyleSheet,
  compiler: Compiler
): string {
    throw new Error("STUB");
}

/**
 * RSC counterpart to `useInjectedStyle`. Runs `generate()` to produce the
 * inheritance chain's compiled CSS without writing to the tag; registers
 * each new class name so repeat renders of the same component/props skip
 * compilation. Returns both the class name (for the element) and the
 * generated levels (consumed by the inline <style> emission).
 */
function rscFlush<T extends ExecutionContext>(
  webStyle: WebStyle,
  resolvedAttrs: T,
  styleSheet: StyleSheet,
  compiler: Compiler
): GeneratedStyle {
    throw new Error("STUB");
}

// Cached render inputs + style result: [prevProps, prevTheme, prevStyleSheet, prevCompiler,
// prevPropsKeyCount, cachedContext, cachedClassName, prevWebStyle, popOverrides]
type RenderCache = [
  object, // prevProps
  DefaultTheme | undefined, // prevTheme
  StyleSheet, // prevStyleSheet
  Compiler, // prevCompiler
  number, // prevPropsKeyCount
  object, // cachedContext
  string, // cachedClassName
  WebStyle, // prevWebStyle (for HMR invalidation)
  Dict<string> | null, // popOverrides (post-compile attrs inline-style override)
];

function resolveContext<Props extends BaseObject>(
  attrs: Attrs<React.HTMLAttributes<Element> & Props>[],
  props: ExecutionProps & Props,
  theme: DefaultTheme | undefined
): React.HTMLAttributes<Element> & ExecutionContext & Props {
    throw new Error("STUB");
}

let seenUnknownProps: Set<string> | undefined;

/** Per-render tracking of emitted class names and keyframe IDs for RSC dedup. */
const getEmittedNames = createRSCCache(() => { throw new Error("STUB"); });

/**
 * Cache RegExp objects for :where() wrapping to avoid recompilation per
 * render. Bounded with FIFO eviction at the same threshold the
 * warn-too-many-classes machinery uses; without the cap, RSC SSR with
 * unbounded class-name variation would leak a regex per unique class.
 */
const whereRegExpCache = new Map<string, RegExp>();
function getWhereRegExp(name: string): RegExp {
    throw new Error("STUB");
}

function wrapLevelInWhere(levelCss: string, name: string): string {
    throw new Error("STUB");
}

/**
 * Resolve a `TemplateValue` (interleaved chunks + slot indices) against the
 * already-evaluated `filled[]` array. Mirrors the `chunks[0] + filled[s] +
 * chunks[1] + ...` join the parser produces, without allocating an
 * intermediate array.
 */
function resolveTemplateValue(tv: TemplateValue, filled: ReadonlyArray<string>): string {
  let s = tv.chunks[0];
  for (let i = 0; i < tv.slots.length; i++) {
    s += filled[tv.slots[i]] + tv.chunks[i + 1];
  }
  return s;
}

/**
 * Linear scan of the source AST for a top-level (non-nested) declaration
 * matching `prop`. Used by `ast.peek` / `ast.pop` to surface a CSS-style
 * value into the post-compile attrs callback without building a full Map
 * upfront. `filled` is the per-render evaluated interpolation array
 * (lazy;only requested when an attrs callback actually reads).
 */
function findBaseDecl(
  ast: Root,
  filled: ReadonlyArray<string> | null,
  prop: string
): string | undefined {
  for (let i = 0; i < ast.length; i++) {
    const node = ast[i];
    if (node.kind !== NodeKind.Decl) continue;
    if (typeof node.prop !== 'string' || node.prop !== prop) continue;
    const v = node.value;
    if (typeof v === 'string') return v;
    // Templated value: resolve interpolations against `filled`. If the
    // fast-path evaluator bailed (`filled === null`), the value is
    // unresolvable for this render; treat as absent.
    if (filled === null) return undefined;
    return resolveTemplateValue(v, filled);
  }
  return undefined;
}

/**
 * Post-compile attrs phase for the web runtime. Mirrors the native
 * counterpart: arity-2 attrs run after `resolveContext`, with an `ast`
 * accessor backed by a lazy walk over the source AST. Pop calls collect
 * keys into `popOverrides` so the caller can apply inline-style overrides
 * (CSS `unset`) to the rendered element;best-effort removal because the
 * emitted CSS class is hash-derived from the full decl set and cannot be
 * filtered per render without exploding the cache.
 *
 * Native fully removes the decl from the compiled style object; web
 * relies on the inline-style override. Documented asymmetry.
 */
/**
 * Merge an attrs-resolved dict into the execution context: `className` joins,
 * `style` shallow-merges, and every other key overwrites unless the user
 * explicitly passed `undefined` for it (which signals intent to reset the
 * value). The final `else` casts at the assignment site since attrs
 * intentionally add arbitrary keys to the resolved context.
 */
function mergeAttrDict<Props extends BaseObject>(
  context: React.HTMLAttributes<Element> & ExecutionContext & Props,
  props: ExecutionProps & Props,
  resolved: Dict<unknown>
): void {
    throw new Error("STUB");
}

function applyPostAttrsWeb<Props extends BaseObject>(
  context: React.HTMLAttributes<Element> & ExecutionContext & Props,
  props: ExecutionProps & Props,
  attrs: Attrs<React.HTMLAttributes<Element> & Props>[],
  plans: ReadonlyArray<PostAttrsPlan | null> | undefined,
  webStyle: WebStyle
): Dict<string> | null {
    throw new Error("STUB");
}

function hasPostAttrsWeb<Props extends BaseObject>(
  attrs: Attrs<React.HTMLAttributes<Element> & Props>[]
): boolean {
    throw new Error("STUB");
}

/**
 * Walk the final attrs chain and trace each arity-2 callback against the
 * component's rules. Output is parallel-indexed with the arity-2 entries
 * in iteration order (filter out arity-1 / object attrs). A `null` slot
 * means the callback couldn't be statically traced; the render path will
 * invoke the original function for that slot.
 */
function buildPostAttrsPlans<Props extends BaseObject>(
  attrs: Attrs<React.HTMLAttributes<Element> & Props>[],
  rules: RuleSet<Props>
): ReadonlyArray<PostAttrsPlan | null> {
    throw new Error("STUB");
}

function buildPropsForElement(
  context: Record<string, any>,
  elementToBeCreated: WebTarget,
  theme: DefaultTheme | undefined,
  shouldForwardProp: ((prop: string, el: WebTarget) => boolean) | undefined
): Dict<any> {
    throw new Error("STUB");
}

function useImpl<Props extends BaseObject>(
  forwardedComponent: IStyledComponent<'web', Props>,
  props: ExecutionProps & Props,
  forwardedRef: Ref<Element> | undefined
) {
    throw new Error("STUB");
}

function createStyledComponent<
  Target extends WebTarget,
  OuterProps extends BaseObject,
  Statics extends BaseObject = BaseObject,
>(
  target: Target,
  options: StyledOptions<'web', OuterProps>,
  rules: RuleSet<OuterProps>
): ReturnType<IStyledComponentFactory<'web', Target, OuterProps, Statics>> {
    throw new Error("STUB");
}

export default createStyledComponent;
