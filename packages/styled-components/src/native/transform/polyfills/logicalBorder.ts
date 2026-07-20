import { Dict } from '../../../types';
import { warnOnce } from '../dev';
import { register } from '../shorthands';
import {
  colorTokenToRnStyleValue,
  consumeColor,
  consumeDimensionLike,
  tokenToValue,
  withoutSlashes,
} from '../shorthandHelpers';
import { Token, TokenKind } from '../tokens';
import { TokenStream } from '../tokenStream';

/**
 * `border-inline-*` and `border-block-*` longhands + shorthands. Under
 * RN's horizontal-tb writing mode:
 *
 *   inline-start → RN `borderStart*`
 *   inline-end   → RN `borderEnd*`
 *   block-start  → RN `borderTop*`
 *   block-end    → RN `borderBottom*`
 *
 * RN 0.85 has no per-edge `borderStyle`; the whole-element `borderStyle`
 * is the only surface. Style longhands warn and drop.
 */

const CSS_LINE_STYLES = new Set([
  'none',
  'hidden',
  'dotted',
  'dashed',
  'solid',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset',
]);

interface EdgeMapping {
  width: string;
  color: string;
}

const EDGE_MAP: Record<'inline-start' | 'inline-end' | 'block-start' | 'block-end', EdgeMapping> = {
  'inline-start': { width: 'borderStartWidth', color: 'borderStartColor' },
  'inline-end': { width: 'borderEndWidth', color: 'borderEndColor' },
  'block-start': { width: 'borderTopWidth', color: 'borderTopColor' },
  'block-end': { width: 'borderBottomWidth', color: 'borderBottomColor' },
};

function warnNoPerEdgeStyle(edge: string, value: string): void {
  if (!__DEV__) return;
  warnOnce(
    'native-border-per-edge-style',
    'Per-edge `border-' +
      edge +
      '-style: ' +
      value +
      '` is ignored on React Native because iOS and Android only support one `border-style` for the whole element. Use `border-style` for a uniform style.',
    edge + ':' + value
  );
}

function camelEdge(edge: string): string {
  return edge
    .split('-')
    .map(p => { throw new Error("STUB"); })
    .join('');
}

/* ─────────── 12 single-edge longhands ─────────── */

function singleColor(tokens: Token[], rnKey: string): Dict<any> | null {
  const stream = new TokenStream(withoutSlashes(tokens));
  const c = consumeColor(stream);
  if (c === null || !stream.eof()) return null;
  return { [rnKey]: colorTokenToRnStyleValue(c) };
}

function singleWidth(tokens: Token[], rnKey: string): Dict<any> | null {
  const stream = new TokenStream(withoutSlashes(tokens));
  const w = consumeDimensionLike(stream);
  if (w === null || !stream.eof()) return null;
  return { [rnKey]: tokenToValue(w) };
}

function singleStyle(tokens: Token[], edge: string): Dict<any> | null {
  const stream = new TokenStream(withoutSlashes(tokens));
  const t = stream.consume();
  if (!t || t.kind !== TokenKind.Ident || !stream.eof()) return null;
  const name = t.name;
  if (name === undefined || !CSS_LINE_STYLES.has(name)) return null;
  if (__NATIVE_WEB__) {
    return { ['border' + camelEdge(edge) + 'Style']: name };
  }
  // `solid` matches RN's default border style on every edge, so the
  // declaration renders identically with or without per-edge support;
  // accept it silently and only warn for styles RN would visibly miss.
  if (name !== 'solid') warnNoPerEdgeStyle(edge, name);
  return {};
}

/* ─────────── 6 axis shorthands ─────────── */

function axisColor(tokens: Token[], axis: 'inline' | 'block'): Dict<any> | null {
  const stream = new TokenStream(withoutSlashes(tokens));
  const first = consumeColor(stream);
  if (first === null) return null;
  let second = first;
  if (!stream.eof()) {
    const s = consumeColor(stream);
    if (s === null) return null;
    second = s;
  }
  if (!stream.eof()) return null;
  const startEdge = axis === 'inline' ? 'inline-start' : 'block-start';
  const endEdge = axis === 'inline' ? 'inline-end' : 'block-end';
  return {
    [EDGE_MAP[startEdge].color]: colorTokenToRnStyleValue(first),
    [EDGE_MAP[endEdge].color]: colorTokenToRnStyleValue(second),
  };
}

