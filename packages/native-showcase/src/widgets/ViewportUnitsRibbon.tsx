import React from 'react';
import styled from 'styled-components/native';
import { Markdown } from '@/components/Markdown';
import { theme as t } from '@/theme/tokens';

/**
 * Viewport units. CSS Values L4 §6.1.2 defines six families:
 * • `vh` / `vw` - UA-default viewport
 * • `dvh` / `dvw` - dynamic, recomputes as URL bars hide
 * • `svh` / `svw` - small, assumes browser chrome is visible
 * • `lvh` / `lvw` - large, assumes chrome is collapsed
 * plus `vmin` / `vmax` derived from the smaller/larger axis.
 *
 * On rn-web all six resolve against the actual visual viewport, so
 * `dvh` shifts as iOS Safari shrinks. On native iOS / Android there is
 * no URL-bar surface - the viewport never changes height - so
 * `dvh` / `svh` / `lvh` all collapse to a single value. The bars below
 * make that collapse explicit.
 */

const Stack = styled.View`
  gap: ${t.space.md}px;
`;

const Row = styled.View`
  gap: ${t.space.xxs}px;
`;

const RowLabel = styled.Text`
  font-family: ${t.fontFamily.monoStrong};
  font-size: ${t.fontSize.monoSm}px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: ${t.colors.ink};
`;

const Frame = styled.View`
  border: ${t.borderWidth.hairline}px solid ${t.colors.border};
  background-color: ${t.colors.surfaceMuted};
  padding: ${t.space.xs}px;
  gap: ${t.space.xxs}px;
`;

const Bar = styled.View`
  height: 14px;
  background-color: ${t.colors.ink};
`;

/* Width-axis ladder: distinct multipliers so the resolver's output is
   visually obvious. Capped at 40vw so the longest bar still fits its
   row gracefully on desktop. */
const Bar10vw = styled(Bar)`
  width: 10vw;
`;
const Bar20vw = styled(Bar)`
  width: 20vw;
`;
const Bar30vw = styled(Bar)`
  width: 30vw;
`;
const Bar40vw = styled(Bar)`
  width: 40vw;
`;

/* Variant comparison: same multiplier across vw / dvw / svw / lvw.
   On native all four collapse to the same length (no URL-bar surface
   to differentiate); on rn-web `dvw` flexes as the visual viewport
   resizes. Bars are intentionally identical when the polyfill works
   on native - the note in the row body explains why. */
const Bar25vwVariant = styled(Bar)`
  width: 25vw;
`;
const Bar25dvwVariant = styled(Bar)`
  width: 25dvw;
`;
const Bar25svwVariant = styled(Bar)`
  width: 25svw;
`;
const Bar25lvwVariant = styled(Bar)`
  width: 25lvw;
`;

/* Derived axes. Multipliers chosen so the bars differ visibly. */
const BarVmin25 = styled(Bar)`
  width: 25vmin;
`;
const BarVmax25 = styled(Bar)`
  width: 25vmax;
`;

const BarRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${t.space.sm}px;
`;

const BarTag = styled.Text`
  width: 64px;
  font-family: ${t.fontFamily.monoStrong};
  font-size: ${t.fontSize.monoSm}px;
  letter-spacing: 0.4px;
  color: ${t.colors.ink};
  text-transform: uppercase;
`;

const BarBox = styled.View`
  flex: 1;
`;

/* Height-axis ladder. Vertical bars at increasing multipliers; the
   row spreads them horizontally so the height differential is the
   readable variable. */
const HeightRow = styled.View`
  flex-direction: row;
  gap: ${t.space.sm}px;
  align-items: flex-end;
`;

const HeightCol = styled.View`
  flex: 1;
  align-items: center;
  gap: ${t.space.xxs}px;
`;

const HeightBlock = styled.View`
  width: 100%;
  background-color: ${t.colors.signalSoft};
  border: ${t.borderWidth.hairline}px solid ${t.colors.border};
`;

const Height4vh = styled(HeightBlock)`
  height: 4vh;
`;
const Height8vh = styled(HeightBlock)`
  height: 8vh;
`;
const Height12vh = styled(HeightBlock)`
  height: 12vh;
`;
const Height16vh = styled(HeightBlock)`
  height: 16vh;
`;

const HeightTag = styled.Text`
  font-family: ${t.fontFamily.monoStrong};
  font-size: ${t.fontSize.monoSm}px;
  letter-spacing: 0.4px;
  color: ${t.colors.ink};
  text-transform: uppercase;
`;

export function ViewportUnitsRibbon() {
    throw new Error("STUB");
}
