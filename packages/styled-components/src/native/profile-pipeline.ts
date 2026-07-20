/**
 * Microbench + CPU-profile harness for the native processing stack.
 *
 * Exercises the transform + compile pipeline across a range of input
 * flavors and sizes. Prints op/sec for each scenario (median over runs).
 *
 * Run with (from `packages/styled-components`; optional `--cpu-prof-dir=./.cpu-profiles`):
 *   bun src/native/profile-pipeline.ts
 *   bun --cpu-prof --cpu-prof-md --cpu-prof-name=native-profile --cpu-prof-dir=./.cpu-profiles src/native/profile-pipeline.ts
 *
 * The `--cpu-prof-md` flag emits a markdown summary of the heaviest
 * call stacks, which we cross-reference with bench numbers when
 * deciding what to optimize.
 */

import './bunProfileGlobals';

import { bench } from './profileHarness';
import { transformDecl } from './transform';
import { tokenize } from './transform/tokenize';
import { toNativeStyles, resetNativeStyleCache } from '../models/compileNative';
import { applyResolvers, ResolveEnv } from './transform/polyfills/resolvers';
import makeNativeStyleClass from '../models/NativeStyle';
import { assembleFinalStyle } from '../models/StyledNativeComponent';

const stubStyleSheet = { create: <T extends object>(s: T) => { throw new Error("STUB"); } } as any;
const NativeStyle = makeNativeStyleClass(stubStyleSheet);

// ────────────────────────────────────────────────────────────────────
// Single-decl flavors;measure transformDecl in isolation
// ────────────────────────────────────────────────────────────────────

console.log('\n=== transformDecl single-pair ===');
bench('passthrough (transform: scale(2))', 200_000, () => { throw new Error("STUB"); });
bench('numeric (padding-top: 8px)', 200_000, () => { throw new Error("STUB"); });
bench('hex color (color: #ff0000)', 200_000, () => { throw new Error("STUB"); });
bench('rgb color (color: rgb(200, 200, 200))', 200_000, () =>
  { throw new Error("STUB"); }
);
bench('shorthand 4-value (padding: 4px 8px 12px 16px)', 100_000, () =>
  { throw new Error("STUB"); }
);
bench('shorthand 1-value (padding: 8px)', 200_000, () => { throw new Error("STUB"); });
bench('border composite (1px solid #000)', 100_000, () =>
  { throw new Error("STUB"); }
);
bench('flex composite (1 1 0)', 100_000, () => { throw new Error("STUB"); });
bench('static math (clamp(10px, 50%, 400px))', 100_000, () =>
  { throw new Error("STUB"); }
);
bench('static color (oklch(0.5 0.1 180))', 50_000, () =>
  { throw new Error("STUB"); }
);
bench('color-mix (color-mix(in srgb, red, blue))', 50_000, () =>
  { throw new Error("STUB"); }
);
bench('viewport unit (height: 100vh)', 200_000, () => { throw new Error("STUB"); });
bench('sentinel (color: \\0sc:fg:#000)', 200_000, () => { throw new Error("STUB"); });
bench('logical shorthand (margin-inline: 8px 16px)', 100_000, () =>
  { throw new Error("STUB"); }
);
bench('text-shadow (1px 2px 4px black)', 100_000, () =>
  { throw new Error("STUB"); }
);

// ────────────────────────────────────────────────────────────────────
// Tokenizer in isolation
// ────────────────────────────────────────────────────────────────────

console.log('\n=== tokenize() ===');
bench('tokenize trivial (#fff)', 500_000, () => { throw new Error("STUB"); });
bench('tokenize medium (clamp(10px, 50%, 400px))', 200_000, () =>
  { throw new Error("STUB"); }
);
bench('tokenize complex (oklch(0.628 0.258 29.234 / 0.9))', 200_000, () =>
  { throw new Error("STUB"); }
);
bench('tokenize compound (4 8 12 16 px-mix)', 200_000, () => { throw new Error("STUB"); });

