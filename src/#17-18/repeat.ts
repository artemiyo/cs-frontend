import { seq as iterSeq } from "../#14/seq";
import { tag } from "./tag";
import { take } from "./take";
import { Parser, ParserToken, ParserValue } from "./types";
import { intoBuffer, intoIter } from "./utils";
import { seq } from "./seq";

function repeat(
  parser: Parser,
  options: Pick<ParserValue, "max" | "min">
): Parser {
  return function* (iterable, prev) {
    const { min = 1, max = Infinity } = options;
    const value: (typeof prev)[] = [];
    let yields: ParserToken[] = [];

    let iter = intoIter(iterable);
    let count = 0;

    const globalBuffer: string[] = [];

    outer: while (true) {
      const buffer: string[] = count >= min ? [] : globalBuffer;
      const parsing = parser(intoBuffer(iter, buffer));

      while (true) {
        if (count >= max) {
          yield* yields;
          break outer;
        }

        try {
          const chunk = parsing.next();

          if (chunk.done) {
            prev = chunk.value[0];
            iter = intoIter(chunk.value[1]);

            value.push(<any>prev);
            count++;

            if (count >= min) {
              yield* yields;
              yields = [];
            }

            break;
          } else {
            yields.push(chunk.value);
          }
        } catch (err) {
          if (count < min) {
            throw err;
          }

          iter = buffer.length > 0 ? iterSeq(iter, buffer) : iter;
          break outer;
        }
      }
    }

    return [{ type: "REPEAT", value }, iter];
  };
}

function opt<T = unknown, R = unknown>(
  parser: Parser<T, R>,
  opts?: Pick<ParserValue<T[]>, "min" | "max">
): Parser {
  return repeat(parser, { min: 0, max: 1, ...opts });
}

const fnExpr = repeat(seq(take(/\d/), tag(",")), { min: 1 })("100,200,300,");

console.log(fnExpr.next()); // {done: false, value: {type: 'SEQ', value: '100,'}}
console.log(fnExpr.next()); // {done: false, value: {type: 'SEQ', value: '200,'}}
console.log(fnExpr.next()); // {done: false, value: {type: 'SEQ', value: '300,'}}
