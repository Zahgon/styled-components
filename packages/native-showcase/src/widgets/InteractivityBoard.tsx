import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { theme as t } from '@/theme/tokens';
import { InlineMarkdown } from '../components/Markdown';

/**
 * CSS UI 4 §5.7 - `interactivity: auto | inert`.
 *
 * `inert` is lifted into a multi-prop bundle (pointerEvents,
 * accessibilityElementsHidden, importantForAccessibility, focusable).
 * The visible proof: the button inside the inert wrapper does not
 * respond to taps; the button outside does.
 */

const Stack = styled.View`
  gap: ${t.space.md}px;
`;

const SplitWrap = styled.View`
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

const Wrapper = styled.View`
  border: ${t.borderWidth.hairline}px solid ${t.colors.border};
  padding: ${t.space.sm}px;
  background-color: ${t.colors.surface};
  gap: ${t.space.xs}px;
`;

const InertWrapper = styled(Wrapper)`
  interactivity: inert;
`;

const Btn = styled.Pressable`
  align-self: flex-start;
  padding: ${t.space.xs}px ${t.space.sm}px;
  border: ${t.borderWidth.hairline}px solid ${t.colors.border};
  background-color: ${t.colors.ink};
`;

const BtnLabel = styled.Text`
  font-family: ${t.fontFamily.monoStrong};
  font-size: ${t.fontSize.monoSm}px;
  letter-spacing: 0.6px;
  color: ${t.colors.bg};
  text-transform: uppercase;
`;

const Counter = styled.Text`
  font-family: ${t.fontFamily.mono};
  font-size: ${t.fontSize.body}px;
  color: ${t.colors.ink};
`;

export function InteractivityBoard() {
    throw new Error("STUB");
}
