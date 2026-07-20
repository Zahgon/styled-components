import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import {
  FlatList,
  ListRenderItem,
  Modal,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputKeyPressEventData,
} from 'react-native';
import styled from 'styled-components/native';
import { theme as t } from '@/theme/tokens';

// Match the Rail chrome's `light-dark()` palette so theme switches repaint
// without a full React re-render. createTheme leaves flatten to literal hex
// at render on rn-web (no `var()` emission yet), so `t.colors.*` would
// freeze us to whichever mode rendered first.
const C = {
  ink: 'light-dark(#0e0e10, #f5f3ee)',
  fgMuted: 'light-dark(#46464a, #a8a8ac)',
  fgFaint: 'light-dark(#7c7c80, #6c6c70)',
  rule: 'light-dark(#7c7c80, #3a3a3f)',
  bg: 'light-dark(#f5f3ee, #0e0e10)',
  scrim: 'light-dark(rgba(14, 14, 16, 0.55), rgba(0, 0, 0, 0.7))',
  highlight: 'light-dark(rgba(0, 0, 0, 0.06), rgba(255, 255, 255, 0.08))',
};

export interface JumpItem {
  slug: string;
  title: string;
}

export interface JumpGroup {
  label: string;
  items: ReadonlyArray<JumpItem>;
}

interface Props {
  groups: ReadonlyArray<JumpGroup>;
  onJump: (slug: string) => void;
}

const Trigger = styled.Pressable`
  align-self: stretch;
`;

const TriggerInner = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${t.space.sm}px;
  padding-block: ${t.space.sm}px;
  padding-inline: ${t.space.sm}px;
  min-height: 44px;
  border-width: ${t.borderWidth.hairline}px;
  border-color: ${C.rule};
`;

const TriggerLabel = styled.Text`
  font-family: ${t.fontFamily.monoStrong};
  font-size: ${t.fontSize.monoSm}px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${C.fgMuted};
  transition: color 120ms ease-out;

  &[data-hovered='true'],
  &[data-focused='true'] {
    color: ${C.ink};
  }

  &[data-pressed='true'] {
    color: ${C.fgFaint};
  }
`;

const Chevron = styled(Feather).attrs({
  name: 'chevron-down' as const,
  size: 16,
  color: C.fgMuted,
})``;

const ModalRoot = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const BackdropPress = styled.Pressable`
  background-color: ${C.scrim};
`;

const Sheet = styled.View`
  background-color: ${C.bg};
  border-top-width: ${t.borderWidth.hairline}px;
  border-top-color: ${C.rule};
  /* Fixed height (not max-height): the sheet must hold its size while
     typing filters the list, otherwise the bottom-anchored top edge
     jumps with every keystroke. */
  height: 70%;
`;

const SheetHeader = styled.View`
  flex-direction: row;
  align-items: stretch;
  border-bottom-width: ${t.borderWidth.hairline}px;
  border-bottom-color: ${C.rule};
`;

const FilterInput = styled.TextInput`
  flex: 1;
  font-family: ${t.fontFamily.body};
  font-size: ${t.fontSize.body}px;
  color: ${C.ink};
  padding: ${t.space.md}px;
`;

const CloseButton = styled.Pressable`
  padding-block: ${t.space.xs}px;
  padding-inline: ${t.space.sm}px;
  min-width: 44px;
  min-height: 44px;
  align-items: center;
  justify-content: center;
`;

const CloseLabel = styled.Text`
  font-family: ${t.fontFamily.monoStrong};
  font-size: ${t.fontSize.body}px;
  color: ${C.ink};
`;

const GroupHeading = styled.Text`
  font-family: ${t.fontFamily.monoStrong};
  font-size: ${t.fontSize.monoSm}px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${C.fgFaint};
  padding-top: ${t.space.md}px;
  padding-right: ${t.space.md}px;
  padding-bottom: ${t.space.xs}px;
  padding-left: ${t.space.md}px;
`;

const ItemRow = styled.Pressable<{ $highlighted?: boolean }>`
  padding-block: ${t.space.sm}px;
  padding-inline: ${t.space.md}px;
  min-height: 44px;
  justify-content: center;
  background-color: ${p => { throw new Error("STUB"); }};
`;

const ItemLabel = styled.Text`
  font-family: ${t.fontFamily.body};
  font-size: ${t.fontSize.body}px;
  line-height: ${t.lineHeight.body}px;
  color: ${C.ink};
  transition: color 120ms ease-out;

  &[data-hovered='true'],
  &[data-focused='true'] {
    color: ${C.fgMuted};
  }

  &[data-pressed='true'] {
    color: ${C.fgFaint};
  }
`;

const EmptyLabel = styled.Text`
  font-family: ${t.fontFamily.body};
  font-size: ${t.fontSize.body}px;
  color: ${C.fgFaint};
  padding: ${t.space.md}px;
`;

type Row = { kind: 'group'; label: string } | { kind: 'item'; item: JumpItem };

// The sheet is fixed-height; the list fills the remainder under the
// header so short filtered sets leave calm empty space instead of
// resizing the takeover.
const listFillStyle = { flex: 1 } as const;

const keyExtractor = (r: Row): string => { throw new Error("STUB"); };

function filterGroups(
  groups: ReadonlyArray<JumpGroup>,
  q: string
): { rows: Row[]; items: JumpItem[] } {
    throw new Error("STUB");
}

export function FeatureJumpSelect({ groups, onJump }: Props) {
    throw new Error("STUB");
}
