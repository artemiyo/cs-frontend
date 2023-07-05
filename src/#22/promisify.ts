type PromisifyResult = (...args: any[]) => Promise<any>;

function promisify(fn: Function): PromisifyResult {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err: Error | null, result: string) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback);
      // @ts-ignore
      fn.call(this, ...args);
    });
  };
}

function readFile(file: File, cb: (err: Error | null, result: string) => void) {
  cb(null, "fileContent");
}

const readFilePromise = promisify(readFile);
readFilePromise('my-file.txt').then(console.log).catch(console.error);
