import { intoIter } from "./intoIter";

// export function* intoBuffer<T>(
//   iterable: Iterable<T>,
//   buffer: T[]
// ): IterableIterator<T> {
//   for (const item of intoIter(iterable)) {
//     buffer.push(item);
//
//     yield item;
//   }
// }

export function intoBuffer<T>(
  iterable: Iterable<T>,
  buffer: T[]
): IterableIterator<T> {
  const iter = intoIter(iterable);

  return {
    [Symbol.iterator]() {
      return this;
    },
    next(): IteratorResult<T> {
      const chunk = iter.next();

      if (chunk.done) {
        buffer.push(chunk.value);
      }

      return chunk;
    },
  };
}
