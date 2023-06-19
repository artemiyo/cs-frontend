import { GeneratorResult, Parser } from "./types";
import { tag, take } from ".";
import { intoIter } from "./utils";

export function seq(...parsers: Parser[]): Parser {
  return function* (iterable): GeneratorResult {
    let value = "";
    let iter = intoIter(iterable);

    for (const parser of parsers) {
      const parsing = parser(iter);

      while (true) {
        const chunk = parsing.next();

        if (chunk.done) {
          const [token, iterator] = chunk.value;
          iter = intoIter(iterator);
          value += token.value;
          break;
        } else {
          yield chunk.value;
        }
      }
    }

    return [{ type: "SEQ", value }, iter];
  };
}

const fnExpr = seq(
  tag("function "),

  take(/[a-z_$]/i, { max: 1 }),
  take(/\w/, { min: 0 }),

  tag("()")
)("function foo() {}");

fnExpr.next().value; // {done: true, value: {type: 'SEQ', value: 'function foo()'}}
