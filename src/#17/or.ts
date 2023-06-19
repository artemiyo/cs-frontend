import { GeneratorResult, Parser, ParserToken } from "./types";
import { tag } from "./tag";
import { intoBuffer, intoIter } from "./utils";
import { seq } from "../#14/seq";

function or(...parsers: Parser[]): Parser {
  return function* (iterable, prev): GeneratorResult {
    let yields: ParserToken[] = [];

    let value;
    let iter = intoIter(iterable);
    let done = false;

    outer: for (const parser of parsers) {
      const buffer: string[] = [];
      const parsing = parser(intoBuffer(iter, buffer));
      const chunk = parsing.next();

      while (true) {
        try {
          if (chunk.done) {
            done = true;
            value = chunk.value[0];
            iter = intoIter(chunk.value[1]);
            break outer;
          } else {
            yields.push(chunk.value);
          }
        } catch (err) {
          iter = buffer.length > 0 ? seq(buffer, iter) : iter;
          yields = [];
          break;
        }
      }
    }

    if (!done) {
      throw new Error("Invalid data");
    }

    yield* yields;

    return [{ type: "OR", value }, iter];
  };
}

const boolExpr = or(tag("true"), tag("false"))("false");
console.log(boolExpr.next());
