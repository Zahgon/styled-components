import React, { useState } from 'react';
import styled from 'styled-components/native';
import { lightTheme, theme as t } from '@/theme/tokens';

const Toolbar = styled.View`
  flex-direction: row;
  gap: ${t.space.xs}px;
`;

const Toggle = styled.Pressable`
  padding: 5px 12px;
  border: ${t.borderWidth.hairline}px solid ${t.colors.border};
  background-color: ${t.colors.bg};

  &[aria-pressed='true'] {
    background-color: ${t.colors.ink};
  }
`;

const ToggleLabel = styled.Text`
  font-family: ${t.fontFamily.monoStrong};
  font-size: ${t.fontSize.monoSm}px;
  letter-spacing: 0.8px;
  color: ${t.colors.ink};
  text-transform: uppercase;

  &[aria-pressed='true'] {
    color: ${t.colors.bg};
  }
`;

const Board = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${t.space.sm}px;
  border: ${t.borderWidth.hairline}px solid ${t.colors.border};
  padding: ${t.space.xs}px;
  /* Establish a layout container so the calc(%) inside Cell resolves
     against this Board's measured width on native, not the viewport. */
  container-type: inline-size;
`;

const Cell = styled.View<{ $cols: number; $span?: number }>`
  background-color: ${t.colors.surfaceMuted};
  border: ${t.borderWidth.hairline}px solid ${t.colors.border};
  height: 56px;
  align-items: center;
  justify-content: center;
  flex-grow: 0;
  flex-shrink: 0;
  width: ${p => {
    throw new Error("STUB");
}};
`;

const Span2 = styled(Cell)`
  background-color: ${t.colors.ink};
`;

const SpanLabel = styled.Text`
  font-family: ${t.fontFamily.monoStrong};
  font-size: ${t.fontSize.monoSm}px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: ${t.colors.bg};
`;

const Tag = styled.Text`
  font-family: ${t.fontFamily.mono};
  font-size: ${t.fontSize.mono}px;
  color: ${t.colors.fgMuted};
`;

export function GridLayoutBoard() {
    throw new Error("STUB");
}
