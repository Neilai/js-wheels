function curry(fn, ...args) {
  return function(...newArgs) {
    args = args.concat(newArgs);
    if (args.length < fn.length) {
      return curry.call(this, fn, ...args);
    } else {
      return fn.apply(this, args);
    }
  };
}

function curry(fn, arr = []) {
  return fn.length === arr.length
    ? fn.apply(null, arr)
    : function(...args) {
        return curry(fn, arr.concat(args));
      };
}

const curry = (fn, arr = []) =>
  fn.length === arr.length
    ? fn(...arr)
    : (...args) => curry(fn, [...arr, ...args]);

function multiFn(a, b, c) {
  return a * b * c;
}

var multi = curry(multiFn);
// console.log(multi(2)(3)(4));
// console.logmulti(2, 3,l 4));
// console.log(multi(2)(3, 4));
// console.log(multi(2, 3)(4));
