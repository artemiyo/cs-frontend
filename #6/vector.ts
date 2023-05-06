interface ITypedArrayConstructor<T> {
  new (length: number): T;
}

type TypedArray =
  | Uint8Array
  | Uint16Array
  | Uint32Array
  | Int8Array
  | Int16Array
  | Int32Array;

class Vector<T = TypedArray> {
  #arrayLength: number;
  #typedArray: TypedArray;
  #capacity: number;
  readonly #typedArrayConstructor: ITypedArrayConstructor<TypedArray>;

  constructor(
    readonly TypedArrayConstructor: ITypedArrayConstructor<TypedArray>,
    readonly size: { capacity: number }
  ) {
    this.#arrayLength = 0;
    this.#typedArray = new TypedArrayConstructor(size.capacity);
    this.#capacity = size.capacity;
    this.#typedArrayConstructor = TypedArrayConstructor;
  }

  emptyError() {
    if (this.#arrayLength === 0) {
      throw new Error("There's no elements in array!");
    }
  }

  #extendArray(values: number[]) {
    if (this.#arrayLength + values.length <= this.#capacity) return;
    this.#capacity *= 2;
    const extendedArray = new this.#typedArrayConstructor(this.#capacity);

    for (let i = 0; i < this.#arrayLength; i++) {
      extendedArray[i] = this.#typedArray[i];
    }

    this.#typedArray = extendedArray;
  }

  push(...values: number[]) {
    this.#extendArray(values);

    for (let value of values) {
      this.#typedArray[this.#arrayLength++] = value;
    }

    return this.#arrayLength;
  }

  pop() {
    this.emptyError();

    return this.#typedArray[--this.#arrayLength];
  }

  shift() {
    this.emptyError();

    let temp = this.#typedArray[0];
    for (let i = 0; i < this.#arrayLength; i++) {
      this.#typedArray[i] = this.#typedArray[i + 1];
    }
    this.#arrayLength--;
    return temp;
  }

  unshift(...values: number[]) {
    this.#extendArray(values);
    for (let i = this.#arrayLength; i >= 0; i--) {
      this.#typedArray[i + values.length] = this.#typedArray[i];
    }

    for (let j = 0; j < values.length; j++) {
      this.#typedArray[j] = values[j];
    }

    return ++this.#arrayLength;
  }

  get length() {
    return this.#arrayLength;
  }
}

const uint8Vector = new Vector(Uint8Array, { capacity: 100 });

uint8Vector.push(100); // 1
uint8Vector.push(20, 10); // 3

console.log(uint8Vector.pop()); // 10
console.log(uint8Vector.shift()); // 100

uint8Vector.unshift(1); // 2
console.log(uint8Vector.length); // 2
