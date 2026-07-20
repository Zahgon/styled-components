import { Dict } from '../../../types';
import { warnOnce } from '../dev';
import { consumeDimensionLike, tokenToValue, withoutSlashes } from '../shorthandHelpers';
import { register } from '../shorthands';
import { Token, TokenKind } from '../tokens';
import { TokenStream } from '../tokenStream';

/**
 * Standalone `translate` / `rotate` / `scale`. RN 0.85 has these names
 * only inside the `transform` array; we lower to a CSS transform string
 * (parsed by RN 0.74+). Composition with an authored `transform:` is
 * cascade-last-wins; not merged here.
 */

function dimToCss(t: Token): string {
    throw new Error("STUB");
}

function warn3DDrop(code: string, prop: string): void {
    throw new Error("STUB");
}

function translateShorthand(tokens: Token[], rawValue: string): Dict<any> | null {
    throw new Error("STUB");
}

const ROTATE_AXIS = new Set(['x', 'y', 'z']);

function rotateShorthand(tokens: Token[], rawValue: string): Dict<any> | null {
    throw new Error("STUB");
}

function consumeNumericFactor(stream: TokenStream): number | null {
    throw new Error("STUB");
}

function scaleShorthand(tokens: Token[], rawValue: string): Dict<any> | null {
    throw new Error("STUB");
}

register('translate', translateShorthand);
register('rotate', rotateShorthand);
register('scale', scaleShorthand);

/**
 * `transform-box`. RN has no transform-box surface; the pivot is fixed
 * at the view's center (`transform-origin` shifts the origin point
 * relative to that). The keyword set
 * `content-box | border-box | fill-box | stroke-box | view-box` has no
 * mapping; the declaration emits a one-time dev warn and drops.
 */
const TRANSFORM_BOX_VALUES = new Set([
  'content-box',
  'border-box',
  'fill-box',
  'stroke-box',
  'view-box',
]);

function transformBoxHandler(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

register('transformBox', transformBoxHandler);

/**
 * `perspective` standalone property. Syntax: `none | <length [0,∞]>`.
 * Initial: `none`.
 *
 * RN has no separate perspective-for-descendants attribute; the
 * closest mapping is to prepend `perspective(<length>)` to this
 * element's `transform` array, which establishes a 3D rendering
 * context for the element itself. The behavior approximates the CSS
 * property when the children carry their own 3D transforms.
 *
 * `perspective: none` clears the value; emitted as `transform: 'none'`
 * which RN treats as the identity transform.
 *
 * Lengths < 1px clamp at 1px for rendering.
 *
 * Composition with author transforms: the handler emits the sentinel
 * key `PERSPECTIVE_SENTINEL_KEY` instead of `transform` directly so a
 * post-merge fold in `compileNative.processDecls` can prepend the
 * `perspective(N)` function to any other `transform` value emitted in
 * the same declaration block. Without this indirection cascade
 * last-wins would silently drop the perspective whenever the user also
 * declares `transform:`.
 */
export const PERSPECTIVE_SENTINEL_KEY = '__sc_perspective';

function perspectiveHandler(tokens: Token[], rawValue: string): Dict<any> | null {
    throw new Error("STUB");
}

register('perspective', perspectiveHandler);

/**
 * `perspective-origin: <position>`. Sets the vanishing point that
 * perspective-transformed descendants converge toward. RN 0.85 has no
 * perspective-origin surface; the vanishing point is fixed at the
 * parent's center. Drops with a one-time dev warn on iOS / Android;
 * passes through on rn-web for the browser to interpret.
 */
function perspectiveOriginHandler(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

register('perspectiveOrigin', perspectiveOriginHandler);

/**
 * `transform-style: flat | preserve-3d`. RN 0.85 has no transformStyle
 * prop; `preserve-3d` is silently dropped on iOS / Android. The iOS
 * 3D-bleed memory documents a known compositor side-effect when nested
 * 3D transforms appear without preserve-3d.
 */
function transformStyleHandler(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

register('transformStyle', transformStyleHandler);
