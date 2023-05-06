class Matrix2D {
  #rows: number;
  #cols: number;
  buffer: ArrayBuffer;
  constructor(rows: number, cols: number) {
    this.#rows = rows;
    this.#cols = cols;
    this.buffer = new ArrayBuffer(rows * cols);
  }

  set(row: number, col: number, value: any) {
    return (this.buffer[this.#getIndex(row, col)] = value);
  }

  get(row: number, col: number) {
    return this.buffer[this.#getIndex(row, col)];
  }

  #getIndex(row: number, col: number) {
    return row * this.#cols + col;
  }
}

const matrix = new Matrix2D(5, 5);
matrix.set(2, 2, "test");
matrix.get(2, 2); // test
