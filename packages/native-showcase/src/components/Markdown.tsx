import React from 'react';
import { Linking, Platform, useColorScheme } from 'react-native';
import { Markdown as MD, type NativeOptions } from 'markdown-to-jsx/native';
import styled from 'styled-components/native';
import { darkTheme, lightTheme, type ShowcaseTheme } from '@/theme/tokens';
import { theme as t } from '@/theme/tokens';

/**
 * Shared markdown renderer for the native showcase. Wraps
 * `markdown-to-jsx/native` with theme-aware overrides so a backtick
 * inline-code span, **bold**, and `[link](url)` render with our
 * typography on iOS / Android / web in one place.
 *
 * `markdown-to-jsx/native` consumes raw RN style objects (not the
 * sentinel `createTheme` map), so the inline `styles` block below
 * resolves against the active palette via `useColorScheme`. The
 * `overrides` map points at styled components so dynamic theme
 * resolution still flows through the v7 engine for those.
 *
 * Most widget captions are single-paragraph and contain literal
 * backtick spans; pass them as JSX text content (newlines collapse):
 *
 *   <Markdown>
 *     Same photo + bubble-gum `background-color`, only
 *     `background-blend-mode` changes between cards.
 *   </Markdown>
 *
 * For multi-paragraph content, use a template-literal child so the
 * blank lines survive JSX whitespace folding:
 *
 *   <Markdown>{`
 *     First paragraph.
 *
 *     Second paragraph.
 *   `}</Markdown>
 */

type Variant = 'brief' | 'caption' | 'hint';

const VARIANT_FONT: Record<
  Variant,
  (theme: ShowcaseTheme) => { fontSize: number; lineHeight: number; color: string }
> = {
  brief: theme => { throw new Error("STUB"); },
  caption: theme => { throw new Error("STUB"); },
  hint: theme => { throw new Error("STUB"); },
};

// Inline span styled components - they route through the v7 engine, so
// dark-mode token swaps land automatically when these are used. These
// only render for literal HTML tags in the markdown source; backtick
// spans and `**bold**` dispatch directly to `Text` with the matching
// `styles` entry (see `variantStyles`). No font-size here: nested RN
// Text inherits the surrounding paragraph's size, keeping HTML `<code>`
// flush with its sentence the same way `codeInline` is.
const InlineCode = styled.Text`
  font-family: ${t.fontFamily.mono};
  color: ${t.colors.ink};
  background-color: ${t.colors.signalSoft};
`;

const Strong = styled.Text`
  font-family: ${t.fontFamily.strong};
  color: ${t.colors.ink};
`;

const Em = styled.Text`
  font-style: italic;
  color: ${t.colors.ink};
`;

const Link = styled.Text`
  color: ${t.colors.ink};
  text-decoration-line: underline;
`;

const CodeBlock = styled.View`
  border: ${t.borderWidth.hairline}px solid ${t.colors.border};
  background-color: ${t.colors.surfaceMuted};
  padding: ${t.space.sm}px;
  margin-vertical: ${t.space.xs}px;
`;

const Blockquote = styled.View`
  border-left-width: ${t.borderWidth.heavy}px;
  border-left-color: ${t.colors.border};
  padding-left: ${t.space.sm}px;
  margin-vertical: ${t.space.xs}px;
`;

const ThematicBreak = styled.View`
  height: ${t.borderWidth.hairline}px;
  background-color: ${t.colors.border};
  margin-vertical: ${t.space.sm}px;
`;

// HTML-tag override map. The native renderer dispatches `h('p', …)`,
// `h('a', …)`, `h('pre', …)`, etc. Unknown tags fall back to View/Text
// via the renderer's HTML-to-RN map; we only override what we want to
// style explicitly.
const overrides: NonNullable<NativeOptions['overrides']> = {
  code: { component: InlineCode },
  strong: { component: Strong },
  b: { component: Strong },
  em: { component: Em },
  i: { component: Em },
  a: { component: Link },
  pre: { component: CodeBlock },
  blockquote: { component: Blockquote },
  hr: { component: ThematicBreak },
};

function variantStyles(
  variant: Variant,
  theme: ShowcaseTheme
): NonNullable<NativeOptions['styles']> {
    throw new Error("STUB");
}

function openExternal(url: string) {
    throw new Error("STUB");
}

interface MarkdownProps {
  children: React.ReactNode;
  variant?: Variant;
  /**
   * Force inline rendering (single paragraph, no <p> wrapper). Useful
   * inside flow text. Block mode is the default and renders paragraphs
   * + lists + headings.
   */
  inline?: boolean;
  onLinkPress?: (url: string) => void;
}

// JSX children come through as string-or-mixed; flatten + coerce so
// `<Markdown>multi-line text</Markdown>` works without ceremony.
function flatten(children: React.ReactNode): string {
    throw new Error("STUB");
}

export function Markdown({
  children,
  variant = 'caption',
  inline = false,
  onLinkPress,
}: MarkdownProps) {
    throw new Error("STUB");
}

export function InlineMarkdown(props: Omit<MarkdownProps, 'inline'>) {
    throw new Error("STUB");
}

export type { NativeOptions };
export const isWeb = Platform.OS === 'web';
