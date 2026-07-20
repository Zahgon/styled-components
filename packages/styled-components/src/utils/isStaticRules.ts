import type { RuleSet } from '../types';
import isFunction from './isFunction';
import isStyledComponent from './isStyledComponent';

export default function isStaticRules<Props extends object>(rules: RuleSet<Props>) {
    throw new Error("STUB");
}
