import { Parser, GeneratorResult } from "./types";
import { intoIter } from "./utils";

export function tag(str: Iterable<string>): Parser {
  return function* (iterable): GeneratorResult {
    let iter = intoIter(iterable);
    let result = "";

    for (const char of str) {
      let { done, value } = iter.next();

      if (done || value !== char) {
        throw new Error("String is not valid!");
      }

      result += char;
    }

    return [{ type: "TAG", value: result }, iter];
  };
}

const fnTag = tag("function")("function foo() {}");
fnTag.next()
// console.log(fnTag.next()); // {done: true, value: {type: 'TAG', value: 'function'}}
