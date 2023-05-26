import { DoublyLinkedList } from "../#3/doubly-linked-list";

class Queue {
  linkedList: DoublyLinkedList;
  constructor() {
    this.linkedList = new DoublyLinkedList();
  }

  push(value: number) {
    this.linkedList.add(value);
  }

  shift() {
    return this.linkedList.shift();
  }

  unshift(value: number) {
    this.linkedList.unshift(value);
  }

  pop() {
    return this.linkedList.pop();
  }
}

const dequeue = new Queue();

dequeue.push(10);
dequeue.unshift(11);
dequeue.push(12);

console.log(dequeue.pop()); // 12
console.log(dequeue.shift()); // 11
console.log(dequeue.pop()); // 10
console.log(dequeue.pop()); // Exception
