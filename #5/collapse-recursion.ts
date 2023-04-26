const obj = {
  a: {
    b: [1, 2],
    "": { c: 2 },
  },
};

function collapse(obj: Record<any, any>) {}

/* {'a.b.0': 1, 'a.b.1': 2, 'a..c': 2} */
console.log(collapse(obj));
