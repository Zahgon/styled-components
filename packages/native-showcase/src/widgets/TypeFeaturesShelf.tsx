import React from 'react';
import styled from 'styled-components/native';
import { theme as t } from '@/theme/tokens';

const Stack = styled.View`
  gap: ${t.space.md}px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  border-bottom-width: ${t.borderWidth.hairline}px;
  border-bottom-color: ${t.colors.border};
  padding-bottom: ${t.space.xs}px;
`;

const Tag = styled.Text`
  font-family: ${t.fontFamily.monoStrong};
  font-size: ${t.fontSize.monoSm}px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: ${t.colors.fgFaint};
`;

const TabularRow = styled(Row)`
  flex-direction: row;
  gap: ${t.space.md}px;
`;

const Numbers = styled.Text`
  font-family: ${t.fontFamily.mono};
  font-size: ${t.fontSize.body}px;
  color: ${t.colors.ink};
  font-variant: tabular-nums;
`;

const ProportionalNumbers = styled.Text`
  font-family: ${t.fontFamily.mono};
  font-size: ${t.fontSize.body}px;
  color: ${t.colors.ink};
  font-variant: proportional-nums;
`;

const Clamped = styled.Text`
  font-family: ${t.fontFamily.body};
  font-size: ${t.fontSize.body}px;
  color: ${t.colors.fg};
  line-clamp: 2;
`;

const Tracked = styled.Text`
  font-family: ${t.fontFamily.heading};
  font-size: ${t.fontSize.title}px;
  letter-spacing: 4px;
  color: ${t.colors.ink};
  text-transform: uppercase;
`;

const Decorated = styled.Text`
  font-family: ${t.fontFamily.body};
  font-size: ${t.fontSize.body}px;
  color: ${t.colors.ink};
  /* Vivid magenta for high-contrast against the body color, makes the
     "decoration color is independent of text color" demo obvious at a
     glance, especially on Android where the polyfill needs the patched
     react-native to honor the value. */
  text-decoration: underline #ff00aa;
`;

const Struck = styled.Text`
  font-family: ${t.fontFamily.body};
  font-size: ${t.fontSize.body}px;
  color: ${t.colors.ink};
  text-decoration: line-through #ff00aa;
`;

const DecoratedDouble = styled(Decorated)`
  text-decoration: underline double #ff00aa;
`;

const DecoratedDotted = styled(Decorated)`
  text-decoration: underline dotted #ff00aa;
`;

const DecoratedDashed = styled(Decorated)`
  text-decoration: underline dashed #ff00aa;
`;

const DecoratedWavy = styled(Decorated)`
  text-decoration: underline wavy #ff00aa;
`;

/* Generic font-family rows - each row applies a generic CSS keyword and
   prints the keyword itself, so the user can visually inspect the face
   the platform chose for that generic. CSS Fonts 4 §2.1.5. */
const GenericSerif = styled.Text`
  font-family: serif;
  font-size: ${t.fontSize.title}px;
  color: ${t.colors.ink};
`;

const GenericSansSerif = styled.Text`
  font-family: sans-serif;
  font-size: ${t.fontSize.title}px;
  color: ${t.colors.ink};
`;

const GenericMonospace = styled.Text`
  font-family: monospace;
  font-size: ${t.fontSize.title}px;
  color: ${t.colors.ink};
`;

const GenericSystemUI = styled.Text`
  font-family: system-ui;
  font-size: ${t.fontSize.title}px;
  color: ${t.colors.ink};
`;

const GenericUIRounded = styled.Text`
  font-family: ui-rounded;
  font-size: ${t.fontSize.title}px;
  color: ${t.colors.ink};
`;

const GenericCursive = styled.Text`
  font-family: cursive;
  font-size: ${t.fontSize.title}px;
  color: ${t.colors.ink};
`;

const LONG = `Line clamp truncates to N visible lines and adds an ellipsis on overflow. The text-input here is intentionally long so the clamp can do its job and prove that the polyfill maps to numberOfLines.`;

export function TypeFeaturesShelf() {
    throw new Error("STUB");
}

/* iOS / Android won't synthesize italic for a custom face - only the
   system font (sans-serif / System) has guaranteed italic glyphs in
   stock RN. The body theme face (Figtree) ships only upright variants,
   which would mask the polyfill's `fontStyle: 'italic'` output. Use
   system-ui so the slant is visible cross-platform. The `oblique
   <angle>` variant is intentionally not demoed: even with a slant-axis
   variable font (Recursive's slnt 0..-15deg), Expo's useFonts registers
   the font with no `font-style: oblique <range>` in its @font-face, so
   the browser falls back to closest-match instead of mapping the angle
   onto the variable axis. The only reliable way to drive slnt is
   `font-variation-settings: 'slnt' <n>`, which bypasses font-style
   entirely and wouldn't be exercising the polyfill. */
const Oblique = styled.Text`
  font-family: system-ui;
  font-size: ${t.fontSize.body}px;
  color: ${t.colors.ink};
  font-style: oblique;
`;

/* CSS Fonts 4 §2.5.1 absolute-size keywords resolve to a fixed pixel
   ramp on every platform (9, 10, 13, 16, 18, 24, 32, 48). Each
   declaration prints its keyword + expected pixel so the parity is
   inspectable at a glance. */
const SizeBase = styled.Text`
  font-family: ${t.fontFamily.body};
  color: ${t.colors.ink};
`;
const SizeXXSmall = styled(SizeBase)`
  font-size: xx-small;
`;
const SizeXSmall = styled(SizeBase)`
  font-size: x-small;
`;
const SizeSmall = styled(SizeBase)`
  font-size: small;
`;
const SizeMedium = styled(SizeBase)`
  font-size: medium;
`;
const SizeLarge = styled(SizeBase)`
  font-size: large;
`;
const SizeXLarge = styled(SizeBase)`
  font-size: x-large;
`;
const SizeXXLarge = styled(SizeBase)`
  font-size: xx-large;
`;
const SizeXXXLarge = styled(SizeBase)`
  font-size: xxx-large;
`;

/* §2.5.2 relative-size keywords step against the inherited cascade
   font-size. Pinning the parent to `medium` makes the `larger` /
   `smaller` neighbors land on the predictable adjacent ramp entries. */
const RelativeScope = styled.View`
  font-size: medium;
  gap: ${t.space.xxs}px;
`;
const RelativeBase = styled.Text`
  font-family: ${t.fontFamily.body};
  font-size: 1em;
  color: ${t.colors.ink};
`;
const RelativeLarger = styled.Text`
  font-family: ${t.fontFamily.body};
  font-size: larger;
  color: ${t.colors.ink};
`;
const RelativeSmaller = styled.Text`
  font-family: ${t.fontFamily.body};
  font-size: smaller;
  color: ${t.colors.ink};
`;
