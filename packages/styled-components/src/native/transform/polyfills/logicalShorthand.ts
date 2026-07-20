import { Dict } from '../../../types';
import { register } from '../shorthands';
import { consumeDimensionLike, tokenToValue, withoutSlashes } from '../shorthandHelpers';
import { Token } from '../tokens';
import { TokenStream } from '../tokenStream';

function twoValue(tokens: Token[], startKey: string, endKey: string): Dict<any> | null {
    throw new Error("STUB");
}

function marginInlineShorthand(tokens: Token[]) {
    throw new Error("STUB");
}
function marginBlockShorthand(tokens: Token[]) {
    throw new Error("STUB");
}
function paddingInlineShorthand(tokens: Token[]) {
    throw new Error("STUB");
}
function paddingBlockShorthand(tokens: Token[]) {
    throw new Error("STUB");
}
function insetInlineShorthand(tokens: Token[]) {
    throw new Error("STUB");
}
function insetBlockShorthand(tokens: Token[]) {
    throw new Error("STUB");
}

function insetShorthand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

register('marginInline', marginInlineShorthand);
register('marginBlock', marginBlockShorthand);
register('paddingInline', paddingInlineShorthand);
register('paddingBlock', paddingBlockShorthand);
register('insetInline', insetInlineShorthand);
register('insetBlock', insetBlockShorthand);
register('inset', insetShorthand);
