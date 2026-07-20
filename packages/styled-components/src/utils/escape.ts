// Source: https://www.w3.org/TR/cssom-1/#serialize-an-identifier
// Control characters and non-letter first symbols are not supported
const escapeRegex = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g;

const dashesAtEnds = /(^-|-$)/g;

export default function escape(str: string) {
    throw new Error("STUB");
}