function axisWidth(tokens: Token[], axis: 'inline' | 'block'): Dict<any> | null {
  const stream = new TokenStream(withoutSlashes(tokens));
  const first = consumeDimensionLike(stream);
  if (first === null) return null;
  let second = first;
  if (!stream.eof()) {
    const s = consumeDimensionLike(stream);
    if (s === null) return null;
    second = s;
  }
  if (!stream.eof()) return null;
  const startEdge = axis === 'inline' ? 'inline-start' : 'block-start';
  const endEdge = axis === 'inline' ? 'inline-end' : 'block-end';
  return {
    [EDGE_MAP[startEdge].width]: tokenToValue(first),
    [EDGE_MAP[endEdge].width]: tokenToValue(second),
  };
}

function axisStyle(tokens: Token[], axis: 'inline' | 'block'): Dict<any> | null {
  const stream = new TokenStream(withoutSlashes(tokens));
  const first = stream.consume();
  if (!first || first.kind !== TokenKind.Ident) return null;
  const firstName = first.name;
  if (firstName === undefined || !CSS_LINE_STYLES.has(firstName)) return null;

  let secondName = firstName;
  if (!stream.eof()) {
    const second = stream.consume();
    if (!second || second.kind !== TokenKind.Ident) return null;
    const sn = second.name;
    if (sn === undefined || !CSS_LINE_STYLES.has(sn)) return null;
    secondName = sn;
  }
  if (!stream.eof()) return null;

  if (__NATIVE_WEB__) {
    const startEdge = axis === 'inline' ? 'inline-start' : 'block-start';
    const endEdge = axis === 'inline' ? 'inline-end' : 'block-end';
    return {
      ['border' + camelEdge(startEdge) + 'Style']: firstName,
      ['border' + camelEdge(endEdge) + 'Style']: secondName,
    };
  }
  // Uniform `solid` matches RN's default border style; see singleStyle.
  if (firstName !== 'solid' || secondName !== 'solid') {
    warnNoPerEdgeStyle(axis, firstName + (firstName !== secondName ? ' ' + secondName : ''));
  }
  return {};
}

/* ─────────── 4 composite single-edge shorthands ─────────── */

/**
 * Shared width/style/color scan for the composite and mode-spanning border
 * shorthands: any order, at most one of each, returns null on an
 * unrecognized token or when nothing was consumed.
 */
function parseEdgeAttrs(
  tokens: Token[]
): { width: Token | null; style: string | null; color: Token | null } | null {
  const stream = new TokenStream(withoutSlashes(tokens));
  let width: Token | null = null;
  let style: string | null = null;
  let color: Token | null = null;

  while (!stream.eof()) {
    const t = stream.peek();
    if (!t) break;
    if (t.kind === TokenKind.Ident && t.name !== undefined && CSS_LINE_STYLES.has(t.name)) {
      if (style !== null) return null;
      style = t.name;
      stream.consume();
      continue;
    }
    if (width === null) {
      const w = consumeDimensionLike(stream);
      if (w !== null) {
        width = w;
        continue;
      }
    }
    if (color === null) {
      const c = consumeColor(stream);
      if (c !== null) {
        color = c;
        continue;
      }
    }
    return null;
  }

  if (width === null && style === null && color === null) return null;

  return { width, style, color };
}

