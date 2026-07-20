import React, { useCallback, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import styled from 'styled-components/native';
import { theme as t } from '@/theme/tokens';

const Stage = styled.View`
  height: 220px;
  border-radius: ${t.radius.lg}px;
  border: 1px solid ${t.colors.border};
  background-color: ${t.colors.surfaceMuted};
  overflow: hidden;
`;

const Floater = styled.View`
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 16px;
  padding: env(safe-area-inset-top, 0) env(safe-area-inset-right, 0) env(safe-area-inset-bottom, 0)
    env(safe-area-inset-left, 0);
  border-radius: ${t.radius.md}px;
  background-color: ${t.colors.accent};
`;

const FloaterInner = styled.View`
  padding: 14px 18px;
`;

const Title = styled.Text`
  color: ${t.colors.bg};
  font-weight: 700;
  font-size: 14px;
`;

const Sub = styled.Text`
  color: ${t.colors.bg};
  opacity: 0.85;
  font-size: 12px;
  margin-top: 2px;
`;

const Readout = styled.View`
  background-color: ${t.colors.surface};
  border-radius: ${t.radius.md}px;
  padding: ${t.space.md}px;
  border: 1px solid ${t.colors.border};
  gap: 4px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Key = styled.Text`
  font-size: 13px;
  color: ${t.colors.fgMuted};
`;

const Val = styled.Text`
  font-size: 13px;
  color: ${t.colors.fg};
  font-variant: tabular-nums;
`;

const Hint = styled.Text`
  font-size: 12px;
  color: ${t.colors.fgMuted};
  margin-top: ${t.space.xs}px;
`;

function px(n: number) {
    throw new Error("STUB");
}

export function SafeAreaInsetsBadge() {
    throw new Error("STUB");
}
