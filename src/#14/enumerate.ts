export function enumerate<T>(
  iterator: Iterable<T>
): IterableIterator<[number, T]> {
  const innerIter = iterator[Symbol.iterator]();
  let index = 0;

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      let { done, value } = innerIter.next();

      if (done) {
        return {
          value: undefined,
          done: true,
        };
      }

      return {
        value: [index++, value],
        done: false,
      };
    },
  };
}
