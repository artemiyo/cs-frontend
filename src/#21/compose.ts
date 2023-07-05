// function compose(...fns) {
//   return fns.reduceRight((res, el) => {
//     return function (this: unknown, value) {
//       el.call(this, res.call(this, value));
//     };
//   });
// }

function compose(...functions: ((value) => any)[]) {
  let result = null;
  return function (value) {
    for (const fn of functions) {
      result = fn(result ?? value);
    }

    return result;
  };
}

const f = compose(
  (a) => a ** 2,
  (a) => a * 10,
  (a) => Math.sqrt(a) // Первая
);

console.log(f(16)); // 1600
