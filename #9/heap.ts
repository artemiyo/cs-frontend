type ComparatorFn<T> = (a: T, b: T) => number;

class BinaryHeap<T> {
  buffer: (T | null)[];
  comparator: ComparatorFn<T>;
  lastIndex = -1;

  constructor(comparator: ComparatorFn<T>, buffer: T[] = []) {
    this.buffer = buffer;
    this.comparator = comparator;
  }

  get head(): T | null {
    return this.buffer[0] ?? null;
  }

  get length() {
    return this.lastIndex + 1;
  }

  push(...values: T[]): number {
    for (const value of values) {
      this.lastIndex++;
      this.buffer[this.lastIndex] = value;
      this.fromBottom();
    }

    return this.length;
  }

  pop(): T | null {
    const { head } = this;

    if (this.lastIndex >= 0) {
      this.buffer[0] = this.buffer[this.lastIndex];
      this.buffer[this.lastIndex] = null;
      this.lastIndex--;
      this.toBottom();
    }

    return head;
  }

  getParentIndex(index: number) {
    return Math.floor((index - 1) / 2);
  }

  getLeftChildIndex(index: number) {
    return 2 * index + 1;
  }

  getRightChildIndex(index: number) {
    return 2 * index + 2;
  }

  toBottom(cursor = 0) {
    if (this.length <= 1) {
      return;
    }

    let leftChildCursor = this.getLeftChildIndex(cursor);
    let rightChildCursor = this.getRightChildIndex(cursor);

    const value = this.buffer[cursor];

    while (leftChildCursor <= this.lastIndex) {
      let childIndex;

      if (rightChildCursor > this.lastIndex) {
        childIndex = leftChildCursor;
      } else {
        childIndex =
          this.comparator(
            this.buffer[leftChildCursor],
            this.buffer[rightChildCursor]
          ) > 0
            ? leftChildCursor
            : rightChildCursor;
      }

      const child = this.buffer[childIndex];
      if (this.comparator(value, child) >= 0) {
        break;
      }

      this.buffer[cursor] = child;
      cursor = childIndex;

      leftChildCursor = this.getLeftChildIndex(cursor);
      rightChildCursor = this.getRightChildIndex(cursor);
    }

    this.buffer[cursor] = value;
  }

  fromBottom(cursor = this.lastIndex) {
    const value = this.buffer[cursor];

    while (cursor > 0) {
      const parentIndex = this.getParentIndex(cursor);
      const parent = this.buffer[parentIndex];

      if (this.comparator(value, parent) <= 0) {
        break;
      }

      this.buffer[cursor] = parent;
      cursor = parentIndex;
    }

    this.buffer[cursor] = value;
  }
}

function heapSort<T>(arr: T[], comparator: ComparatorFn<T>): T[] {
  const heap = new BinaryHeap(comparator, arr);

  for (let i = Math.floor(arr.length / 2); i--; ) {
    heap.toBottom(i);
  }

  for (let i = 0; i < arr.length; i++) {
    arr[arr.length - 1 - i] = heap.pop();
  }

  return arr;
}

console.log(heapSort([10, 1, -43, 11, 23, 6, 3], (a, b) => b - a));
