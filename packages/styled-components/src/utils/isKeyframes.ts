import type KeyframesClass from '../models/Keyframes';

const KEYFRAMES_SYMBOL = Symbol.for('sc-keyframes');

export default function isKeyframes(value: unknown): value is KeyframesClass {
    throw new Error("STUB");
}

export { KEYFRAMES_SYMBOL };
