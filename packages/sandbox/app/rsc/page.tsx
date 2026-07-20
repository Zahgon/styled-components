import styled, { createGlobalStyle, css, keyframes } from 'styled-components';
import { TestStatus, type TestCheck } from '../components/auto-test';
import { TestSummary } from '../components/test-summary';
import ClientButton from '../components/client-button';
import { DedupCountBadge } from '../components/dedup-count-badge';
import {
  Section,
  SectionTitle,
  SectionDesc,
  HintText,
  Demo,
  Row,
  Column,
  ColumnLabel,
  Code,
} from '../components/test-ui';
import theme from '../lib/theme';

// Declared early so test9Checks can reference its runtime styledComponentId.
const DedupGlobalStyle = createGlobalStyle`
  [data-testid="dedup-marker"] {
    border-style: dashed !important;
  }
`;
const dedupId = DedupGlobalStyle.styledComponentId;

const test1Checks: TestCheck[] = [
  {
    ref: 'card-a',
    type: 'style',
    prop: 'border-left-color',
    expectedVar: '--sc-colors-primary',
    label: 'CardA primary border',
  },
  {
    ref: 'card-b',
    type: 'style',
    prop: 'border-left-color',
    expectedVar: '--sc-colors-accent',
    label: 'CardB accent border',
  },
  { ref: 'card-c', type: 'style', prop: 'font-style', expected: 'italic', label: 'CardC italic' },
];

const test2Checks: TestCheck[] = [
  {
    ref: 'danger-btn',
    type: 'style',
    prop: 'background-color',
    expected: 'rgb(220, 38, 38)',
    label: 'DangerButton bg red',
  },
  {
    ref: 'outline-btn',
    type: 'style',
    prop: 'background-color',
    expected: 'rgba(0, 0, 0, 0)',
    label: 'OutlineButton bg transparent',
  },
  {
    ref: 'large-btn',
    type: 'style',
    prop: 'font-size',
    expected: '20px',
    label: 'LargeButton font-size 20px',
  },
];

const test3Checks: TestCheck[] = [
  {
    ref: 'base-box',
    type: 'style-not',
    prop: 'background-color',
    expected: 'rgba(0, 0, 0, 0)',
    label: 'BaseBox has bg',
  },
  {
    ref: 'accent-box',
    type: 'style-not',
    prop: 'background-color',
    expected: 'rgba(0, 0, 0, 0)',
    label: 'AccentBox has bg',
  },
  {
    ref: 'compact-box',
    type: 'style',
    prop: 'font-size',
    expected: '12px',
    label: 'CompactBox small text',
  },
];

const test4Checks: TestCheck[] = [
  {
    ref: 'pulsing-dot',
    type: 'style-not',
    prop: 'animation-name',
    expected: 'none',
    label: 'PulsingDot has animation',
  },
];

const test5Checks: TestCheck[] = [
  {
    ref: 'badge-ok',
    type: 'style-not',
    prop: 'background-color',
    expected: 'rgba(0, 0, 0, 0)',
    label: 'OK badge has bg',
  },
  {
    ref: 'badge-warn',
    type: 'style-not',
    prop: 'background-color',
    expected: 'rgba(0, 0, 0, 0)',
    label: 'Warn badge has bg',
  },
  {
    ref: 'badge-error',
    type: 'style-not',
    prop: 'background-color',
    expected: 'rgba(0, 0, 0, 0)',
    label: 'Error badge has bg',
  },
];

const test6Checks: TestCheck[] = [
  { ref: 'as-default', type: 'element', expected: 'p', label: 'Default renders <p>' },
  { ref: 'as-link', type: 'element', expected: 'a', label: 'Link renders <a>' },
  { ref: 'as-button', type: 'element', expected: 'button', label: 'Button renders <button>' },
];

const test7Checks: TestCheck[] = [
  {
    ref: 'var-card',
    type: 'style',
    prop: 'border-color',
    expectedVar: '--sc-colors-primary',
    label: 'VarCard uses CSS var for border',
  },
];

