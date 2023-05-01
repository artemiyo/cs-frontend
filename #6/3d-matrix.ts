type Coordinates = { x: number; y: number; z: number };

class Matrix3D {
  readonly #x: number;
  readonly #y: number;
  readonly #z: number;
  readonly array: Uint32Array;
  constructor(config: Coordinates) {
    this.#x = config.x;
    this.#y = config.y;
    this.#z = config.z;
    this.array = new Uint32Array(config.x * config.y * config.z);
  }

  set(coordinates: Coordinates, value: any) {
    return (this.array[this.#getIndex(coordinates)] = value);
  }

  get(coordinates: Coordinates) {
    return this.array[this.#getIndex(coordinates)];
  }

  #getIndex({ x, y, z }: Coordinates) {
    return z * this.#x * this.#y + y * this.#x + x;
  }
}

const matrix3D = new Matrix3D({ x: 10, y: 10, z: 10 });

matrix3D.set({ x: 1, y: 3, z: 2 }, 10);
matrix3D.get({ x: 1, y: 3, z: 2 }); // 10
