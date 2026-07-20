import { Dict } from '../../../types';
import { consumeColor, colorTokenToRnStyleValue } from '../shorthandHelpers';
import { register } from '../shorthands';
import { Token, TokenKind } from '../tokens';
import { TokenStream } from '../tokenStream';
import { getSystemColorPlatformColor } from './systemColors';

/** `accent-color: auto | <color>`. Lifts trackColor.true on Switch and
 *  keeps `accentColor` in the style bag so attrs callbacks can route the
 *  value onto arbitrary wrapped components via `ast.pop('accentColor')`. */
function accentColorHandler(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

register('accentColor', accentColorHandler);
