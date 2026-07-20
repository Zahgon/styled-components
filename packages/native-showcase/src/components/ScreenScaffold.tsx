import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  FlatList,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  useWindowDimensions,
  ViewToken,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { FeatureJumpSelect, JumpGroup } from '@/components/FeatureJumpSelect';
import { lightTheme, theme as t } from '@/theme/tokens';

// Raw JS numbers for content padding math. `t.space.*` tokens are
// createTheme sentinels that resolve via CSS calc; JS `+` against them
// silently string-coerces. Use these for contentContainerStyle.
const SPACE = lightTheme.space;

// Rail chrome uses `light-dark()` directly rather than `t.colors.*`
// sentinels. On rn-web, the native entry currently flattens createTheme
// leaves to literal hex at render time (no `var(--sc-*)` emission like
// the web build), so a theme switch doesn't repaint without a full
// React re-render of every consumer. `light-dark()` resolves natively
// in the browser via `prefers-color-scheme`, and v7 polyfills it on
// iOS/Android - one declaration, all platforms.
const C = {
  ink: 'light-dark(#0e0e10, #f5f3ee)',
  fgMuted: 'light-dark(#46464a, #a8a8ac)',
  fgFaint: 'light-dark(#7c7c80, #6c6c70)',
  // Borders read quieter in dark mode: light-on-dark perception
  // amplifies contrast, so the same fgFaint value that's appropriately
  // subtle on cream feels too loud against near-black. Drop dark to
  // ~22% lightness so the divider sits structurally without claiming
  // attention.
  rule: 'light-dark(#7c7c80, #3a3a3f)',
  bg: 'light-dark(#f5f3ee, #0e0e10)',
};

/**
 * Universal-codebase shell: one CSS pass, three form factors.
 *
 * Phone (default):    column flow. Rail sits as a centered header above
 *                     the scrolling list.
 * Tablet (≥ 720px):   row flow. Rail becomes a fixed-width left column;
 *                     category nav appears.
 * Desktop (≥ 1100px): row flow with wider rail and richer gutters.
 *
 * Insets are JS values (safe-area inset math can't be expressed in CSS
 * @media), so they pin via inline style. Everything else is declarative.
 */

const RAIL_BREAKPOINT = 720;

const Shell = styled.View`
  flex: 1;
  background-color: ${C.bg};
  flex-direction: column;

  @media (min-width: 720px) {
    flex-direction: row;
  }
`;

// On desktop, the rail is wrapped in this ScrollView so it can scroll
// independently when the viewport is shorter than the rail's content
// (long category lists + safe-area paddings on a small laptop screen).
// Width and right divider live here because they're container-level
// concerns, not content-level. The inner Rail keeps its padding,
// gap, and alignment.
const RailScroll = styled.ScrollView`
  width: 260px;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 260px;
  border-right-width: ${t.borderWidth.hairline}px;
  border-right-color: ${C.rule};

  @media (min-width: 1100px) {
    width: 320px;
    flex-basis: 320px;
  }
`;

const Rail = styled.View<{ $top: number; $bottom: number; $left: number; $right: number }>`
  padding-top: calc(${p => { throw new Error("STUB"); }}px + ${t.space.xl}px);
  padding-bottom: ${t.space.md}px;
  padding-left: calc(${p => { throw new Error("STUB"); }}px + ${t.space.md}px);
  padding-right: calc(${p => { throw new Error("STUB"); }}px + ${t.space.md}px);
  gap: ${t.space.sm}px;
  align-items: center;
  border-bottom-width: ${t.borderWidth.hairline}px;
  border-bottom-color: ${C.rule};

  @media (min-width: 720px) {
    padding-bottom: calc(${p => { throw new Error("STUB"); }}px + ${t.space.lg}px);
    padding-right: ${t.space.md}px;
    align-items: flex-start;
    border-bottom-width: 0;
  }

  @media (min-width: 1100px) {
    padding-left: calc(${p => { throw new Error("STUB"); }}px + ${t.space.xl}px);
    padding-right: ${t.space.lg}px;
  }
`;

const RailHeroWrap = styled.View`
  align-items: center;
  padding-bottom: ${t.space.xxs}px;

  @media (min-width: 720px) {
    align-items: flex-start;
  }
`;

const Title = styled.Text`
  font-family: ${t.fontFamily.heading};
  font-size: ${t.fontSize.display}px;
  line-height: ${t.lineHeight.display}px;
  color: ${C.ink};
  letter-spacing: -0.5px;
  text-align: center;

  @media (min-width: 720px) {
    font-size: ${t.fontSize.title}px;
    line-height: ${t.lineHeight.title}px;
    text-align: left;
  }

  @media (min-width: 1100px) {
    font-size: ${t.fontSize.display}px;
    line-height: ${t.lineHeight.display}px;
  }
`;

const Summary = styled.Text`
  font-family: ${t.fontFamily.body};
  font-size: ${t.fontSize.brief}px;
  line-height: ${t.lineHeight.brief}px;
  color: ${C.fgMuted};
  text-align: center;

  @media (min-width: 720px) {
    text-align: left;
  }
`;

const RailJumpWrap = styled.View`
  margin-top: ${t.space.sm}px;
  align-self: stretch;
`;

const RailNav = styled.View`
  display: none;

  @media (min-width: 720px) {
    display: flex;
    margin-top: ${t.space.md}px;
    align-self: stretch;
    gap: ${t.space.xxs}px;
  }
`;

