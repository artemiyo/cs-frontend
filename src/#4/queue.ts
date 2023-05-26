import { DoublyLinkedList } from "../#3/doubly-linked-list";

class Queue {
  linkedList: DoublyLinkedList;
  constructor() {
    this.linkedList = new DoublyLinkedList();
  }

  get head() {
    return this.linkedList.head?.val;
  }

  push(value: number) {
    this.linkedList.add(value);
  }

  pop() {
    const poppedNode = this.linkedList.shift();

    if (!poppedNode) {
      throw new Error("There is no elements in queue!");
    }

    return poppedNode.val;
  }
}

const queue = new Queue();

queue.push(10);
queue.push(11);
queue.push(12);

console.log(queue);

console.log(queue.head); // 10
console.log(queue.pop()); // 10
console.log(queue.head); // 11
console.log(queue.pop()); // 11
console.log(queue.pop()); // 12
console.log(queue.pop()); // Exception