const test8Checks: TestCheck[] = [
  {
    ref: 'nth-first',
    type: 'style',
    prop: 'color',
    expected: 'rgb(220, 38, 38)',
    label: ':first-of-type item is red',
  },
  {
    ref: 'nth-last',
    type: 'style',
    prop: 'color',
    expected: 'rgb(37, 99, 235)',
    label: ':last-of-type item is blue',
  },
  {
    ref: 'nth-second',
    type: 'style',
    prop: 'color',
    expected: 'rgb(22, 163, 74)',
    label: ':nth-of-type(2) item is green',
  },
  {
    ref: 'nthchild-first',
    type: 'style',
    prop: 'color',
    expected: 'rgb(220, 38, 38)',
    label: ':first-child item is red (plugin fix)',
  },
  {
    ref: 'nthchild-last',
    type: 'style',
    prop: 'color',
    expected: 'rgb(37, 99, 235)',
    label: ':last-child item is blue (plugin fix)',
  },
  {
    ref: 'nthchild-second',
    type: 'style',
    prop: 'color',
    expected: 'rgb(22, 163, 74)',
    label: ':nth-child(2) item is green (plugin fix)',
  },
];

const test9Checks: TestCheck[] = [
  {
    ref: 'dedup-marker',
    type: 'style',
    prop: 'border-style',
    expected: 'dashed',
    label: 'Dedup marker has dashed border',
  },
  {
    ref: 'style[data-styled-global="' + dedupId + '"]',
    type: 'count',
    expected: '1',
    label: 'Exactly one <style data-styled-global> tag emitted',
  },
];

const test10Checks: TestCheck[] = [
  {
    ref: 'container-child',
    type: 'style',
    prop: 'color',
    expected: 'rgb(37, 99, 235)',
    label: '@container query applies (parent wide enough)',
  },
  {
    ref: 'layered-target',
    type: 'style',
    prop: 'background-color',
    expected: 'rgb(22, 163, 74)',
    label: '@layer cascade order: later layer wins',
  },
  {
    ref: 'has-with-flag',
    type: 'style',
    prop: 'border-color',
    expected: 'rgb(217, 119, 6)',
    label: ':has(.flag) selector applies when child present',
  },
  {
    ref: 'has-without-flag',
    type: 'style-not',
    prop: 'border-color',
    expected: 'rgb(217, 119, 6)',
    label: ':has(.flag) does NOT apply without child',
  },
];

const test11Checks: TestCheck[] = [
  {
    ref: 'fwd-control',
    type: 'attr',
    prop: 'data-tracking',
    expected: 'control',
    label: 'Control button forwards data-tracking attr',
  },
  {
    ref: 'fwd-filtered',
    type: 'attr-absent',
    prop: 'data-tracking',
    label: 'Filtered button strips data-tracking attr',
  },
  {
    ref: 'fwd-filtered',
    type: 'attr',
    prop: 'data-keep',
    expected: 'kept',
    label: 'Filtered button forwards data-keep',
  },
];

const rscSuites = [
  { name: '1. Module-level', checks: test1Checks },
  { name: '2. Cross-boundary', checks: test2Checks },
  { name: '3. RSC-extends-RSC', checks: test3Checks },
  { name: '4. Keyframes', checks: test4Checks },
  { name: '5. Dynamic props', checks: test5Checks },
  { name: '6. as prop', checks: test6Checks },
  { name: '7. CSS vars', checks: test7Checks },
  { name: '8. Child-index selectors', checks: test8Checks },
  { name: '9. GlobalStyle dedup', checks: test9Checks },
  { name: '10. Modern CSS', checks: test10Checks },
  { name: '11. shouldForwardProp', checks: test11Checks },
];

export default function RSCTestPage() {
    throw new Error("STUB");
}

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 24px;
`;

const Title = styled.h1`
  color: ${theme.colors.text};
  font-size: 32px;
  margin-bottom: 8px;
`;

// ---------------------------------------------------------------------------
// 1. Module-level RSC components
// ---------------------------------------------------------------------------

const RSCCardBase = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: 8px;
  padding: 24px;
  flex: 1;
  min-width: 180px;
`;

