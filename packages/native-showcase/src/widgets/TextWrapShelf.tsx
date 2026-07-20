import React from 'react';
import styled from 'styled-components/native';
import { Markdown } from '@/components/Markdown';
import { theme as t } from '@/theme/tokens';

/**
 * `text-wrap` shorthand (CSS Text 4 §5.5). Polyfilled on RN by lifting
 * to `numberOfLines` (for `nowrap`) and `textBreakStrategy` (Android
 * API 23+) for `balance` / `pretty`. iOS has no platform line-breaking
 * control, so `balance` / `pretty` / `stable` are silently no-ops there.
 * rn-web maps directly to the CSS engine.
 */

const SAMPLE =
  'styled-components ships a CSS-in-JS engine that handles modern color spaces, container queries, viewport units, and animations on every platform.';

const NARROW = 'A short headline that needs balanced wrapping to look right at small widths.';

const Stack = styled.View`
  gap: ${t.space.lg}px;
`;

const Row = styled.View`
  gap: ${t.space.xxs}px;
`;

const RowLabel = styled.Text`
  font-family: ${t.fontFamily.monoStrong};
  font-size: ${t.fontSize.monoSm}px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: ${t.colors.ink};
`;

const Frame = styled.View`
  border: ${t.borderWidth.hairline}px solid ${t.colors.border};
  padding: ${t.space.sm}px;
  background-color: ${t.colors.surfaceMuted};
`;

const Body = styled.Text`
  font-family: ${t.fontFamily.body};
  font-size: ${t.fontSize.body}px;
  line-height: ${t.lineHeight.body}px;
  color: ${t.colors.ink};
`;

const WrapDefault = styled(Body)`
  text-wrap: wrap;
`;

const WrapNowrap = styled(Body)`
  text-wrap: nowrap;
`;

const WrapBalance = styled(Body)`
  text-wrap: balance;
`;

const WrapPretty = styled(Body)`
  text-wrap: pretty;
`;

const WrapStable = styled(Body)`
  text-wrap: stable;
`;

const WrapModeNowrap = styled(Body)`
  text-wrap-mode: nowrap;
`;

const WrapStyleBalance = styled(Body)`
  text-wrap-style: balance;
`;

// Constrained ribbon - `text-wrap: nowrap` overflow becomes visible
// here. Layered hairline borders mark the box even when the text
// extends past them.
const Ribbon = styled(Frame)`
  overflow: hidden;
`;

// Narrow column to make balance / pretty differences visible without
// requiring a tablet viewport.
const NarrowFrame = styled(Frame)`
  max-width: 240px;
`;

export function TextWrapShelf() {
    throw new Error("STUB");
}
