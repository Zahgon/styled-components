import React, { useState } from 'react';
import styled from 'styled-components/native';
import { theme as t } from '@/theme/tokens';
import { InlineMarkdown, Markdown } from '../components/Markdown';

/**
 * CSS Overscroll 1 - `overscroll-behavior` + CSS Scrollbars 1 §3.1 -
 * `scrollbar-width`. Both target `<ScrollView>` / `<FlatList>` /
 * `<SectionList>` / `<VirtualizedList>`. Toggle between the spec
 * values to feel the differences:
 *   - overscroll-behavior controls bounce on iOS + glow on Android
 *     (auto = platform default; contain | none = disabled).
 *   - scrollbar-width: none hides both scroll indicators. RN has no
 *     thin-scrollbar surface so `thin` is equivalent to `auto` per
 *     the spec note that UAs may disregard `thin`.
 */

const Stack = styled.View`
  gap: ${t.space.md}px;
`;

const ToggleRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${t.space.xs}px;
`;

const Toggle = styled.Pressable`
  padding: 6px 12px;
  border: ${t.borderWidth.hairline}px solid ${t.colors.border};
  background-color: ${t.colors.bg};
  &[aria-pressed='true'] {
    background-color: ${t.colors.ink};
  }
`;

const ToggleLabel = styled.Text`
  font-family: ${t.fontFamily.monoStrong};
  font-size: ${t.fontSize.monoSm}px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: ${t.colors.ink};
  &[aria-pressed='true'] {
    color: ${t.colors.bg};
  }
`;

const ControlBlock = styled.View`
  gap: ${t.space.xs}px;
`;

const ControlLabel = styled.Text`
  font-family: ${t.fontFamily.monoStrong};
  font-size: ${t.fontSize.monoSm}px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: ${t.colors.fgFaint};
`;

const ScrollFrame = styled.View`
  height: 220px;
  border: ${t.borderWidth.hairline}px solid ${t.colors.border};
  background-color: ${t.colors.surface};
`;

// The scroll variants encode every (overscroll x scrollbar) pair
// declaratively so the actual ScrollView prop bridge is what's being
// exercised - swapping which styled component renders is the only JS
// branching the demo does.
const ScrollAA = styled.ScrollView`
  overscroll-behavior: auto;
  scrollbar-width: auto;
`;
const ScrollAN = styled.ScrollView`
  overscroll-behavior: auto;
  scrollbar-width: none;
`;
const ScrollCA = styled.ScrollView`
  overscroll-behavior: contain;
  scrollbar-width: auto;
`;
const ScrollCN = styled.ScrollView`
  overscroll-behavior: contain;
  scrollbar-width: none;
`;
const ScrollNA = styled.ScrollView`
  overscroll-behavior: none;
  scrollbar-width: auto;
`;
const ScrollNN = styled.ScrollView`
  overscroll-behavior: none;
  scrollbar-width: none;
`;

const Item = styled.View`
  padding: ${t.space.md}px ${t.space.sm}px;
  border-bottom-width: ${t.borderWidth.hairline}px;
  border-bottom-color: ${t.colors.rule};
`;

const ItemLabel = styled.Text`
  font-family: ${t.fontFamily.body};
  font-size: ${t.fontSize.body}px;
  color: ${t.colors.ink};
`;

const ROWS = Array.from({ length: 24 }, (_, i) => { throw new Error("STUB"); });

type OverscrollMode = 'auto' | 'contain' | 'none';
type ScrollbarMode = 'auto' | 'none';

// nestedScrollEnabled is required on Android when a same-direction
// ScrollView lives inside another ScrollView (the catalog page is one).
// iOS ignores the prop, so it's safe to pass everywhere.
function ScrollVariant({
  overscroll,
  scrollbar,
  children,
}: {
  overscroll: OverscrollMode;
  scrollbar: ScrollbarMode;
  children: React.ReactNode;
}) {
    throw new Error("STUB");
}

interface SegmentedProps<T extends string> {
  values: ReadonlyArray<T>;
  value: T;
  onChange: (next: T) => void;
}

function Segmented<T extends string>({ values, value, onChange }: SegmentedProps<T>) {
    throw new Error("STUB");
}

export function ScrollSurfacesBoard() {
    throw new Error("STUB");
}