const CardA = styled(RSCCardBase)`
  border-left-width: 4px;
  border-left-color: ${theme.colors.primary};
`;

const CardB = styled(RSCCardBase)`
  border-left-width: 4px;
  border-left-color: ${theme.colors.accent};
`;

const CardC = styled(RSCCardBase)`
  border-left-width: 4px;
  border-left-color: ${theme.colors.success};
  font-style: italic;
`;

const RSCCardTitle = styled.h3`
  color: ${theme.colors.text};
  font-size: 16px;
  margin-bottom: 8px;
`;

// ---------------------------------------------------------------------------
// 2. Cross-boundary specificity (#5672)
// ---------------------------------------------------------------------------

const DangerButton = styled(ClientButton)`
  background: #dc2626;
  border-color: #dc2626;

  &:hover {
    background: #b91c1c;
    border-color: #b91c1c;
  }
`;

const OutlineButton = styled(ClientButton)`
  background: transparent;
  color: ${theme.colors.primary};

  &:hover {
    background: ${theme.colors.primary};
    color: white;
  }
`;

const LargeButton = styled(ClientButton)`
  padding: 16px 40px;
  font-size: 20px;
  border-radius: 8px;
`;

// ---------------------------------------------------------------------------
// 3. RSC-extends-RSC inheritance chain
// ---------------------------------------------------------------------------

const BaseBox = styled.div`
  padding: 16px;
  background: color-mix(in srgb, ${theme.colors.primary} 15%, ${theme.colors.background});
  border: 2px solid color-mix(in srgb, ${theme.colors.primary} 40%, ${theme.colors.border});
  border-radius: 8px;
  font-size: 14px;
  color: ${theme.colors.text};
`;

const AccentBox = styled(BaseBox)`
  background: color-mix(in srgb, ${theme.colors.warning} 15%, ${theme.colors.background});
  border-color: color-mix(in srgb, ${theme.colors.warning} 50%, ${theme.colors.border});
`;

const CompactAccentBox = styled(AccentBox)`
  padding: 8px 12px;
  font-size: 12px;
  border-radius: 4px;
`;

// ---------------------------------------------------------------------------
// 4. Keyframes in RSC
// ---------------------------------------------------------------------------

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const PulseRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PulsingDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${theme.colors.success};
  animation: ${pulse} 2s ease-in-out infinite;
  flex-shrink: 0;
`;

const PulseLabel = styled.span`
  font-size: 14px;
  color: ${theme.colors.text};
`;

// ---------------------------------------------------------------------------
// 5. Dynamic props in RSC
// ---------------------------------------------------------------------------

const statusColor = {
  ok: theme.colors.success,
  warn: theme.colors.warning,
  error: theme.colors.danger,
};

const StatusBadge = styled.span<{ $status: 'ok' | 'warn' | 'error' }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  background: ${p =>
    { throw new Error("STUB"); }};
  color: ${p => { throw new Error("STUB"); }};
`;

// ---------------------------------------------------------------------------
// 6. `as` prop in RSC
// ---------------------------------------------------------------------------

const AsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: stretch;
`;

const AsBlock = styled.p`
  color: ${theme.colors.text};
  background: ${theme.colors.background};
  border: 2px solid ${theme.colors.border};
  border-radius: 8px;
  padding: 16px 24px;
  font-size: 14px;
  text-decoration: none;
  cursor: default;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
`;

const AsLabel = styled.span`
  font-family: monospace;
  font-size: 11px;
  font-weight: 700;
  color: ${theme.colors.textMuted};
  letter-spacing: 0.5px;
`;

const AsButton = styled(AsBlock)`
  background: ${theme.colors.accent};
  border-color: ${theme.colors.accent};
  color: white;
  cursor: pointer;
  font-weight: 600;
  align-items: center;
  border-radius: 8px;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.85;
  }

  &:active {
    opacity: 0.7;
  }
