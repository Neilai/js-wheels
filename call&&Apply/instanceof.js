function _instanceof(a, b) {
  while (a) {
    if (a.__proto__ === b.prototype) return true;
    a = a.__proto__;
  }
  return false;
}
