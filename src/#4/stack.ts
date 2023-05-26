class TypedArrayStack {
  array: Int32Array;
  length: number;

  constructor(ArrayConstructor: Int32ArrayConstructor, readonly size: number) {
    this.array = new ArrayConstructor(size);
    this.length = 0;
  }

  get head() {
    return this.array[this.length - 1];
  }

  push(value: number) {
    if (this.length > this.size) {
      throw new Error("Exception");
    }
    this.array[this.length++] = value;
  }

  pop() {
    if (!this.length) {
      throw new Error("The stack is empty!");
    }
    return this.array[--this.length];
  }
}

const stack = new TypedArrayStack(Int32Array, 10);

stack.push(10);
stack.push(11);
stack.push(12);

console.log(stack.head); // 12

console.log(stack.pop()); // 12

console.log(stack.head); // 11

console.log(stack.pop()); // 11
console.log(stack.pop()); // 10
console.log(stack.pop()); // Exception
