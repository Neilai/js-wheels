function curry(fn, ...args) {
  var length = fn.length;
  return function(...newArgs) {
    args = args.concat(newArgs);
    if (args.length < length) {
      return curry.apply(this, fn, args);
    } else {
      return fn.apply(this, newArgs);
    }
  };
}

function multiFn(a, b, c) {
  return a * b * c;
}

var multi = curry(multiFn);

// multi(2)(3)(4);
console.log(multi(2, 3, 4));
// multi(2)(3,4);
// multi(2,3)(4);
