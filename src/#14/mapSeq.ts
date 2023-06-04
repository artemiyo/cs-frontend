function mapSeq<T>(iterable: Iterable<T>, callbacks: ((el: T) => T)[]) {
  const iterator = iterable[Symbol.iterator]();

  return {
    [Symbol.iterator](): IterableIterator<T> {
      return this;
    },
    next(): IteratorResult<T> {
      const chunk = iterator.next();
      let value;

      if (chunk.done) {
        return { value: undefined, done: true };
      }

      for (const callback of callbacks) {
        value = callback(value ?? chunk.value);
      }

      return {
        value,
        done: false,
      };
    },
  };
}

console.log(...mapSeq([1, 2, 3], [(el) => el * 2, (el) => el - 1])); // [1, 3, 5]
