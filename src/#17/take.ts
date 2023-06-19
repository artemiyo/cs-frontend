import { intoIter } from "./utils";
import { Parser, ParserValue } from "./types";
import { seq } from "../#14/seq";

interface Options extends ParserValue {
  min?: number;
  max?: number;
}

export function take(rule: RegExp, options?: Options): Parser<string> {
  return function* (str) {
    const { min = 1, max = Infinity } = options || {};
    let iter = intoIter(str);
    let total = 0;
    let result = "";
    const buffer: string[] = [];

    while (total < max) {
      let { done, value } = iter.next();

      if (done || !rule.test(value)) {
        buffer.push(value);

        break;
      }

      if (!rule.test(value) && (!result || result.length < min)) {
        throw new Error("Invalid string");
      }

      result += value;
      total++;
    }

    return [
      { type: "TAKE", value: result },
      buffer.length > 0 ? seq(buffer, iter) : iter,
    ];
  };
}

const takeNumber = take(/\d/)("1234 foo");
takeNumber.next()
