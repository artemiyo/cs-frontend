class Queue {
  queArray: number[];
  front: number;
  rear: number;
  nItems: number;
  constructor() {
    this.queArray = [];
    this.front = 0;
    this.rear = -1;
    this.nItems = 0;
  }

  push(value: number) {
    this.queArray[++this.rear] = value;
    this.nItems++;
  }

  shift() {
    if (this.nItems === 0) {
      throw new Error("Queue is empty!");
    }
    let temp = this.queArray[this.front];
    this.queArray = this.queArray.slice(1, this.nItems);
    this.rear--;
    this.nItems--;

    return temp;
  }

  unshift(value: number) {
    this.queArray = [value, ...this.queArray];
    this.nItems++;
    this.rear++;

    return this.queArray[this.front];
  }

  pop() {
    if (this.nItems === 0) {
      throw new Error("Queue is empty!");
    }

    let temp = this.queArray[this.rear];
    this.queArray = this.queArray.slice(0, this.rear);
    this.rear--;
    this.nItems--;
    return temp;
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
