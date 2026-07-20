import { Token, TokenKind } from '../tokens';
import { tokenizeFunctionArgs } from '../tokenize';

export interface LinearEasingStop {
  t: number;
  v: number;
}

export function parseLinearEasing(tok: Token): LinearEasingStop[] | null {
    throw new Error("STUB");
}

function parseStop(tokens: Token[]): LinearEasingStop[] | null {
  if (tokens.length === 0) return null;
  const first = tokens[0];
  if (first.kind !== TokenKind.Number) return null;
  const v = first.value!;
  const ts: number[] = [];
  for (let i = 1; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.kind !== TokenKind.Percent) return null;
    ts.push(t.value! / 100);
  }
  // Grammar: `<number> && <percentage>{0,2}`; 3+ percents invalid.
  if (ts.length > 2) return null;
  if (ts.length === 0) return [{ t: NaN, v }];
  return ts.map(t => { throw new Error("STUB"); });
}

function distributeStops(stops: LinearEasingStop[]): LinearEasingStop[] {
    throw new Error("STUB");
}
