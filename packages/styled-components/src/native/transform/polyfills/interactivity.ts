import { Dict } from '../../../types';
import { getReactNativePlatformOS, warnOnce } from '../dev';
import { register } from '../shorthands';
import { Token, TokenKind } from '../tokens';
import { TokenStream } from '../tokenStream';

/**
 * `interactivity: auto | inert`. Initial: `auto`.
 *
 * `inert` makes the element and its subtree non-interactive: no pointer
 * events, no focus, no text-selection, no hit-testing. RN has no single
 * `inert` prop; the polyfill lifts six top-level props (all force-override
 * the author value per SPECIAL_CASE_PROPS, since `inert` applies
 * "regardless of [the surface's] actual value"):
 *
 *   pointerEvents="none"                          : blocks touch on root + descendants
 *   accessibilityElementsHidden={true}           : iOS: hide subtree from VoiceOver
 *   importantForAccessibility="no-hide-descendants" : Android: hide subtree from TalkBack
 *   focusable={false}                              : root: prevent D-pad/keyboard focus
 *   selectable={false}                             : Text/TextInput: no text selection
 *   editable={false}                               : TextInput: not editable
 *
 * Known limitation: RN doesn't propagate `focusable={false}` to
 * descendants, so a focusable child inside an inert subtree may still
 * receive D-pad / keyboard focus on Android. A future refactor could
 * traverse the subtree at render time; for now the lift covers the
 * common case.
 */
function interactivityHandler(tokens: Token[]): Dict<any> | null {
    throw new Error("STUB");
}

register('interactivity', interactivityHandler);
