const getHashCode = Symbol();
const hashCode = Symbol();

Object.defineProperty(Object.prototype, getHashCode, {
  configurable: true,
  value() {
    if (!(hashCode in this)) {
      Object.defineProperty(this, hashCode, {
        value: getRandomInt(0, 2 ** 32),
      });
    }

    return this[hashCode];

    function getRandomInt(from, to) {
      return Math.floor(Math.random() * (to - from)) + from;
    }
  },
});

export class Hasher {
  readonly #size: number;
  constructor(readonly size: number) {
    this.#size = size;
  }

  hash(value: string | number | object) {
    switch (typeof value) {
      case "string":
        return this.#getStringHash(value);
      case "number":
        return this.#getNumberHash(value);
      case "object":
        return this.#getObjectHash(value);
      default:
        throw new Error("Invalid data!");
    }
  }

  #getNumberHash(number: number) {
    return number % this.#size;
  }

  #getStringHash(str: string) {
    let result = str.charCodeAt(0);
    const base = 2 ** 16;

    for (let i = 1; i < str.length; i++) {
      result += this.#getNumberHash(str.charCodeAt(i) * base ** i);
    }

    return this.#getNumberHash(result);
  }

  #getObjectHash(obj: any) {
    if (obj === null) {
      throw new Error("Invalid Data!");
    }

    return this.#getNumberHash(obj[getHashCode]());
  }
}
