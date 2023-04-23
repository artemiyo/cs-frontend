class ListNode {
  next: ListNode | null;
  prev: ListNode | null;

  constructor(readonly val: any) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

export class DoublyLinkedList implements Iterable<any> {
  head: ListNode | null;
  tail: ListNode | null;
  length: number;
  current: ListNode | null;
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  add(value: any) {
    const newNode = new ListNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
  }

  pop() {
    if (!this.head) return undefined;
    let poppedNode = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = poppedNode!.prev;
      this.tail!.next = null;
      poppedNode!.prev = null;
    }
    this.length--;
    return poppedNode;
  }

  shift() {
    if (this.length === 0) return undefined;
    let oldHead = this.head;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = oldHead!.next;
      this.head!.prev = null;
      oldHead!.next = null;
    }
    this.length--;
  }

  unshift(val: any) {
    let newNode = new ListNode(val);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head!.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
  }

  // or use function generators
  [Symbol.iterator](): Iterator<any> {
    this.current = this.head;
    return this;
  }


  next(): IteratorResult<any> {
    if (this.current && this.current.val) {
      let result = { done: false, value: this.current.val };
      this.current = this.current.next;
      return result;
    } else {
      return { done: true, value: null };
    }
  }
}

const linkedList = new DoublyLinkedList();
linkedList.add(1);
linkedList.add(2);
linkedList.add(3);
linkedList.add(4);
linkedList.add(5);
linkedList.pop();
linkedList.unshift("world");
linkedList.unshift("hello");

for (let nodeValue of linkedList) {
  console.log(nodeValue);
}
