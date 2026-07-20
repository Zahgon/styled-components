import { Dict } from '../../../types';
import { warnOnce } from '../dev';
import { register } from '../shorthands';
import { Token, TokenKind } from '../tokens';
import { TokenStream } from '../tokenStream';

const OVERSCROLL_KEYWORDS = new Set(['contain', 'none', 'auto', 'chain']);
const SCROLLBAR_WIDTH_KEYWORDS = new Set(['auto', 'thin', 'none']);
const SNAP_AXIS_KEYWORDS = new Set(['x', 'y', 'block', 'inline', 'both']);
const SNAP_STRICTNESS_KEYWORDS = new Set(['mandatory', 'proximity']);
const SNAP_ALIGN_KEYWORDS = new Set(['none', 'start', 'end', 'center']);

function overscrollBehaviorShorthand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

function scrollbarWidthHandler(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

/**
 * `scroll-snap-type` shorthand:
 *   none | [ x | y | block | inline | both ] [ mandatory | proximity ]?
 * Strictness defaults to `proximity` when omitted.
 *
 * RN has no native scroll-snap engine. Snap points are configured on the
 * scroller (`snapToInterval` / `snapToOffsets`), so the lift approximates
 * the spec on the styled ScrollView:
 *   - `none`       -> no props (free scroll, the ScrollView default)
 *   - `* mandatory` -> snapToAlignment + fast deceleration + full-scrollport
 *                      paging, warning that paging is the approximation and
 *                      that supplying snapToInterval / snapToOffsets gives
 *                      precise snap points (those props override pagingEnabled
 *                      and, as user props, win over the lift)
 *   - `* proximity` -> snapToAlignment + fast deceleration only, warning that
 *                      RN has no proximity engine
 * The axis keyword is accepted but does not change the lift: a ScrollView
 * snaps along whichever axis it scrolls.
 */
function scrollSnapTypeShorthand(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

/**
 * `scroll-snap-align` (on children): [ none | start | end | center ]{1,2}.
 * RN configures snapping on the scroller, not per child, so the native
 * build emits a sentinel the compiler extracts; at render the child
 * registers its measured layout with the nearest styled scroll container,
 * which derives `snapToOffsets` from the aligned children. rn-web passes
 * the raw value through to the browser.
 */
function scrollSnapAlignHandler(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

/**
 * `scroll-snap-stop: normal | always` (on children). `always` rides the
 * same registration as scroll-snap-align: the scroll container sets
 * `disableIntervalMomentum` so a fling cannot skip past the target.
 * `normal` is the initial value (no props). rn-web passes through.
 */
function scrollSnapStopHandler(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

register('overscrollBehavior', overscrollBehaviorShorthand);
register('scrollbarWidth', scrollbarWidthHandler);
register('scrollSnapType', scrollSnapTypeShorthand);
register('scrollSnapAlign', scrollSnapAlignHandler);
register('scrollSnapStop', scrollSnapStopHandler);
