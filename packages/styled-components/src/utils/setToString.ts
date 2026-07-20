/**
 * Override `toString` on an object. Tries direct assignment first (fast,
 * keeps the wrapper's hidden class on V8's regular property-transition
 * chain); falls back to `defineProperty` only when assignment is blocked
 * (e.g., `Object.prototype.toString` frozen by a test/security harness).
 */
const directAssignmentWorks: boolean = (() => {
    throw new Error("STUB");
})();

export function setToString(object: object, toStringFn: () => string) {
    throw new Error("STUB");
}
