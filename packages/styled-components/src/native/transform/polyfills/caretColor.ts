import { Dict } from '../../../types';
import { getReactNativePlatformOS, warnOnce } from '../dev';
import { colorTokenToRnStyleValue, consumeColor } from '../shorthandHelpers';
import { register } from '../shorthands';
import { Token, TokenKind } from '../tokens';
import { TokenStream } from '../tokenStream';

/**
 * `caret-color: auto | <color> [auto | <color>]?`. `auto` resolves to
 * currentColor.
 */

function caretColorShorthand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

register('caretColor', caretColorShorthand);
