import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

/**
 * Expo Router web HTML shell. The native entry of styled-components
 * resolves theme tokens to literal hex on rn-web, so dark-mode chrome
 * relies on the browser-native `light-dark()` CSS function. That
 * function only honors `prefers-color-scheme` when the document opts
 * into dark via `color-scheme` - without this meta, `light-dark()`
 * silently falls back to its first (light) argument.
 */
export default function Root({ children }: PropsWithChildren) {
    throw new Error("STUB");
}

// Grayscale anti-aliasing for text on web. Browsers default to
// subpixel anti-aliasing on most platforms which renders fonts
// heavier; grayscale matches the appearance of RN's native text
// rendering on iOS / Android and produces a thinner, cleaner look.
const webFontSmoothing = `
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
`;
