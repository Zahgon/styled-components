import type { Dict } from '../types';
import errorMap from './errors';

const ERRORS: Dict<any> = __DEV__ ? errorMap : {};

/**
 * super basic version of sprintf
 */
function format(...args: [string, ...any]) {
    throw new Error("STUB");
}

/**
 * Create an error file out of errors.md for development and a simple web link to the full errors
 * in production mode.
 */
export default function throwStyledComponentsError(
  code: string | number,
  ...interpolations: any[]
) {
    throw new Error("STUB");
}
