type State = "pending" | "fulfilled" | "rejected";
type Initializer = (resolve?: Function, reject?: Function) => void;

class SyncPromise<T> {
  protected onFulfilled: Function[] = [];
  protected onRejected: Function[] = [];
  protected state: State = "pending";
  protected value: T | Error;

  static resolve<T>(value: T | SyncPromise<T>) {
    if (value instanceof SyncPromise) {
      return value;
    }

    return new SyncPromise((resolve) => {
      resolve?.(value);
    });
  }

  static reject(value) {
    return new SyncPromise((_, reject) => {
      reject?.(value);
    });
  }

  static all<T>(iterable: Iterable<T>) {
    return new SyncPromise<T>((resolve, reject) => {
      const promises = [...iterable].map(SyncPromise.resolve);
      const res = new Array(promises.length);
      let pending = promises.length;

      promises.forEach((promise, i) => {
        promise.then(
          (value) => {
            res[i] = value;
            pending--;

            if (pending === 0) {
              resolve?.(res);
            }
          },
          (err) => {
            reject?.(err);
          }
        );
      });
    });
  }

  static allSettled<T>(iterable: Iterable<T>) {
    return new SyncPromise<T>((resolve, reject) => {
      const promises = [...iterable].map(SyncPromise.resolve);
      const res: { status: State; value?: T; reason?: T }[] = new Array(
        promises.length
      );
      let pending = promises.length;

      promises.forEach((promise, i) => {
        promise.then(
          (value) => {
            res[i] = { status: "fulfilled", value };
            pending--;

            if (pending === 0) {
              resolve?.(res);
            }
          },
          (reason) => {
            res[i] = { status: "rejected", reason };
            pending--;

            if (pending === 0) {
              resolve?.(res);
            }
          }
        );
      });
    });
  }

  static race<T>(iterable: Iterable<T>) {
    return new SyncPromise((res, rej) => {
      for (const value of iterable) {
        SyncPromise.resolve(value).then(res, rej);
      }
    });
  }

  constructor(initializer: Initializer) {
    const reject = (err: Error) => {
      if (this.value != null || this.state !== "pending") {
        return;
      }

      this.value = err;
      this.state = "rejected";

      this.onRejected.forEach((handler) => {
        handler(err);
      });
    };

    const resolve = (value: T) => {
      if (this.value != null || this.state !== "pending") {
        return;
      }

      this.value = value;

      const fulfill = (value) => {
        this.state = "fulfilled";
        this.value = value;

        this.onFulfilled.forEach((handler) => {
          handler(this.value);
        });

        if (typeof value?.then === "function") {
          value.then(fulfill, reject);
          return;
        } else {
          fulfill(value);
        }
      };

      try {
        initializer(resolve, reject);
      } catch (err: any) {
        reject(err);
      }
    };
  }

  then(onFulfilled, onRejected) {
    return new SyncPromise((resolve, reject) => {
      const fulfillWrapper = (value) => {
        this.call(onFulfilled ?? resolve, [value], reject, resolve);
      };
      const rejectWrapper = (err) => {
        this.call(onRejected ?? reject, [err], reject, resolve);
      };
      this.onFulfilled.push(fulfillWrapper);

      if (this.state !== "pending") {
        if (this.state === "fulfilled") {
          fulfillWrapper(this.value);
        } else {
          rejectWrapper(this.value);
        }
      }
    });
  }

  catch(onRejected) {
    return new SyncPromise((resolve, reject) => {
      const rejectWrapper = (err) => {
        this.call(onRejected ?? reject, [err], reject, resolve);
      };

      this.onRejected.push(rejectWrapper);

      if (this.state !== "pending") {
        if (this.state === "fulfilled") {
          resolve?.(this.value);
        } else {
          rejectWrapper(this.value);
        }
      }
    });
  }

  protected call(fn, args, onReject, onFulfilled) {
    const reject = onReject ?? loopback;
    const resolve = onFulfilled ?? loopback;

    try {
      const res = fn?.(...args);

      if (typeof res?.then === "function") {
        res.then(resolve, reject);
      } else {
        resolve(res);
      }
    } catch (err) {
      reject(err);
    }

    function loopback(): void {
      return undefined;
    }
  }
}
