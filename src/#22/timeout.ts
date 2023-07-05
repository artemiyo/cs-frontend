// function timeout(promise: Promise<any>, ms: number): Promise<any> {
//   return new Promise((res, rej) => {
//     setTimeout(async () => {
//       try {
//         const p = await promise;
//         const data = await p.json();
//         res(data);
//       } catch (err) {
//         rej(err);
//       }
//     }, ms);
//   });
// }

function timeout<T>(promise: Promise<T>, ms: number) {
  return Promise.race([
    promise,
    sleep(ms).then(() => Promise.reject("timeout")),
  ]);
}

timeout(fetch("//my-data"), 2000).then(console.log).catch(console.error);
