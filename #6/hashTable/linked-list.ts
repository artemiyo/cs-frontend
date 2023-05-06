class LinkedListNode {
  value: any;
  next: any;
  constructor(value, next?) {
    this.value = value;
    this.next = next ?? null;
  }
}

export class LinkedList {
  #first;
  constructor() {}

  push(value) {
    this.#first = new LinkedListNode(value, this.#first);
  }

  pop() {
    this.#first = this.#first?.next;
  }

  *nodes() {
    let cursor = this.#first;

    while (cursor !== null) {
      yield cursor.value;
      cursor = cursor.next;
    }
  }

  *values() {
    for (const { value } of this.nodes()) {
      yield value;
    }
  }

  [Symbol.iterator]() {
    return this.values();
  }
}
