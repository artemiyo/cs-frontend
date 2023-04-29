const obj = {
  a: {
    b: [1, 2],
    "": { c: 2 },
  },
};

function collapse(obj: Record<string, any>) {
  let result = {};

  const traverse = (object: Record<string, any>, head = "") => {
    for (let prop in object) {
      if (object.hasOwnProperty(prop)) {
        let key = head ? `${head}.${prop}` : prop;
        const value = object[prop];
        if (value && typeof value === "object") {
          traverse(value, key);
        } else {
          result[key] = value;
        }
      } else {
        console.log("None");
      }
    }
  };

  traverse(obj);
  return result;
}
console.log(collapse(obj)); // {'a.b.0': 1, 'a.b.1': 2, 'a..c': 2}