// ────────────────────────────────────────────────────────────────────
// toNativeStyles;full path including parser
// ────────────────────────────────────────────────────────────────────

const CSS_TINY = 'color: red;';
const CSS_SMALL = `
  color: red;
  padding: 8px;
  border-radius: 4px;
  flex: 1;
  font-size: 14px;
`;
const CSS_MEDIUM = `
  color: black;
  padding: 8px 16px;
  margin: 4px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  opacity: 0.95;
  width: 100%;
  height: 200px;
  text-align: center;
`;
const CSS_LARGE = (() => {
    throw new Error("STUB");
})();
const CSS_POLYFILL = `
  width: clamp(10px, 50vw, 400px);
  height: max(100px, 50vh);
  color: oklch(0.628 0.258 29.234);
  background-color: color-mix(in oklab, red, blue 30%);
  margin-inline: 8px 16px;
  padding-block: 4px 12px;
`;
const CSS_SENTINEL = `
  color: \0sc:colors.fg:#000000;
  background-color: \0sc:colors.bg:#ffffff;
  border-color: \0sc:colors.border:#cccccc;
  padding: 8px;
`;

console.log('\n=== toNativeStyles cold (cache reset each iter) ===');
bench('cold tiny (1 decl)', 20_000, () => {
    throw new Error("STUB");
});
bench('cold small (5 decls)', 10_000, () => {
    throw new Error("STUB");
});
bench('cold medium (15 decls)', 5_000, () => {
    throw new Error("STUB");
});
bench('cold large (medium + nested rules + at-rules)', 2_000, () => {
    throw new Error("STUB");
});
bench('cold polyfill-heavy', 5_000, () => {
    throw new Error("STUB");
});
bench('cold sentinel (createTheme)', 5_000, () => {
    throw new Error("STUB");
});

console.log('\n=== toNativeStyles warm (cache hit) ===');
bench('warm tiny', 1_000_000, () => { throw new Error("STUB"); });
bench('warm small', 1_000_000, () => { throw new Error("STUB"); });
bench('warm medium', 1_000_000, () => { throw new Error("STUB"); });
bench('warm large', 500_000, () => { throw new Error("STUB"); });
bench('warm polyfill', 500_000, () => { throw new Error("STUB"); });
bench('warm sentinel', 500_000, () => { throw new Error("STUB"); });

// ────────────────────────────────────────────────────────────────────
// applyResolvers;render-time pass over compiled output
// ────────────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────────────
// NativeStyle.compile;the actual per-render entry point used by
// StyledNativeComponent. Static-rules fast-path lives here.
// ────────────────────────────────────────────────────────────────────

console.log('\n=== NativeStyle.compile (per-render entry) ===');
const isStaticTiny = new NativeStyle([CSS_TINY] as any);
const isStaticSmall = new NativeStyle([CSS_SMALL] as any);
const isStaticMedium = new NativeStyle([CSS_MEDIUM] as any);
const isStaticLarge = new NativeStyle([CSS_LARGE] as any);
const isDynamicTiny = new NativeStyle(['color: ', (p: any) => { throw new Error("STUB"); }, ';'] as any);
const isDynamicMedium = new NativeStyle([
  CSS_MEDIUM + ' color: ',
  (p: any) => { throw new Error("STUB"); },
  ';',
] as any);
// Dynamic but the function output is stable (e.g., theme token doesn't change)
const isDynamicStable = new NativeStyle([
  'color: ',
  (p: any) => { throw new Error("STUB"); },
  '; padding: 8px;',
] as any);

const ctx: any = { theme: { primary: '#333' }, $color: 'red' };

