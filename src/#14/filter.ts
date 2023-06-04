export function filter<T>(
  iter: Iterable<T>,
  pred: (el: T) => boolean
): IterableIterator<T> {
  const innerIter = iter[Symbol.iterator]();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      let chunk = innerIter.next();

      while (true) {
        if (chunk.done) {
          return {
            value: undefined,
            done: true,
          };
        }

        if (pred(chunk.value)) {
          return chunk;
        }

        chunk = innerIter.next();
      }
    },
  };
}
