import { Dict } from '../../../types';
import { register } from '../shorthands';
import { Token, TokenKind } from '../tokens';
import { TokenStream } from '../tokenStream';

/**
 * `field-sizing: fixed | content`. Initial: `fixed`. Inherited: no.
 *
 * `content` makes form controls autosize to their content; `fixed` keeps
 * the author-specified dimensions (the default).
 *
 * The polyfill lifts `multiline: true` (via SPECIAL_CASE_PROPS).
 * RN's shadow-view measure callback (`RCTBaseTextInputShadowView.sizeThatFits`)
 * returns the natural text content size with `maximumSize.height = CGFLOAT_MAX`
 * for multiline inputs, so Yoga sizes the view to its text. As the user types
 * the shadow view dirties, Yoga re-measures, and the view grows on its own;
 * no JS-side `onContentSizeChange` wiring required. Setting an explicit
 * `height` on the input would defeat that natural growth, so the polyfill
 * intentionally only flips `multiline`. Author-declared `min-height` and
 * `max-height` still apply.
 *
 * If the user explicitly passes `multiline={false}` they bypass the lift;
 * the render path warns once so the missing autosize behavior is visible
 * in dev.
 */
function fieldSizingHandler(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

register('fieldSizing', fieldSizingHandler);
