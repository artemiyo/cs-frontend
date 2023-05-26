class Matrix3D {
  #buffer;
  #xSize;
  #ySize;
  #zSize;

  constructor({ xSize, ySize, zSize }) {
    this.#xSize = xSize;
    this.#ySize = ySize;
    this.#zSize = zSize;
    this.#buffer = new Array(xSize * ySize * zSize);
  }

  getBuffer() {
    return this.#buffer;
  }

  #getIndex({ x, y, z }) {
    return (z * this.#ySize + y) * this.#xSize + x;
  }

  get({ x, y, z }) {
    return this.#buffer[this.#getIndex({ x, y, z })];
  }

  set({ x, y, z }, value) {
    this.#buffer[this.#getIndex({ x, y, z })] = value;
  }
}

const m = new Matrix3D({ xSize: 2, ySize: 3, zSize: 4 });
m.set({ x: 0, y: 0, z: 0 }, 1);
m.set({ x: 1, y: 0, z: 0 }, 2);
m.set({ x: 0, y: 1, z: 0 }, 3);
m.set({ x: 1, y: 1, z: 0 }, 4);
m.set({ x: 0, y: 2, z: 0 }, 5);
m.set({ x: 1, y: 2, z: 0 }, 6);

m.set({ x: 0, y: 0, z: 1 }, 7);
m.set({ x: 1, y: 0, z: 1 }, 8);
m.set({ x: 0, y: 1, z: 1 }, 9);
m.set({ x: 1, y: 1, z: 1 }, 10);
m.set({ x: 0, y: 2, z: 1 }, 11);
m.set({ x: 1, y: 2, z: 1 }, 12);

m.set({ x: 0, y: 0, z: 2 }, 13);
m.set({ x: 1, y: 0, z: 2 }, 14);
m.set({ x: 0, y: 1, z: 2 }, 15);
m.set({ x: 1, y: 1, z: 2 }, 16);
m.set({ x: 0, y: 2, z: 2 }, 17);
m.set({ x: 1, y: 2, z: 2 }, 18);

m.set({ x: 0, y: 0, z: 3 }, 19);
m.set({ x: 1, y: 0, z: 3 }, 20);
m.set({ x: 0, y: 1, z: 3 }, 21);
m.set({ x: 1, y: 1, z: 3 }, 22);
m.set({ x: 0, y: 2, z: 3 }, 23);
m.set({ x: 1, y: 2, z: 3 }, 24);

console.log(m.getBuffer());
