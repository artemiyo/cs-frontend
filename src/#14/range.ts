class InnerRange<T> {
  from: number;
  to: number;
  type: string;
  reversed: boolean;

  constructor(from: T, to: T) {
    this.type = typeof from === "string" ? "string" : "number";
    this.from = this.#getNumber(from);
    this.to = this.#getNumber(to);
    this.reversed = this.from > this.to;
  }

  [Symbol.iterator]() {
    return this.values();
  }

  reverse(): IterableIterator<T> {
    return new InnerRange(
      this.#getChar(this.to),
      this.#getChar(this.from)
    ).values();
  }

  values(): IterableIterator<T> {
    let start = this.from;
    let finish = this.to;

    return {
      [Symbol.iterator]() {
        return this;
      },
      next: () => {
        if (this.reversed ? start < finish : start > finish) {
          return {
            value: undefined,
            done: true,
          };
        }

        const value = this.#getChar(this.reversed ? start-- : start++);

        return {
          value,
          done: false,
        };
      },
    };
  }

  #getNumber(value: T) {
    if (this.type === "string") {
      return String(value).codePointAt(0);
    }

    return Number(value);
  }

  #getChar = (value: number) => {
    if (this.type === "string") {
      return <T>String.fromCodePoint(value);
    }

    return <T>Number(value);
  };
}

const symbolRange = new InnerRange("a", "f");
console.log(Array.from(symbolRange.reverse()));
