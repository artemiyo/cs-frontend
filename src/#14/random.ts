export function random<T>(min: number, max: number) {
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      return {
        value: Math.floor(Math.random() * (max - min)) + min,
        done: false,
      };
    },
  };
}
