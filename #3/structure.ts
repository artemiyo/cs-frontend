type SchemaItemType = "utf16" | "u16";
type SchemaItem = [string, SchemaItemType, number?];
type Schema = SchemaItem[];

class Structure {
  private readonly schema: Schema;
  private dataView: DataView;

  constructor(schema: Schema) {
    this.schema = schema;
    const buffer = new ArrayBuffer(this.length);
    this.dataView = new DataView(buffer);
  }

  private get length() {
    let sum = 0;

    for (let i = 0; i < this.schema.length; i++) {
      const [_, __, symbolCount] = this.schema[i];
      sum += symbolCount ?? 1;
    }

    return sum * Uint16Array.BYTES_PER_ELEMENT;
  }

  set(key: string, value: any) {

  }
}

const jackBlack = new Structure([
  ["name", "utf16", 10], // Число - это максимальное количество символов
  ["lastName", "utf16", 10],
  ["age", "u16"], // uint16
]);

jackBlack.set("name", "Jack");
// jackBlack.set("lastName", "Black");
// jackBlack.set("age", 53);
//
// console.log(jackBlack.get("name")); // 'Jack'
