import { Result } from "./result";
function exec<R>(generator: () => Generator<any | Result<any>, R, any>) {
  const iter = generator();
  return process()!;

  function process(data?) {
    const chunk = iter.next(data);

    if (chunk.done) {
      return new Result(() => chunk.value);
    }

    const value = chunk.value;
    value.then(process).catch((err) => {
      const chunk = iter.throw(err);

      if (chunk.done) {
        return chunk.value;
      }

      return process(chunk.value);
    });
  }
}

exec(function* main() {
  const a = yield new Result(() => 42);
  const b = yield new Result(() => 10);

  return a * b;
}).then(console.log);
