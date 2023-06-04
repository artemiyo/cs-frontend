function zip<T>(...iterables: Iterable<any>[]): IterableIterator<T> {
  const iters = iterables.map((i) => i[Symbol.iterator]());
  return {
    [Symbol.iterator]() {
      return this;
    },
    next(): IteratorResult<any> {
      const res = new Array(iters.length);

      for (const [i, iter] of iters.entries()) {
        const chunk = iter.next();

        if (chunk.done) {
          return { value: undefined, done: true };
        }

        res[i] = chunk.value;
      }

      return {
        value: res,
        done: false,
      };
    },
  };
}

console.log(...zip([1, 2], new Set([3, 4]), "bl")); // [[1, 3, b], [2, 4, 'l']]
