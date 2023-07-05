curry._ = {};

// function curry(fn) {
//   return function curried(this: unknown, ...args) {
//     const filteredArgs = args.filter((el) => el != curry._);
//     if (filteredArgs.length === fn.length) {
//       return fn.call(this, args);
//     }
//
//     return function (this: unknown, ...args2) {
//       let normalizedArgs = args.slice();
//
//       normalizedArgs.forEach((el, i, args) => {
//         while (el === curry._) {
//           el = args2.shift();
//           args[i] = el;
//         }
//       });
//
//       return curried.apply(this, normalizedArgs.concat(args2));
//     };
//   };
// }

function curry(fn: Function) {
  function curried(this: unknown, ...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args.slice(0, fn.length));
    }

    return function (this: unknown, ...args2) {
      return curried.apply(this, args.concat(args2));
    };
  }

  Object.defineProperty(curried, "length", { value: fn.length });
  return curried;
}

function sum(a, b, c, d) {
  return a + b + c + d;
}

console.log(curry(sum)(1)(2, 3, 4)(5));
