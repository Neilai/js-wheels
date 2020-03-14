var compose = function(...args) {
  var len = args.length;
  var count = len - 1;
  var result;
  return function f1(...args1) {
    result = args[count].apply(this, args1);
    if (count <= 0) {
      count = len - 1;
      return result;
    } else {
      count--;
      return f1.call(null, result);
    }
  };
};

function compose(...fns) {
  if (fns.length === 0) {
    return args => args;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return fns.reduce((ret, item) => (...args) => {
    return ret(item(...args));
  });
}
