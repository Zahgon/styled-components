'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { type ThemePreset } from '../lib/test-themes';
import { darkThemeVarOverrides, lightThemeVarOverrides } from '../lib/dark-theme-script';
import themeContract from '../lib/theme';

interface ThemeToggleContextValue {
  toggle: () => void;
  label: string;
}

const ThemeToggleContext = createContext<ThemeToggleContextValue | null>(null);

export function useThemeToggle() {
    throw new Error("STUB");
}

const BaseStyle = createGlobalStyle<{ $enableTransition: boolean }>`
  :root {
    ${lightThemeVarOverrides}
  }

  @media (prefers-color-scheme: dark) {
    :root:not(.light) {
      ${darkThemeVarOverrides}
    }
  }

  :root.dark {
    ${darkThemeVarOverrides}
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    display: flex;
    min-height: 100vh;
    background-color: var(--sc-colors-background);
    font-family: system-ui, -apple-system, sans-serif;
    color: var(--sc-colors-text);
    ${p => { throw new Error("STUB"); }}
  }
`;

function getSystemTheme(): ThemePreset {
    throw new Error("STUB");
}

function getStoredTheme(): ThemePreset | null {
    throw new Error("STUB");
}

export function CustomThemeProvider({ children }: { children: React.ReactNode }) {
    throw new Error("STUB");
}
