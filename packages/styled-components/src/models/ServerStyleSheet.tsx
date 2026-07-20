import React from 'react';
import { type PipeableStream } from 'react-dom/server';
import { SC_ATTR, SC_ATTR_VERSION, SC_VERSION } from '../constants';
import StyleSheet from '../sheet';
import styledError from '../utils/error';
import { escapeCssForStyleTag, escapeHtmlAttribute } from '../utils/escapeStyleSink';

declare const __SERVER__: boolean;
import getNonce from '../utils/nonce';
import { StyleSheetManager } from './StyleSheetManager';

const CLOSING_TAG_R = /*#__PURE__*/ /^\s*<\/[a-z]/i;

export default class ServerStyleSheet {
  instance: StyleSheet;
  sealed: boolean;

  constructor({ nonce }: { nonce?: string } = {}) {
    this.instance = new StyleSheet({ isServer: true, nonce });
    this.sealed = false;
  }

  _emitSheetCSS = (): string => {
      throw new Error("STUB");
  };

  collectStyles(children: any): React.JSX.Element {
      throw new Error("STUB");
  }

  getStyleTags = (): string => {
      throw new Error("STUB");
  };

  getStyleElement = () => {
      throw new Error("STUB");
  };

  interleaveWithNodeStream(input: NodeJS.ReadableStream | PipeableStream): NodeJS.ReadWriteStream {
      throw new Error("STUB");
  }

  seal = (): void => {
      throw new Error("STUB");
  };
}
