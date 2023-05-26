import { LinkedList } from "./linked-list";
import { Hasher } from "./hasher";

class HashTable {
  #buffer;
  #capacity;
  #hasher;
  #length = 0;

  constructor(hasher: any, capacity = 31) {
    this.#hasher = new hasher(capacity);
    this.#capacity = capacity;
    this.#buffer = new Array(capacity).fill(null);
  }

  set(key: string | number | object, value: any) {
    if (this.#length >= this.#capacity * 0.7) {
      this.#grow();
    }

    const index = this.#hasher.hash(key);
    let list = this.#buffer[index];

    if (list === null) {
      list = new LinkedList();
      this.#buffer[index] = list;
    }

    for (const tuple of list) {
      if (key === tuple[0]) {
        tuple[1] = value;
        return;
      }
    }

    list.push([key, value]);
    this.#length++;
  }

  get(key: string | number | object) {
    const index = this.#hasher.hash(key);
    const list = this.#buffer[index];

    if (list !== null) {
      for (const [valueKey, value] of list) {
        if (key === valueKey) {
          return value;
        }
      }
    }
  }

  has(key: string | number | object) {
    const index = this.#hasher.hash(key);
    const list = this.#buffer[index];

    if (list !== null) {
      for (const [valueKey] of list) {
        if (key === valueKey) {
          return true;
        }
      }
    }
    return false;
  }

  #grow() {
    this.#capacity = this.#capacity * 2 + 1;
    const newBuffer = new Array(this.#capacity);
    const cursor = this.#buffer.values();

    for (const list of cursor) {
      if (list === null) {
        continue;
      }

      for (const [key, value] of list) {
        this.set(key, value);
      }
    }

    this.#buffer = newBuffer;
  }
}

const hashTable = new HashTable(Hasher);

hashTable.set(10, 1);
console.log(hashTable.get(10));
