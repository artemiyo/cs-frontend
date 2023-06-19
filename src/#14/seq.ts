// function seq(...iters: Iterable<any>[]) {
//   const iter = iters.map((i) => i[Symbol.iterator]()).values();
//
//   let cursor = iter.next();
//   let innerCursor;
//
//   return {
//     [Symbol.iterator]() {
//       return this;
//     },
//     next() {
//       while (true) {
//         if (cursor.done) {
//           return {
//             value: undefined,
//             done: true,
//           };
//         }
//
//         innerCursor ??= cursor.value;
//         const chunk = innerCursor.next();
//
//         if (!chunk.done) {
//           return chunk;
//         }
//
//         cursor = iter.next();
//         innerCursor = null;
//       }
//     },
//   };
// }

export function seq<T>(...iterable: Iterable<T>[]): IterableIterator<T> {
  let cursor = 0,
    iter = iterable[cursor][Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      let chunk = iter.next();

      while (chunk.done) {
        cursor++;

        if (iterable[cursor] == null) {
          return chunk;
        }

        iter = iterable[cursor][Symbol.iterator]();
        chunk = iter.next();
      }

      return chunk;
    },
  };
}
