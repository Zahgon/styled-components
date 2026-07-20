import { Dict } from '../../../types';
import { getReactNativePlatformOS, warnOnce } from '../dev';
import { register } from '../shorthands';
import { tokenizeFunctionArgs } from '../tokenize';
import { Token, TokenKind } from '../tokens';
import { TokenStream } from '../tokenStream';

/**
 * `corner-shape` shorthand (CSS Borders 4). Authors describe a corner
 * contour with a superellipse; React Native exposes only `borderCurve:
 * 'circular' | 'continuous'` (iOS-only at the platform layer; Android
 * ignores it). The polyfill maps the two contours RN can actually draw
 * (`round` -> circular, `squircle` -> Apple's continuous curve) and warns
 * for every other contour the platform can't approximate.
 *
 * `borderCurve` is a single per-view prop, so a value that maps different
 * corners to different curves cannot be applied truthfully; that drops
 * with a warning rather than guessing.
 *
 * rn-web passes the raw value through: Chrome 139+ ships `corner-shape`.
 */

// Contours RN can draw, expressed as their borderCurve target.
type Curve = 'circular' | 'continuous';

// superellipse() parameter proximity bands. round == superellipse(1),
// squircle == superellipse(2). Values near 1 read as circular; values
// near 2 read as Apple-smooth (continuous). Anything outside both bands
// has no faithful RN contour.
const CIRCULAR_MIN = 0.75;
const CIRCULAR_MAX = 1.25;
const CONTINUOUS_MIN = 1.5;
const CONTINUOUS_MAX = 2.5;

const KEYWORD_CURVE: Record<string, Curve> = Object.create(null);
KEYWORD_CURVE.round = 'circular';
KEYWORD_CURVE.squircle = 'continuous';

// Keywords with a defined contour that RN cannot render at all.
const UNSUPPORTED_KEYWORDS = new Set(['scoop', 'bevel', 'notch', 'square']);

function warnUnsupported(raw: string): void {
    throw new Error("STUB");
}

function warnAndroid(): void {
    throw new Error("STUB");
}

// Resolve one `<corner-shape-value>` token (keyword or superellipse())
// to a Curve, or `null` when no faithful RN contour exists.
function resolveValue(t: Token): Curve | null {
    throw new Error("STUB");
}

export function cornerShapeShorthand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

register('cornerShape', cornerShapeShorthand);
