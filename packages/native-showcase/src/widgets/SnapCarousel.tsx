import React, { useState } from 'react';
import styled from 'styled-components/native';
import { theme as t } from '@/theme/tokens';
import { InlineMarkdown, Markdown } from '../components/Markdown';

/**
 * CSS Scroll Snap 1 - `scroll-snap-type: x mandatory` on a
 * `styled.ScrollView` with `scroll-snap-align: start` on the cards, the
 * same two declarations the web needs. On native the scroller measures
 * its aligned children and derives `snapToOffsets`, with a settle
 * guarantee so mandatory always rests on a card. The top carousel snaps
 * crisply on every flick; the bottom carousel omits the declarations and
 * drifts to rest wherever momentum dies. The visual difference is the
 * demo.
 *
 * On rn-web the declarations pass through to the browser's own CSS
 * scroll snap. Both light and dark mode read through `light-dark()` so a
 * theme switch repaints without a React re-render.
 */

const Stack = styled.View`
  gap: ${t.space.md}px;
`;

const Section = styled.View`
  gap: ${t.space.xs}px;
`;

const SectionLabel = styled.Text`
  font-family: ${t.fontFamily.monoStrong};
  font-size: ${t.fontSize.monoSm}px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: light-dark(#6b6862, #9a968d);
`;

const Frame = styled.View`
  height: 160px;
  border: ${t.borderWidth.hairline}px solid light-dark(#0e0e10, #f5f3ee);
  background-color: light-dark(#ebe7df, #1a1a1d);
`;

// The only difference between the two scrollers is the one declaration.
// Card width is driven by the measured frame width below so each card fills
// the scrollport exactly, which is what makes the snap land on a whole card.
const SnapScroller = styled.ScrollView`
  scroll-snap-type: x mandatory;
`;

const FreeScroller = styled.ScrollView``;

// scroll-snap-align creates the snap positions: per css-scroll-snap-1 the
// scroller's scroll-snap-type alone defines no positions (align's initial
// value is none). The browser needs this declaration to snap at all; on
// iOS/Android the paging approximation snaps from the scroller side.
const Card = styled.View<{ $bg: string; $fg: string; $w: number }>`
  width: ${p => { throw new Error("STUB"); }}px;
  height: 160px;
  align-items: center;
  justify-content: center;
  background-color: ${p => { throw new Error("STUB"); }};
  scroll-snap-align: start;
`;

const CardLabel = styled.Text<{ $fg: string }>`
  font-family: ${t.fontFamily.heading};
  font-size: ${t.fontSize.display}px;
  color: ${p => { throw new Error("STUB"); }};
`;

const CardSub = styled.Text<{ $fg: string }>`
  font-family: ${t.fontFamily.mono};
  font-size: ${t.fontSize.monoSm}px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: ${p => { throw new Error("STUB"); }};
  opacity: 0.8;
`;

// Three full-bleed cards in saturated hues that read against both the light
// and the dark frame. The `light-dark()` text color keeps the glyphs legible
// when the card hue is close to one mode's background.
const CARDS = [
  { bg: '#e4572e', label: 'One' },
  { bg: '#2e86ab', label: 'Two' },
  { bg: '#3a7d44', label: 'Three' },
] as const;

// Each carousel measures its own scrollport (the ScrollView's layout box,
// inside the Frame border) and sizes cards to exactly that width. Paging
// snaps in full-scrollport steps, so any card/scrollport mismatch shows up
// as an accumulating sliver of the previous card at the left edge.
function Carousel({ Scroller }: { Scroller: typeof SnapScroller }) {
    throw new Error("STUB");
}

export function SnapCarousel() {
    throw new Error("STUB");
}
