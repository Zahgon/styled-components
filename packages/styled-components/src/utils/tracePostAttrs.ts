/**
 * Construction-time trace for arity-2 (`(props, ast) => ...`) attrs.
 *
 * The render-time fallback walks the source AST per `pop`/`peek` call ;
 * cheap, but still per-render work. For the common case where the
 * callback's behavior is fully determined by static base decls (no
 * interpolations, no `props` reads), we run it once at construction with
 * a recording `ast` whose `pop`/`peek` return the *real* resolved
 * declaration values. Whatever the callback returns is the static plan.
 *
 * Pre-resolving at trace time (rather than returning sentinel tokens)
 * means user operations like `ast.pop('color') ?? 'fallback'`,
 * `'#' + ast.peek('color')`, or `ast.pop('color').toUpperCase()` produce
 * the same result at trace time as they would at render time. The plan
 * is byte-equivalent to what the runtime path would compute.
 *
 * Bail (return null → runtime fallback) when:
 * - The callback throws.
 * - The callback reads any property of `props` (signaled via Proxy). The
 *   trace can't know which prop-conditional branches the callback would
 *   take at render time.
 * - A `pop`/`peek` call references a templated decl (resolution requires
 *   the per-render `filled[]` array; not available at construction).
 * - The return value is not a plain object (function, array, primitive).
 */
import { NodeKind, type Root } from '../parser/ast';
import { getSource } from '../parser/source';
import type { BaseObject, CompiledAst, Dict, RuleSet } from '../types';

export interface PostAttrsPlan {
  /** Pre-computed bag of element props to merge into context at render time. */
  output: Dict<unknown>;
  /** Decl keys that were popped;applied as inline overrides on web, dropped from base on native. */
  popped: ReadonlySet<string> | null;
}

/** Convert a kebab-case CSS prop to its camelCase form (no allocation when already camel). */
function camelizeProp(prop: string): string {
  if (prop.indexOf('-') === -1) return prop;
  let out = '';
  let toUpper = false;
  for (let i = 0; i < prop.length; i++) {
    const c = prop[i];
    if (c === '-') {
      toUpper = true;
      continue;
    }
    out += toUpper ? c.toUpperCase() : c;
    toUpper = false;
  }
  return out;
}

/**
 * Returns the literal value of a top-level decl matching `prop`.
 * - `string`: the static value
 * - `undefined`: decl absent
 * - `null`: decl exists but its value is templated, OR the source prop name
 *           differs from the user's argument (kebab vs camel rename) which
 *           signals a polyfilled prop whose runtime value may be transformed.
 *           Either case forces the runtime fallback.
 */
function findStaticBaseDecl(ast: Root, prop: string): string | undefined | null {
  const camelTarget = camelizeProp(prop);
  for (let i = 0; i < ast.length; i++) {
    const node = ast[i];
    if (node.kind !== NodeKind.Decl) continue;
    if (typeof node.prop !== 'string') continue;
    const exact = node.prop === prop;
    const camelMatch = !exact && camelizeProp(node.prop) === camelTarget;
    if (!exact && !camelMatch) continue;
    const v = node.value;
    if (typeof v !== 'string') return null;
    // Kebab-vs-camel mismatch: the runtime value may have been
    // transformed by a polyfill (e.g. `accent-color: auto` resolves to a
    // PlatformColor). Bail so the render path uses the resolved value.
    if (camelMatch) return null;
    return v;
  }
  return undefined;
}

export function tracePostAttr<Props extends BaseObject>(
  attr: (p: any, ast: CompiledAst) => any,
  rules: RuleSet<Props>
): PostAttrsPlan | null {
    throw new Error("STUB");
}
