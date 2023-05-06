class ListNode<V> {
  next: ListNode<V> | null;

  constructor(readonly key: string | number | object, readonly value: string) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashMap<K, V> {
  readonly #data: ListNode<V>[];
  constructor(readonly bufferLength: number) {
    this.#data = new Array(bufferLength);
  }

  _hash(key: string | number | object) {
    if (typeof key === "number") return key;

    const hashValue =
      typeof key === "object" ? JSON.stringify(key) : String(key);

    let total = 0;
    const PRIME_NUMBER = 31;

    for (let i = 0; i < Math.min(hashValue.length, 100); i++) {
      let char = hashValue[i];
      let value = char.charCodeAt(0);
      total = (total * PRIME_NUMBER + value) % this.#data.length;
    }

    return total;
  }

  set(key, value) {
    const index = this._hash(key);
    let currentItem = this.#data[index];
    const listNode = new ListNode<V>(key, value);

    if (!currentItem) {
      this.#data[index] = listNode;
    } else {
      while (currentItem) {
        if (!currentItem.next) {
          currentItem.next = listNode;

          break;
        }

        currentItem = currentItem.next;
      }
    }
  }

  get(key: any) {
    const index = this._hash(key);
    console.log(index);
    let currentItem = this.#data[index];

    if (!currentItem) return undefined;

    if (currentItem.key === key || !currentItem.next)
      return currentItem.value;

    while (currentItem) {
      if (currentItem.key === key) {
        return currentItem.value;
      }

      currentItem = currentItem.next;
    }
  }

  has(key: any) {
    return !!this.get(key);
  }

  delete(key: any) {
    const index = this._hash(key);
    let currentNode = this.#data[index];
    let prevNode: ListNode<any> | undefined;

    if (!currentNode) return false;

    while (currentNode) {
      if (currentNode.key === key) {
        if (prevNode) {
          prevNode.next = currentNode.next;
        } else {
          this.#data[index] = currentNode.next;
        }
        return currentNode.value;
      }

      prevNode = currentNode;
      currentNode = currentNode.next;
    }

    return false;
  }

  get data() {
    return this.#data;
  }
}

// Задаем ёмкость внутреннего буфера
const map = new HashMap(10);

// map.set("bf", 1);
// map.set("fb", 2);
map.set({ hello: 1 }, 3);
// map.set("11", 3);
console.log(map.get({ hello: 1 }));
// console.log(map.data);
// map.set(42, 10);
// map.set(document, 100);

// console.log(map.get(42)); // 10
// console.log(map.has(document)); // true
// console.log(map.delete("bf")); // 100
// console.log(map.has(document)); // false
