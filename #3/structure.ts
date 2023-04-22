type SchemaItemType = "utf16" | "u16";
type SchemaItem = [string, SchemaItemType, number?];
type StructureSchema = SchemaItem[];

class Structure {
  schema: StructureSchema;
  dataView: DataView;
  bytesPerElement: number;

  constructor(schema: StructureSchema) {
    this.bytesPerElement = Uint16Array.BYTES_PER_ELEMENT;
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

    return sum * this.bytesPerElement;
  }

  private currentItem(key: string) {
    let byteOffset = 0;
    let element: SchemaItem;

    for (let i = 1; i < this.schema.length; i++) {
      const schemaItem = this.schema[i];
      const prevSchemaItem = this.schema[i - 1];
      byteOffset += (prevSchemaItem[2] ?? 1) * this.bytesPerElement;

      if (schemaItem[0] === key) {
        element = schemaItem;
        break;
      }
    }

    if (!element) {
      throw new Error("There is no such key in the schema");
    }

    return { byteOffset, element };
  }

  get(key) {
    const {
      byteOffset,
      element: [_, type, symbolCount],
    } = this.currentItem(key);

    if (type === "utf16") {
      let result = "";

      for (
        let i = byteOffset;
        i < byteOffset + symbolCount * this.bytesPerElement;
        i += 2
      ) {
        result += String.fromCharCode(this.dataView.getUint16(i));
      }

      return result;
    }

    if (type === "u16") {
      return this.dataView.getUint16(byteOffset);
    }
  }

  set(key: string, value: number | string) {
    const {
      byteOffset,
      element: [_, type, symbolCount],
    } = this.currentItem(key);

    if (type === "u16" && typeof value === "number") {
      this.dataView.setUint16(byteOffset, value);
    }

    if (type === "utf16" && typeof value === "string") {
      if (value.length > symbolCount) {
        throw new Error(
          `Value length ${value.length} greater than the max symbol count - ${symbolCount}`
        );
      }

      for (let i = 0; i < value.length; i++) {
        this.dataView.setUint16(
          byteOffset + i * this.bytesPerElement,
          value.charCodeAt(i)
        );
      }
    }
  }
}

const jackBlack = new Structure([
  ["name", "utf16", 10], // Число - это максимальное количество символов
  ["lastName", "utf16", 10],
  ["fullName", "utf16", 20],
  ["age", "u16"], // uint16
]);

// jackBlack.set("age", 42);
jackBlack.set("lastName", "Black");
jackBlack.set("age", 55);
//
console.log(jackBlack.get("lastName")); // 'Black'
