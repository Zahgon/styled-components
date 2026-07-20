import { resetWarnOnce } from '../src/utils/warnOnce';

const consoleError = console.error;

const suppressedErrors = [
  'Error: Could not parse CSS stylesheet',
  'Warning: Use the `defaultValue` or `value` props instead of setting children on <textarea>',
  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  'Warning: <%s /> is using incorrect casing.',
  'Warning: The tag <%s> is unrecognized in this browser.',
  'Warning: React does not recognize the `%s` prop on a DOM element.',
  'Warning: %s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
  'Warning: renderToNodeStream is deprecated. Use renderToPipeableStream instead.',
];

beforeEach(() => {
    throw new Error("STUB");
});

afterEach(() => {
    throw new Error("STUB");
});