bench('static tiny;NativeStyle.compile', 5_000_000, () => { throw new Error("STUB"); });
bench('static small;NativeStyle.compile', 5_000_000, () => { throw new Error("STUB"); });
bench('static medium;NativeStyle.compile', 5_000_000, () => { throw new Error("STUB"); });
bench('static large;NativeStyle.compile', 5_000_000, () => { throw new Error("STUB"); });
bench(
  'dynamic tiny;NativeStyle.compile (varying prop)',
  1_000_000,
  (() => {
      throw new Error("STUB");
  })()
);
bench(
  'dynamic medium;NativeStyle.compile (varying prop)',
  500_000,
  (() => {
      throw new Error("STUB");
  })()
);
// Stable output dedup: prop varies but CSS function returns same string
bench(
  'dynamic stable output;varying unrelated prop',
  5_000_000,
  (() => {
      throw new Error("STUB");
  })()
);

console.log('\n=== applyResolvers (render-time pass) ===');
const compiledNoResolvers = toNativeStyles(CSS_MEDIUM, stubStyleSheet);
const compiledWithResolvers = toNativeStyles(
  'width: 100vw; height: 50vh; color: light-dark(white, black); padding-top: env(safe-area-inset-top, 0);',
  stubStyleSheet
);
const compiledSentinel = toNativeStyles(CSS_SENTINEL, stubStyleSheet);

const env: ResolveEnv = {
  media: {
    width: 375,
    height: 812,
    colorScheme: 'light',
    reduceMotion: false,
    fontScale: 1,
    pixelRatio: 2,
  } as any,
  container: null,
  theme: { colors: { fg: '#111', bg: '#fff', border: '#ddd' } },
  insets: { top: 47, right: 0, bottom: 34, left: 0 },
  rootFontSize: 16,
  fontSize: 16,
  lineHeight: 24,
  direction: 'ltr',
  customProperties: null,
};

bench('apply (no resolvers;fast path)', 5_000_000, () => {
    throw new Error("STUB");
});
bench('apply (4 resolvers)', 1_000_000, () => {
    throw new Error("STUB");
});
bench('apply (3 sentinel resolvers)', 1_000_000, () => {
    throw new Error("STUB");
});

// ────────────────────────────────────────────────────────────────────
// assembleFinalStyle (render-path conditional dispatch)
// ────────────────────────────────────────────────────────────────────

console.log('\n=== assembleFinalStyle (conditional dispatch) ===');

const CSS_MIXED_CONDITIONALS = `
  color: black;
  padding: 8px;
  @media (min-width: 400px) { padding: 16px; }
  @media (min-width: 800px) { padding: 24px; }
  @container (min-width: 300px) { color: blue; }
  &[data-state="open"] { color: purple; }
  &[aria-pressed="true"] { background-color: #eee; }
  &:hover { color: orange; }
  &:focus { color: cyan; }
  &:active { opacity: 0.7; }
  &:disabled { opacity: 0.3; }
  &[disabled]:hover { opacity: 0.5; }
`;

resetNativeStyleCache();
const compiledMixed = toNativeStyles(CSS_MIXED_CONDITIONALS, stubStyleSheet);

const mediaEnv: any = {
  width: 375,
  height: 812,
  colorScheme: 'light',
  reduceMotion: false,
  fontScale: 1,
  pixelRatio: 2,
};
const containerCtx: any = { named: new Map(), nearest: null };
const themeObj: any = {};
const elementProps: any = { 'data-state': 'closed' };

// Per-render path: matchConditionals walks `nonPseudoEntries`.
bench('assembleFinalStyle mixed (per-render)', 500_000, () =>
  { throw new Error("STUB"); }
);

// Per-state-callback path: pseudoStylesForState walks `pseudoEntries`.
const stateCallback = assembleFinalStyle(
  compiledMixed,
  mediaEnv,
  containerCtx,
  themeObj,
  undefined,
  elementProps
);
const hoveredState = { hovered: true };
bench('pseudoStylesForState hovered (state callback)', 1_000_000, () =>
  { throw new Error("STUB"); }
);

console.log('\nDone.');
