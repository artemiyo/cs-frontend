export enum ResultState {
  Ok,
  Error,
}

export class Result<T> {
  data: T | null;
  state: ResultState;
  #err;
  constructor(fn: () => T | Result<T>) {
    const data = fn();
    try {
      if (data instanceof Result) {
        data
          .then((value) => {
            this.state = ResultState.Ok;
            this.data = value;
          })
          .catch((err) => {
            this.state = ResultState.Error;
            this.#err = err;
          });
      } else {
        this.state = ResultState.Ok;
        this.data = data;
      }
    } catch (err) {
      this.state = ResultState.Error;
      this.#err = err;
    }
  }

  static Error(value: any) {
    return new Result(() => {
      throw value;
    });
  }

  then<R>(cb: (data: T) => R | Result<R>) {
    if (this.state === ResultState.Ok) {
      return new Result(() => cb(this.data!));
    }

    return this;
  }

  catch(cb: (err: T) => T | Result<T>) {
    if (this.state === ResultState.Error) {
      return new Result(() => cb(this.#err));
    }

    return this;
  }

  map(cb: (value: T) => T): Result<T> {
    return new Result<T>(() => cb(this.data!));
  }
}

const res1 = new Result(() => 42);

res1.then((data) => {
  console.log(data);
});

res1.map((value) => value * 10).then(console.log); //420

const res2 = new Result(() => {
  throw "Boom!";
});

res2
  .then((data) => {
    // Этот callback не вызовется
    console.log(data);

    // А этот вызовется
  })
  .catch(console.error);