const RailNavHeading = styled.Text`
  font-family: ${t.fontFamily.monoStrong};
  font-size: ${t.fontSize.monoSm}px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${C.fgFaint};
  margin-bottom: ${t.space.xxs}px;
`;

const RailLink = styled.Pressable`
  padding-top: ${t.space.xxs}px;
  padding-bottom: ${t.space.xxs}px;
`;

// Pseudo-state rules on a styled.Text child of a Pressable are dead:
// only the Pressable receives the `{ hovered, focused, pressed }`
// state callback that the v7 native engine bridges into pseudo
// matching. We forward those flags into `data-*` attributes via the
// function-child form and react to them with attribute selectors,
// which the engine evaluates as plain DOM/View attribute checks.
const RailLinkLabel = styled.Text`
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

const Main = styled.View`
  flex: 1;
  min-width: 0;
  min-height: 0;
`;

// Sibling of Main (not child) so position: absolute anchors to the full
// Shell viewport. On tablet/desktop the rail sits at the page's left
// edge; the button shifts past it so it lines up with the content column
// instead of floating over the rail. Visual language mirrors FpsMeter
// at top-right.
const BackToTop = styled.Pressable<{ $topInset: number; $leftInset: number }>`
  position: absolute;
  top: calc(${p => { throw new Error("STUB"); }}px + ${t.space.xs}px);
  left: calc(${p => { throw new Error("STUB"); }}px + ${t.space.md}px);
  flex-direction: row;
  align-items: center;
  gap: ${t.space.xs}px;
  padding: ${t.space.xxs}px ${t.space.xs}px;
  background-color: ${t.colors.surfaceMuted};
  border-width: ${t.borderWidth.hairline}px;
  border-color: ${t.colors.border};
  z-index: 1000;

  @media (min-width: 720px) {
    left: calc(260px + ${t.space.md}px);
  }

  @media (min-width: 1100px) {
    left: calc(320px + ${t.space.md}px);
  }
`;

const BackToTopLabel = styled.Text`
  font-family: ${t.fontFamily.monoStrong};
  font-size: ${t.fontSize.monoSm}px;
  letter-spacing: 0.5px;
  color: ${t.colors.ink};
`;

const SCROLL_TOP_THRESHOLD = 480;

const ItemWrapper = styled.View`
  padding-left: ${t.space.md}px;
  padding-right: ${t.space.md}px;

  @media (min-width: 720px) {
    padding-left: ${t.space.lg}px;
    padding-right: ${t.space.lg}px;
  }

  @media (min-width: 1100px) {
    padding-left: ${t.space.xl}px;
    padding-right: ${t.space.xl}px;
    max-width: 920px;
  }
`;

export interface CategoryRef {
  label: string;
  /** Index in the FlatList's data array to scroll to. */
  index: number;
}

interface Props<Item> {
  /** Title is also the AsyncStorage key suffix for scroll restoration. */
  title: string;
  summary?: string;
  /**
   * Optional brand element rendered above the title. Sits inside the
   * list header so it scrolls with the rest of the catalog.
   */
  hero?: React.ReactNode;
  /**
   * If provided, on mount the scaffold scrolls to the section
   * whose slug matches. Wins over any persisted scroll position so deep
   * links land deterministically.
   */
  focusSlug?: string;
  /** Flat list of items to render. */
  data: ReadonlyArray<Item>;
  /** Render a single item. */
  renderItem: ListRenderItem<Item>;
  /** Stable key per item. */
  keyExtractor: (item: Item, index: number) => string;
  /**
   * Optional anchor map for focusSlug deep-linking. Maps slug → item index.
   * Built by the caller from `data` so the scaffold can scrollToIndex once
   * the matching slug is requested.
   */
  anchorIndex?: ReadonlyMap<string, number>;
  /**
   * Optional category index. Surfaces as a clickable nav in the rail at
   * tablet/desktop breakpoints; hidden via CSS on phone.
   */
  categories?: ReadonlyArray<CategoryRef>;
  /**
   * Optional fine-grained jump list grouped by category. Renders a
   * select-style dropdown below the summary on every form factor; lets
   * the user land directly on any feature without scrolling.
   */
  jumpList?: ReadonlyArray<JumpGroup>;
}

const STORAGE_PREFIX = 'sc-showcase:scroll:';
const PERSIST_THROTTLE_MS = 200;
const STYLE_HIDDEN = { opacity: 0 } as const;

const VIEWABILITY_CONFIG = { itemVisiblePercentThreshold: 1 } as const;

/**
 * Virtualized scaffold backed by a `FlatList`. Off-screen items unmount,
 * so heavy widgets (timers, transitions, container queries) only run for
 * what's on screen.
 *
 * Scroll position is persisted as the topmost visible item's INDEX
 * rather than a pixel offset. Pixel-offset restoration is unreliable
 * under virtualization: cold mount only renders `windowSize` viewports,
 * so a saved offset deep in the list gets clamped to whatever's been
 * laid out, the persist callback then captures the clamped position,
 * and the saved offset is overwritten before the rest of the list
 * mounts. Index-based restoration tells FlatList "land on item N" and
 * its native virtualization handles batching the rows up to N.
 *
 * `focusSlug` deep-linking continues to use `scrollToIndex` via the
 * caller-supplied `anchorIndex` map.
 */
export function ScreenScaffold<Item>({
  title,
  summary,
  hero,
  focusSlug,
  data,
  renderItem,
  keyExtractor,
  anchorIndex,
  categories,
  jumpList,
}: Props<Item>) {
    throw new Error("STUB");
}
