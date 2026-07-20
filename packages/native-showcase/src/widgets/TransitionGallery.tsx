import React, { useEffect, useState } from 'react';
import styled, { useMediaEnv } from 'styled-components/native';
import { theme as t } from '@/theme/tokens';

/**
 * Demonstrates every transition shape the v7 Animated adapter supports.
 *
 * All rows auto-rotate in sync at the same cadence as the BlendModeBoard
 * (`HOLD_MS + TRANSITION_MS`). Tapping a row still flips the global
 * state for an immediate manual toggle; the next tick continues from
 * there. Reduce-motion stops the auto-rotation entirely.
 *
 * The underlying CSS per row is the only source of truth for HOW each
 * property animates - no Animated API consumed at the widget layer.
 */

const HOLD_MS = 600;
const TRANSITION_MS = 1200;

const RowFrame = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: ${t.space.sm}px;
  padding: ${t.space.xs}px ${t.space.sm}px;
  border: ${t.borderWidth.hairline}px solid ${t.colors.border};
  background-color: ${t.colors.bg};
`;

const RowLabel = styled.Text`
  flex: 1;
  font-family: ${t.fontFamily.monoStrong};
  font-size: ${t.fontSize.monoSm}px;
  letter-spacing: 0.6px;
  color: ${t.colors.ink};
  text-transform: uppercase;
`;

const Stack = styled.View`
  gap: ${t.space.sm}px;
`;

// --- Per-property transition cells (the load-bearing part) ---

const OpacityCell = styled.View<{ $on: boolean }>`
  width: 56px;
  height: 24px;
  background-color: ${t.colors.ink};
  opacity: ${p => { throw new Error("STUB"); }};
  transition: opacity 320ms ease-in-out;
`;

const BackgroundCell = styled.View<{ $on: boolean }>`
  width: 56px;
  height: 24px;
  background-color: ${p => { throw new Error("STUB"); }};
  transition: background-color 320ms ease-in-out;
`;

const ColorCell = styled.Text<{ $on: boolean }>`
  width: 56px;
  font-family: ${t.fontFamily.monoStrong};
  font-size: ${t.fontSize.monoSm}px;
  text-align: center;
  color: ${p => { throw new Error("STUB"); }};
  transition: color 320ms ease-in-out;
`;

const BorderColorCell = styled.View<{ $on: boolean }>`
  width: 56px;
  height: 24px;
  background-color: ${t.colors.bg};
  border: ${t.borderWidth.heavy}px solid ${p => { throw new Error("STUB"); }};
  transition: border-color 320ms ease-in-out;
`;

const RadiusCell = styled.View<{ $on: boolean }>`
  width: 24px;
  height: 24px;
  background-color: ${t.colors.ink};
  border-radius: ${p => { throw new Error("STUB"); }}px;
  transition: border-radius 320ms ease-in-out;
`;

const TransformScaleCell = styled.View<{ $on: boolean }>`
  width: 24px;
  height: 24px;
  background-color: ${t.colors.ink};
  transform: scale(${p => { throw new Error("STUB"); }});
  transition: transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1);
`;

const TransformRotateCell = styled.View<{ $on: boolean }>`
  width: 24px;
  height: 24px;
  background-color: ${t.colors.ink};
  transform: rotate(${p => { throw new Error("STUB"); }}deg);
  transition: transform 320ms ease-in-out;
`;

const TransformTranslateCell = styled.View<{ $on: boolean }>`
  width: 24px;
  height: 24px;
  background-color: ${t.colors.ink};
  transform: translateX(${p => { throw new Error("STUB"); }}px);
  transition: transform 320ms ease-out;
`;

const TransformCompoundCell = styled.View<{ $on: boolean }>`
  width: 24px;
  height: 24px;
  background-color: ${t.colors.ink};
  transform: ${p =>
    { throw new Error("STUB"); }};
  transition: transform 320ms ease-in-out;
`;

const TransformDisjointCell = styled.View<{ $on: boolean }>`
  width: 24px;
  height: 24px;
  background-color: ${t.colors.ink};
  transform: ${p => { throw new Error("STUB"); }};
  transition: transform 320ms ease-in-out;
`;

const WidthCell = styled.View<{ $on: boolean }>`
  width: ${p => { throw new Error("STUB"); }}px;
  height: 24px;
  background-color: ${t.colors.ink};
  transition: width 320ms ease-out;
`;

const PaddingCell = styled.View<{ $on: boolean }>`
  padding-left: ${p => { throw new Error("STUB"); }}px;
  background-color: ${t.colors.bg};
  border: ${t.borderWidth.hairline}px solid ${t.colors.border};
  transition: padding-left 320ms ease-out;
`;

const PaddingDot = styled.View`
  width: 24px;
  height: 24px;
  background-color: ${t.colors.ink};
`;

const MultiPropCell = styled.View<{ $on: boolean }>`
  width: 24px;
  height: 24px;
  background-color: ${p => { throw new Error("STUB"); }};
  border-radius: ${p => { throw new Error("STUB"); }}px;
  opacity: ${p => { throw new Error("STUB"); }};
  transform: rotate(${p => { throw new Error("STUB"); }}deg);
  transition:
    background-color 320ms ease-in-out,
    border-radius 320ms ease-in-out,
    opacity 320ms ease-in-out,
    transform 320ms ease-in-out;
`;

const AllPropCell = styled.View<{ $on: boolean }>`
  width: ${p => { throw new Error("STUB"); }}px;
  height: 24px;
  background-color: ${p => { throw new Error("STUB"); }};
  transition: all 320ms ease-out;
`;

const SteppedCell = styled.View<{ $on: boolean }>`
  width: 24px;
  height: 24px;
  background-color: ${t.colors.ink};
  transform: rotate(${p => { throw new Error("STUB"); }}deg);
  transition: transform 600ms steps(4, jump-end);
`;

const LinearStopsCell = styled.View<{ $on: boolean }>`
  width: 24px;
  height: 24px;
  background-color: ${t.colors.ink};
  transform: translateX(${p => { throw new Error("STUB"); }}px);
  transition: transform 600ms linear(0, 0.3 25%, 0.7 75%, 1);
`;

interface RowProps {
  label: string;
  on: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function Row({ label, on, onToggle, children }: RowProps) {
    throw new Error("STUB");
}

export function TransitionGallery() {
    throw new Error("STUB");
}
