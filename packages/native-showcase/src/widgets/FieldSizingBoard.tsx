import React, { useState } from 'react';
import styled from 'styled-components/native';
import { theme as t } from '@/theme/tokens';
import { InlineMarkdown } from '../components/Markdown';

/**
 * CSS Form Control Styling 1 §7.1: `field-sizing: content`.
 *
 * The autosizing TextInput grows in height as the user types; the
 * fixed reference holds its declared height. The polyfill opts the
 * component into multiline mode so React Native's own measure
 * callback takes over. The same declaration on rn-web is handed to
 * the browser's native `field-sizing` implementation (Chrome 123+).
 */

const Stack = styled.View`
  gap: ${t.space.md}px;
`;

const SplitWrap = styled.View`
  gap: ${t.space.md}px;

  @media (min-aspect-ratio: 1/1) {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
  }
`;

const Row = styled.View`
  gap: ${t.space.xs}px;

  @media (min-aspect-ratio: 1/1) {
    flex: 1 1 45%;
    min-width: 280px;
  }
`;

const Tag = styled.Text`
  font-family: ${t.fontFamily.monoStrong};
  font-size: ${t.fontSize.monoSm}px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: ${t.colors.fgFaint};
`;

const AutosizeInput = styled.TextInput`
  field-sizing: content;
  min-height: 44px;
  padding: ${t.space.xs}px ${t.space.sm}px;
  border: ${t.borderWidth.hairline}px solid ${t.colors.border};
  background-color: ${t.colors.surface};
  color: ${t.colors.ink};
  font-family: ${t.fontFamily.body};
  font-size: ${t.fontSize.body}px;
  line-height: 22px;
`;

const FixedInput = styled.TextInput`
  height: 44px;
  padding: ${t.space.xs}px ${t.space.sm}px;
  border: ${t.borderWidth.hairline}px solid ${t.colors.border};
  background-color: ${t.colors.surface};
  color: ${t.colors.ink};
  font-family: ${t.fontFamily.body};
  font-size: ${t.fontSize.body}px;
  line-height: 22px;
`;

export function FieldSizingBoard() {
    throw new Error("STUB");
}
