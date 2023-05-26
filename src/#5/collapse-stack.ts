import { Stack } from "../common";

const objParam: Record<string, any> = {
  a: {
    b: [1, 2],
    "": { c: 2 },
  },
};

const collapseByStack = <T = Record<string, any>>(obj: T) => {
  const stack = new Stack<T>(obj);
  const result = {};

  while (stack.length) {
    const [stackItem, key] = stack.pop();

    if (typeof stackItem !== "object") {
      result[key] = stackItem;
    }

    const keys = Object.keys(stackItem);

    for (let i = keys.length - 1; i >= 0; i--) {
      const keyItem = keys[i];
      const fullKey = key !== undefined ? `${key}.${keyItem}` : keyItem;
      stack.push([stackItem[keyItem], fullKey]);
    }
  }

  return result;
};

console.log(collapseByStack(objParam)); // {'a.b.0': 1, 'a.b.1': 2, 'a..c': 2}