`;

// ---------------------------------------------------------------------------
// 7. CSS variable theming
// ---------------------------------------------------------------------------

const VarCard = styled.div`
  background: ${theme.colors.surface};
  border: 2px solid ${theme.colors.primary};
  border-radius: 8px;
  padding: 24px;
`;

const VarTitle = styled.h3`
  color: ${theme.colors.primary};
  font-size: 18px;
  margin-bottom: 8px;
`;

const VarText = styled.p`
  color: ${theme.colors.textMuted};
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 16px;
`;

const VarBadge = styled.span`
  display: inline-block;
  background: ${theme.colors.accent};
  color: white;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
`;

// ---------------------------------------------------------------------------
// 8. Child-index selectors in RSC
// ---------------------------------------------------------------------------

const NthDemoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const NthBaseItem = styled.li`
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  color: ${theme.colors.text};
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
`;

const NthItem = styled(NthBaseItem)`
  &:first-of-type {
    color: #dc2626;
    border-color: #dc2626;
  }
  &:nth-of-type(2) {
    color: #16a34a;
    border-color: #16a34a;
  }
  &:last-of-type {
    color: #2563eb;
    border-color: #2563eb;
  }
`;

const NthChildItem = styled(NthBaseItem)`
  &:first-child {
    color: #dc2626;
    border-color: #dc2626;
  }
  &:nth-child(2) {
    color: #16a34a;
    border-color: #16a34a;
  }
  &:last-child {
    color: #2563eb;
    border-color: #2563eb;
  }
`;

// ---------------------------------------------------------------------------
// 9. GlobalStyle dedup
const DedupStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

const DedupMarker = styled.div`
  padding: 16px;
  border: 2px solid ${theme.colors.border};
  border-radius: 8px;
  font-size: 14px;
  color: ${theme.colors.text};
  align-self: stretch;
`;

// ---------------------------------------------------------------------------
// 10. Modern CSS - @container, @layer, :has()
// ---------------------------------------------------------------------------

const ContainerHost = styled.div`
  container-type: inline-size;
  container-name: rsc-card;
  width: 300px;
  padding: 12px;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: 8px;
`;

const ContainerChild = styled.p`
  margin: 0;
  color: #dc2626;
  font-size: 13px;

  @container rsc-card (min-width: 250px) {
    color: #2563eb;
  }
`;

const LayeredGlobalStyle = createGlobalStyle`
  @layer base {
    [data-layer-target] {
      background: #dc2626;
    }
  }
  @layer accent {
    [data-layer-target] {
      background: #16a34a;
    }
  }
`;

const LayeredBox = styled.div`
  padding: 12px 16px;
  border-radius: 8px;
  color: white;
  font-size: 13px;
  width: 240px;
`;

const HasCard = styled.div`
  padding: 12px 16px;
  border: 2px solid ${theme.colors.border};
  border-radius: 8px;
  font-size: 13px;
  color: ${theme.colors.text};
  width: 240px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:has(.flag) {
    border-color: #d97706;
  }
`;

const HasFlag = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #d97706;
  flex-shrink: 0;
`;

// ---------------------------------------------------------------------------
// 11. shouldForwardProp via withConfig
// ---------------------------------------------------------------------------

/**
 * Visual tells:
 *   &[data-tracking]      → red outline (control gets it; filtered must not)
 *   &[data-keep="kept"]   → green ring (both should get it)
 */
const fwdButtonStyles = css`
  padding: 10px 18px;
  border-radius: 6px;
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.surface};
  color: ${theme.colors.text};
  font-size: 13px;
  cursor: pointer;

  &[data-keep='kept'] {
    box-shadow: 0 0 0 2px #16a34a;
  }

  &[data-tracking] {
    outline: 3px solid #dc2626;
    outline-offset: 3px;
  }
`;

const FwdControlButton = styled.button<{ 'data-tracking'?: string }>`
  ${fwdButtonStyles}
`;

const FwdFilteredButton = styled.button.withConfig({
  shouldForwardProp: prop => { throw new Error("STUB"); },
})<{ 'data-tracking'?: string }>`
  ${fwdButtonStyles}
`;
