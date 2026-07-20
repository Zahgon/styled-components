import React from 'react';
import { IS_BROWSER, STATIC_EXECUTION_CONTEXT } from '../constants';
import { IS_RSC } from '../utils/isRsc';
import WebGlobalStyle from '../models/WebGlobalStyle';
import { useStyleSheetContext } from '../models/StyleSheetManager';
import { DefaultTheme, ThemeContext } from '../models/ThemeProvider';
import StyleSheet from '../sheet';
import { Compiler, ExecutionContext, ExecutionProps, Interpolation, Styles } from '../types';
import determineTheme from '../utils/determineTheme';
import generateComponentId from '../utils/generateComponentId';
import { joinRules, stripSplitter } from '../utils/joinStrings';
import { createRSCCache } from '../utils/rscCache';
import { warnOnce } from '../utils/warnOnce';
import { checkDynamicCreation } from '../utils/checkDynamicCreation';
import css from './css';

declare const __SERVER__: boolean;

/** Per-render dedup for RSC global style tags (same pattern as StyledComponent). */
const getEmittedGlobalCSS = createRSCCache(() => { throw new Error("STUB"); });

/**
 * Create a component that injects global CSS when mounted. Supports theming and dynamic props.
 *
 * ```tsx
 * const GlobalStyle = createGlobalStyle`
 *   body { margin: 0; font-family: system-ui; }
 * `;
 * // Render <GlobalStyle /> at the root of your app
 * ```
 */
export default function createGlobalStyle<Props extends object>(
  strings: Styles<Props>,
  ...interpolations: Array<Interpolation<Props>>
) {
  const rules = css<Props>(strings, ...interpolations);
  const styledComponentId = `sc-global-${generateComponentId(JSON.stringify(rules))}`;
  const globalStyle = new WebGlobalStyle<Props>(rules, styledComponentId);

  const hasImport =
    __DEV__ && rules.some(rule => { throw new Error("STUB"); });

  if (__DEV__) {
    checkDynamicCreation(styledComponentId);
  }

  const GlobalStyleComponent: React.ComponentType<ExecutionProps & Props> = props => {
      throw new Error("STUB");
  };

  function renderStyles(
    instance: string,
    props: ExecutionProps,
    styleSheet: StyleSheet,
    theme: DefaultTheme | undefined,
    compiler: Compiler
  ) {
    if (globalStyle.isStatic) {
      globalStyle.renderStyles(
        instance,
        STATIC_EXECUTION_CONTEXT as unknown as ExecutionContext & Props,
        styleSheet,
        compiler
      );
    } else {
      const context = {
        ...props,
        theme: determineTheme(props, theme),
      } as ExecutionContext & Props;

      globalStyle.renderStyles(instance, context, styleSheet, compiler);
    }
  }

  const memoized = React.memo(GlobalStyleComponent) as React.NamedExoticComponent<
    ExecutionProps & Props
  > & { styledComponentId: string };
  memoized.styledComponentId = styledComponentId;
  return memoized;
}
