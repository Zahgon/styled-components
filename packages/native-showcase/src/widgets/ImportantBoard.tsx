import React from 'react';
import styled from 'styled-components/native';
import { theme as t } from '@/theme/tokens';
import { InlineMarkdown } from '../components/Markdown';

/**
 * `!important` on React Native. Within-component cascade: an
 * important declaration beats normal ones from any matched bucket
 * (base, `@media`, attribute, pseudo, etc.) regardless of source
 * order. The runtime `style={{}}` prop is overridden too, matching
 * the web's behavior on the same source CSS.
 */

const Stack = styled.View`
  gap: ${t.space.md}px;

  @media (min-aspect-ratio: 1/1) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const Row = styled.View`
  gap: ${t.space.xs}px;

  @media (min-aspect-ratio: 1/1) {
    flex: 1 1 45%;
    min-width: 280px;
  }
  @media (min-aspect-ratio: 4/3) {
    flex: 1 1 30%;
    min-width: 240px;
  }
`;

const Tag = styled.Text`
  font-family: ${t.fontFamily.monoStrong};
  font-size: ${t.fontSize.monoSm}px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: ${t.colors.fgFaint};
`;

const Frame = styled.View`
  border: ${t.borderWidth.hairline}px solid ${t.colors.border};
  padding: ${t.space.sm}px;
  background-color: ${t.colors.surface};
  gap: ${t.space.xs}px;
`;

const Pair = styled.View`
  flex-direction: row;
  gap: ${t.space.sm}px;
`;

/* Row 1 — side-by-side normal vs important. Both components author
   two color decls in the same source order; only the important
   marker flips which one wins. */
const NormalCascade = styled.Text`
  color: tomato;
  color: royalblue;
  font-family: ${t.fontFamily.monoStrong};
  font-size: ${t.fontSize.body}px;
  padding: ${t.space.xs}px ${t.space.sm}px;
  background-color: ${t.colors.surfaceMuted};
`;
const ImportantBeatsLater = styled.Text`
  color: tomato !important;
  color: royalblue;
  font-family: ${t.fontFamily.monoStrong};
  font-size: ${t.fontSize.body}px;
  padding: ${t.space.xs}px ${t.space.sm}px;
  background-color: ${t.colors.surfaceMuted};
`;

/* Row 2 — shorthand !important propagates to every longhand. The
   first shorthand sets symmetric padding; the second uses an asymmetric
   two-value with !important. The label sits flush against top/bottom
   and breathes left/right. */
const ShorthandImportant = styled.View`
  align-self: flex-start;
  padding: 24px 24px;
  padding: 2px 28px !important;
  background-color: tomato;
`;
const ShorthandLabel = styled.Text`
  font-family: ${t.fontFamily.monoStrong};
  font-size: ${t.fontSize.monoSm}px;
  color: white;
`;

/* Row 3 — conditional bucket. A media query body sets `color: blue`;
   the base has `color: red !important`. The matched bucket's normal
   value loses to the base important. Toggling the data-on attribute
   (always true here; the @media always matches) keeps the box red. */
const MatchedImportantHolds = styled.Text`
  color: tomato !important;
  @media (min-width: 0px) {
    color: royalblue;
  }
  font-family: ${t.fontFamily.monoStrong};
  font-size: ${t.fontSize.body}px;
  padding: ${t.space.xs}px ${t.space.sm}px;
  background-color: ${t.colors.surfaceMuted};
`;

/* Row 4 — conditional !important beats base !important. Same setup,
   but the matched bucket also carries !important. Among importants,
   source-later wins — the matched bucket's blue overrides. */
const MatchedImportantWins = styled.Text`
  color: tomato !important;
  @media (min-width: 0px) {
    color: royalblue !important;
  }
  font-family: ${t.fontFamily.monoStrong};
  font-size: ${t.fontSize.body}px;
  padding: ${t.space.xs}px ${t.space.sm}px;
  background-color: ${t.colors.surfaceMuted};
`;

/* Row 5 — !important overrides the runtime `style` prop. Web-aligned
   behavior; a styled important is an author declaration that beats
   the inline style attribute. The right box uses the same component
   but passes `style={{ backgroundColor: 'goldenrod' }}` — the
   styled !important wins; the user style is ignored. */
const SwatchBase = styled.View`
  background-color: tomato !important;
  width: 80px;
  height: 48px;
`;

/* The !important contest plays out on the Pressable's own background
   so it stays visible in both color schemes: the :active bucket's
   normal background-color loses to the base !important, while the
   bucket's opacity drop proves the press actually fired. */
const PressedNormal = styled.Pressable`
  align-self: flex-start;
  background-color: tomato !important;
  padding: ${t.space.xs}px ${t.space.sm}px;
  &:active {
    background-color: royalblue;
    opacity: 0.5;
  }
`;
const PressedLabel = styled.Text`
  font-family: ${t.fontFamily.monoStrong};
  font-size: ${t.fontSize.body}px;
  color: white;
`;

export function ImportantBoard() {
    throw new Error("STUB");
}
