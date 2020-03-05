Function.prototype.call = function(context, ...args) {
  context = context || window;
  context.func = this;

  if (typeof context.func !== "function") {
    throw new TypeError("call must be called on a function");
  }

  let res = context.func(...args);
  delete context.func;
  return res;
};
