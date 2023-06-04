export function take<T>(iter: Iterable<T>, limit: number): IterableIterator<T> {
  const innerIter = iter[Symbol.iterator]();
  let total = 0;

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (total >= limit) {
        return {
          value: undefined,
          done: true,
        };
      }
      total++;

      return innerIter.next();
    },
  };
}
