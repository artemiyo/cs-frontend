import {
  getByteSize,
  getOffsets,
  normalizeSchema,
  createMask,
} from "./helpers";
import { Data, Schema } from "./types";

const encode = (data: Data, schema: Schema) => {
  const normalizedSchema = normalizeSchema(schema);
  const byteSize = getByteSize(normalizedSchema);
  const offsets = getOffsets(normalizedSchema);
  const array = new globalThis[`Uint${byteSize}Array`](
    offsets.at(-1)?.index + 1
  );

  function* dataIterator() {
    for (const item of data) {
      if (typeof item === "string") {
        yield* item;
      } else {
        yield item;
      }
    }
  }

  const iter = dataIterator();
  offsets.forEach(({ size, offset, index, type }) => {
    const { done, value } = iter.next();
    if (done) {
      throw new Error(
        `Data doesn't match scheme at ${index} byte, ${offset} offset!`
      );
    }
    const bytes = type === "ascii" ? (value as string).charCodeAt(0) : value;
    array[index] |= (+bytes & createMask(size)) << offset;
  });

  return array.buffer;
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
