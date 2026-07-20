import React, { useState } from 'react';
import styled from 'styled-components/native';
import { theme as t } from '@/theme/tokens';
import { InlineMarkdown, Markdown } from '../components/Markdown';

/**
 * CSS UI 4 §6.3 - `accent-color: auto | <color>`. On RN the polyfill
 * lifts the resolved color onto `<Switch>.trackColor.true` so the
 * on-state surface tints to match. `accent-color: auto` resolves to
 * the platform `AccentColor` system color. Every visual cell is the
 * same `styled.Switch` with different CSS - no JS branching.
 */

const Stack = styled.View`
  gap: ${t.space.lg}px;
`;

const Section = styled.View`
  gap: ${t.space.sm}px;
`;

const SectionTitle = styled.Text`
  font-family: ${t.fontFamily.heading};
  font-size: ${t.fontSize.brief}px;
  color: ${t.colors.ink};
  letter-spacing: -0.2px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${t.space.sm}px;
  padding: ${t.space.xs}px 0;
  border-bottom-width: ${t.borderWidth.hairline}px;
  border-bottom-color: ${t.colors.rule};
`;

const RowLabel = styled.Text`
  flex: 1;
  font-family: ${t.fontFamily.mono};
  font-size: ${t.fontSize.mono}px;
  color: ${t.colors.fgMuted};
`;

const AutoSwitch = styled.Switch`
  accent-color: auto;
`;
const NamedSwitch = styled.Switch`
  accent-color: tomato;
`;
const HexSwitch = styled.Switch`
  accent-color: #1f7a52;
`;
const OklchSwitch = styled.Switch`
  accent-color: oklch(0.72 0.18 265);
`;
const ColorMixSwitch = styled.Switch`
  accent-color: color-mix(in oklch, #c8243a 50%, #ec4899 50%);
`;
const SystemSwitch = styled.Switch`
  accent-color: LinkText;
`;

// The library keeps accentColor in the style bag after the trackColor
// lift, so the attrs `ast.pop` recipe re-routes it to whatever tint
// prop the wrapped component expects. Demonstrated against a stubbed
// "Indicator" View whose chrome simply reads `tintColor`.
interface IndicatorProps {
  tintColor?: string;
  on?: boolean;
}
function Indicator({ tintColor, on }: IndicatorProps) {
    throw new Error("STUB");
}

const IndicatorOuter = styled.View`
  width: 44px;
  height: 24px;
  background-color: ${t.colors.surfaceMuted};
  border: ${t.borderWidth.hairline}px solid ${t.colors.border};
  justify-content: center;
`;

const IndicatorTrack = styled.View`
  position: absolute;
  inset: 0;
`;

const IndicatorThumb = styled.View`
  width: 18px;
  height: 18px;
  margin-left: 3px;
  background-color: ${t.colors.ink};
`;

const ThemedIndicator = styled(Indicator).attrs<{ tintColor?: string; on?: boolean }>(
  (props, ast) => { throw new Error("STUB"); }
)`
  accent-color: oklch(0.65 0.22 25);
`;

export function AccentColorBoard() {
    throw new Error("STUB");
}
