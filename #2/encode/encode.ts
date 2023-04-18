type Data = (string | number | boolean)[];
type Schema = Array<[number, "number" | "boolean" | "ascii"]>;

const encode = (data: Data, schema: Schema) => {

};

const schema: Schema = [
  [3, "number"], // 3 бита число
  [2, "number"], // 2 бита число
  [1, "boolean"], // 1 бит логический
  [1, "boolean"], // 1 бит логический
  [16, "ascii"], // 16 бит 2 аски символа
];

// Если данные не подходят схеме - выбрасывать исключения с пояснением.
// Результат - ArrayBuffer.
const data = encode([2, 3, true, false, "ab"], schema);
