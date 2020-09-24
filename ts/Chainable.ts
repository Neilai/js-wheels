type Chainable<T = {}> = {
  option<S extends string | number | symbol, U>(
    key: S,
    value: U
  ): Chainable<T & { [k in S]: U }>;
  get(): T;
};
