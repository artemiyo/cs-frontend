class Matrix {
  private xSize: number;
  private ySize: number;
  private buffer: number[];
  constructor({ xSize, ySize }) {
    this.xSize = xSize;
    this.ySize = ySize;
    this.buffer = new Array(xSize * ySize).fill(0);
  }

  *[Symbol.iterator]() {
    for (let y = 0; y < this.ySize; y++) {
      for (let x = 0; x < this.xSize; x++) {
        yield [{ x, y }, this.get({ x, y })];
      }
    }
  }

  get(coordinates: { x: number; y: number }) {
    return this.buffer[this.#getIndex(coordinates)];
  }

  set(coordinates: { x: number; y: number }, value: any) {
    this.buffer[this.#getIndex(coordinates)] = value;
  }

  clone() {
    const newMatrix = new Matrix({ xSize: this.xSize, ySize: this.ySize });
    newMatrix.buffer = this.buffer.slice();
    return newMatrix;
  }

  visualize() {
    this.process.stdout.write("  | ");
    for (let x = 0; x < this.xSize; x++) {
      process.stdout.write(String.fromCharCode("a".charCodeAt(0) + x));
      process.stdout.write(" | ");
    }

    console.log("");

    for (let y = 0; y < this.ySize; y++) {
      process.stdout.write(String.fromCharCode("a".charCodeAt(0) + y));

      process.stdout.write(" | ");
      for (let x = 0; x < this.xSize; x++) {
        process.stdout.write(String(this.get({ x, y })));
        process.stdout.write(" | ");
      }
      console.log("");
    }
  }

  #getIndex({ x, y }: { x: number; y: number }) {
    return y * this.xSize + x;
  }
}

class GraphByMatrix {
  size: number;
  matrix: Matrix;
  constructor(size) {
    this.size = size;
    this.matrix = new Matrix({ xSize: size, ySize: size });
  }

  rel(from: string, to: string) {
    this.matrix.set(
      {
        y: this.#getPos(from),
        x: this.#getPos(to),
      },
      1
    );
  }

  hasRel(from: string, to: string) {
    return (
      this.matrix.get({
        y: this.#getPos(from),
        x: this.#getPos(to),
      }) === 1
    );
  }

  visualize() {
    this.matrix.visualize();
  }

  createTransitiveClosure() {
    const newGraph: GraphByMatrix = new GraphByMatrix(this.size);
    newGraph.matrix = this.matrix.clone();

    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        if (this.matrix.get({ x, y }) === 1) {
          for (let z = 0; z < this.size; z++) {
            if (this.matrix.get({ x: y, y: z }) === 1) {
              newGraph.matrix.set({ x, y: z }, 1);
            }
          }
        }
      }
    }

    return newGraph;
  }

  #getPos(label: string) {
    return label.charCodeAt(0) - "a".charCodeAt(0);
  }
}

const g = new GraphByMatrix(5);

g.rel("a", "b");
g.rel("a", "c");
g.rel("c", "e");

g.createTransitiveClosure();
