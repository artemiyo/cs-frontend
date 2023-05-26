const obj2: any = {
  a: {
    b: [1, 2],
    "": { c: 2 },
  },
};

function collapse2(obj) {
  const res = {};

  const stack = [[Object.entries(obj).values(), ""]];

  while (stack.length > 0) {
    const [cursor, path] = stack.pop();

    for (const [key, value] of cursor) {
      const newPath = String(path !== "" ? `${path}.${key}` : key);
      if (value !== null && typeof value === "object") {
        stack.push([cursor, path]);
        stack.push([Object.entries(value).values(), newPath]);
        break;
      } else {
        res[newPath] = value;
      }
    }
  }

  return res;
}

console.log(collapse2(obj2));
