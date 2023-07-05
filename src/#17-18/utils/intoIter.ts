export function intoIter<T>(iterable: Iterable<T>): IterableIterator<T> {
  const iter = iterable[Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      return iter.next();
    },
  };
}
