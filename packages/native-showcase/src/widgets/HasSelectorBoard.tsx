import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { theme as t } from '@/theme/tokens';
import { InlineMarkdown } from '@/components/Markdown';

/**
 * CSS Selectors 4 §13.1 - `&:has(<simple>)`. Each card reads its OWN
 * children subtree at render time and reflows in response. When the
 * inner predicate matches a descendant, the card grows extra left
 * padding (component form) or a thick bottom rail (attr form), so
 * the layout difference is visible without relying on color flips.
 * v7 supports two inner forms on native: `${Component}` and
 * `[attr]` / `[attr=value]`.
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

const LabeledRow = styled.View`
  gap: ${t.space.xs}px;
`;

const Icon = styled.View`
  width: 24px;
  height: 24px;
  background-color: ${t.colors.ink};
`;

const Other = styled.View`
  width: 24px;
  height: 24px;
  background-color: ${t.colors.fgFaint};
`;

const Item = styled.View`
  width: 24px;
  height: 24px;
  background-color: ${t.colors.fgFaint};
`;

const ComponentCard = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${t.space.sm}px;
  background-color: ${t.colors.surfaceMuted};
  &:has(${Icon}) {
    padding-left: 48px;
  }
`;

const AttrCard = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${t.space.sm}px;
  background-color: ${t.colors.surfaceMuted};
  border-bottom-width: 0;
  &:has([data-state='active']) {
    border-bottom-width: 6px;
    border-bottom-color: ${t.colors.ink};
  }
`;

const PresenceCard = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${t.space.sm}px;
  background-color: ${t.colors.surfaceMuted};
  border-bottom-width: 0;
  &:has([data-flag]) {
    border-bottom-width: 6px;
    border-bottom-color: ${t.colors.ink};
  }
`;

const NestedWrap = styled.View`
  padding: 4px;
  background-color: ${t.colors.surfaceMuted};
`;

export function HasSelectorBoard() {
    throw new Error("STUB");
}
