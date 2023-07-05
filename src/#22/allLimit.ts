function allLimit<T>(iterable: Iterable<() => Promise<T>>, limit: number) {
  return new Promise((resolve, reject) => {
    const promises = [...iterable];
    const res = new Array(promises.length);
    const iter = promises.entries();

    let pending = promises.length;

    for (let i = 0; i < limit; i++) {
      next();
    }

    function next() {
      const chunk = iter.next();
      if (!chunk.done) {
        const [i, fn] = chunk.value;

        fn().then((value) => {
          res[i] = value;

          pending--;

          if (pending === 0) {
            resolve(res);
          }
          next();
        }, reject);
      }
    }
  });
}

function f1() {
  return Promise.resolve(1);
}

function f2() {
  return Promise.resolve(2);
}

function f3() {
  return Promise.resolve(3);
}

function f4() {
  return Promise.resolve(4);
}

function f5() {
  return Promise.resolve(5);
}

allLimit([f1, f2, f3, f4, f5], 2).then(console.log).catch(console.error);
