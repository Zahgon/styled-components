import { Dict } from '../../../types';
import { register } from '../shorthands';
import { Token, TokenKind } from '../tokens';
import { TokenStream } from '../tokenStream';

/**
 * `line-clamp` / `-webkit-line-clamp` → RN `numberOfLines`.
 * RN's Text only renders the default `…` ellipsis; `<block-ellipsis>` and
 * `-webkit-legacy` parse-accept but emit nothing. `numberOfLines: 0` is
 * RN's sentinel for unlimited.
 */
function lineClampShorthand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

register('lineClamp', lineClampShorthand);
