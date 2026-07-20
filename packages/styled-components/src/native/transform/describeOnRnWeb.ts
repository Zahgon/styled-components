/**
 * Declare a subtree that exercises the rn-web compile-time toggle: sets
 * `globalThis.__NATIVE_WEB__` for the enclosing `describe`, then restores the
 * prior binding. Matches `globals.ts` + AGENTS.rn-web parity tests.
 */

export function describeOnRnWeb(run: () => void): void;
export function describeOnRnWeb(title: string, run: () => void): void;
export function describeOnRnWeb(titleOrCb: string | (() => void), cbMaybe?: () => void): void {
    throw new Error("STUB");
}
