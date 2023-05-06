export class Stack<T> {
  #stackArray: [T, string?][];
  #top: number;
  constructor(initialValue?: T) {
    this.#stackArray = initialValue ? [[initialValue]] : [];
    this.#top = -1;
  }

  push(value) {
    this.#stackArray[++this.#top] = value;
  }

  pop() {
    return this.#stackArray[this.#top--];
  }

  isEmpty() {
    return this.#top === -1;
  }

  get length() {
    return this.#stackArray.length;
  }
}