function compositeEdge(
  tokens: Token[],
  edge: 'inline-start' | 'inline-end' | 'block-start' | 'block-end'
): Dict<any> | null {
  const attrs = parseEdgeAttrs(tokens);
  if (attrs === null) return null;
  const { width, style, color } = attrs;

  const out: Dict<any> = {};
  const map = EDGE_MAP[edge];
  if (width !== null) out[map.width] = tokenToValue(width);
  if (color !== null) out[map.color] = colorTokenToRnStyleValue(color);
  if (style !== null) {
    if (__NATIVE_WEB__) {
      out['border' + camelEdge(edge) + 'Style'] = style;
    } else {
      warnNoPerEdgeStyle(edge, style);
    }
  }
  return out;
}

/* ─────────── 2 mode-spanning shorthands ─────────── */

function modeSpanning(tokens: Token[], axis: 'inline' | 'block'): Dict<any> | null {
  const startEdge = axis === 'inline' ? 'inline-start' : 'block-start';
  const endEdge = axis === 'inline' ? 'inline-end' : 'block-end';
  const attrs = parseEdgeAttrs(tokens);
  if (attrs === null) return null;
  const { width, style, color } = attrs;

  const out: Dict<any> = {};
  const startMap = EDGE_MAP[startEdge];
  const endMap = EDGE_MAP[endEdge];
  if (width !== null) {
    const v = tokenToValue(width);
    out[startMap.width] = v;
    out[endMap.width] = v;
  }
  if (color !== null) {
    const cv = colorTokenToRnStyleValue(color);
    out[startMap.color] = cv;
    out[endMap.color] = cv;
  }
  if (style !== null) {
    if (__NATIVE_WEB__) {
      out['border' + camelEdge(startEdge) + 'Style'] = style;
      out['border' + camelEdge(endEdge) + 'Style'] = style;
    } else {
      warnNoPerEdgeStyle(axis, style);
    }
  }
  return out;
}

/* ─────────── outline-style: hidden targeted warn ─────────── */

const RN_OUTLINE_STYLES = new Set(['solid', 'dotted', 'dashed']);
const WEB_ONLY_OUTLINE_STYLES = new Set(['auto', 'double', 'groove', 'ridge', 'inset', 'outset']);

function outlineStyleHandler(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

/* ─────────── Registration ─────────── */

// 12 longhands
register('borderInlineStartColor', tokens => { throw new Error("STUB"); });
register('borderInlineEndColor', tokens => { throw new Error("STUB"); });
register('borderBlockStartColor', tokens => { throw new Error("STUB"); });
register('borderBlockEndColor', tokens => { throw new Error("STUB"); });

register('borderInlineStartWidth', tokens => { throw new Error("STUB"); });
register('borderInlineEndWidth', tokens => { throw new Error("STUB"); });
register('borderBlockStartWidth', tokens => { throw new Error("STUB"); });
register('borderBlockEndWidth', tokens => { throw new Error("STUB"); });

register('borderInlineStartStyle', tokens => { throw new Error("STUB"); });
register('borderInlineEndStyle', tokens => { throw new Error("STUB"); });
register('borderBlockStartStyle', tokens => { throw new Error("STUB"); });
register('borderBlockEndStyle', tokens => { throw new Error("STUB"); });

// 6 axis shorthands
register('borderInlineColor', tokens => { throw new Error("STUB"); });
register('borderInlineWidth', tokens => { throw new Error("STUB"); });
register('borderInlineStyle', tokens => { throw new Error("STUB"); });
register('borderBlockColor', tokens => { throw new Error("STUB"); });
register('borderBlockWidth', tokens => { throw new Error("STUB"); });
register('borderBlockStyle', tokens => { throw new Error("STUB"); });

// 4 composite single-edge shorthands
register('borderInlineStart', tokens => { throw new Error("STUB"); });
register('borderInlineEnd', tokens => { throw new Error("STUB"); });
register('borderBlockStart', tokens => { throw new Error("STUB"); });
register('borderBlockEnd', tokens => { throw new Error("STUB"); });

// 2 mode-spanning shorthands
register('borderInline', tokens => { throw new Error("STUB"); });
register('borderBlock', tokens => { throw new Error("STUB"); });

// outline-style:hidden targeted warn (replaces fall-through to
// native-shorthand-parse)
register('outlineStyle', outlineStyleHandler);
