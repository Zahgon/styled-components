import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { theme as t } from '@/theme/tokens';

const Container = styled.View<{ $topInset: number; $rightInset: number }>`
  position: absolute;
  top: calc(${p => { throw new Error("STUB"); }}px + ${t.space.xs}px);
  right: calc(${p => { throw new Error("STUB"); }}px + ${t.space.md}px);
  flex-direction: row;
  align-items: center;
  gap: ${t.space.xs}px;
  padding: ${t.space.xxs}px ${t.space.xs}px;
  background-color: ${t.colors.surfaceMuted};
  border-width: ${t.borderWidth.hairline}px;
  border-color: ${t.colors.border};
  pointer-events: none;
  z-index: 1000;
`;

const Dot = styled.View<{ $color: string }>`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: ${p => { throw new Error("STUB"); }};
`;

const Label = styled.Text`
  font-family: ${t.fontFamily.monoStrong};
  font-size: ${t.fontSize.monoSm}px;
  color: ${t.colors.ink};
  letter-spacing: 0.5px;
`;

const SAMPLE_MS = 500;
const WARN_FPS = 55;
const FAIL_FPS = 30;

/**
 * Sticky overlay that samples frames over a 500ms window via
 * requestAnimationFrame. Re-renders only when the integer FPS value
 * changes so the meter doesn't pollute its own measurement.
 */
export function FpsMeter() {
    throw new Error("STUB");
}
