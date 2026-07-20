import { SC_ATTR } from '../constants';
import { splitTopLevelCommas } from '../parser/parser';
import * as $ from '../utils/charCodes';
import { isEscaped } from '../utils/normalize';

// RSC selector rewrites: child-index pseudos use Selectors L4 `of S` syntax,
// `+` combinators expand with style-tag-tolerant alternates. Both adapt for
// inline `<style data-styled>` tags appearing as real DOM children.

const CHILD_RE =
  /:(?:(first)-child|(last)-child|(only)-child|(nth-child)\(([^()]+)\)|(nth-last-child)\(([^()]+)\))/g;

const EXCLUDE = `:not(style[${SC_ATTR}])`;
const STYLE_TAG = `style[${SC_ATTR}]`;

function rewriteChildPseudos(selector: string): string {
    throw new Error("STUB");
}

function expandAdjacentSibling(selector: string, out: string[]): void {
    throw new Error("STUB");
}

/**
 * Apply child-pseudo rewrite and sibling-combinator expansion to every
 * comma-separated part of a resolved selector. Returns a single comma-joined
 * string suitable for CSS output.
 */
export function rewriteSelectorForRSC(selector: string): string {
    throw new Error("STUB");
}
