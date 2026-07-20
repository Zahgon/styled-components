// This simulates a consumer file that exposes DefaultTheme in its public API,
// forcing TypeScript to emit the type in .d.ts output.
import { DefaultTheme } from 'styled-components';

export function getThemeColor(theme: DefaultTheme) {
    throw new Error("STUB");
}

export function makeTheme(): DefaultTheme {
    throw new Error("STUB");
}
