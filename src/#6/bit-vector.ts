class BitVector {
  #buffer: Uint8Array;
  #length: number;
  #capacity;

  constructor(capacity = 8) {
    this.#capacity = capacity;
    this.#buffer = new Uint8Array(Math.ceil(capacity / 8));
  }

  getBuffer() {
    return this.#buffer;
  }

  get(index) {
    const pos = Math.floor(index / 8);

    if (pos >= this.#buffer.length) {
      return undefined;
    }

    return (this.#buffer[pos] & (1 << index % 8)) > 0 ? 1 : 0;
  }

  set(index, value) {
    const pos = Math.floor(index / 8);
    const normalizedValue = 1 << index % 8;

    if (pos >= this.#capacity) {
      throw new ReferenceError("Invalid index");
    }

    if (value === 1) {
      this.#buffer[pos] |= normalizedValue;
    } else {
      this.#buffer[pos] &= ~normalizedValue;
    }
  }

  push(value) {
    if (this.#length >= this.#capacity) {
      this.#grow();
    }

    this.set(this.#length, value);
    this.#length++;
  }

  #grow() {
    this.#capacity *= 2;
    const originalBuffer = this.#buffer;
    const newBuffer = new Uint8Array(Math.ceil(this.#capacity / 8));

    newBuffer.set(originalBuffer, 0);

    this.#buffer = newBuffer;
  }
}

const bitVector = new BitVector(4);
bitVector.push(1);
bitVector.push(0);
bitVector.push(1);
bitVector.push(1);

bitVector.push(0);
bitVector.push(1);
bitVector.push(1);
bitVector.push(1);
console.log(bitVector.getBuffer());

bitVector.push(0);
bitVector.push(1);

console.log(bitVector.get(8));
console.log(bitVector.get(9));
console.log(bitVector.getBuffer());
