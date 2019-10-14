function Delegator(proto, target) {
  if (!(this instanceof Delegator)) return new Delegator(proto, target);
  this.proto = proto;
  this.target = target;
}
Delegator.prototype.method = function(name){
  var proto = this.proto;
  var target = this.target;
  proto[name] = function(){
    console.log(this);
    return this[target][name].apply(this[target], arguments);
  };
  return this;
};
Delegator.prototype.getter = function(name) {
  var target = this.target;
  Object.defineProperty(this.proto, name, {
    get: function() {
      return this[target][name];
    },
    configurable:true
  });
  return this;
};
Delegator.prototype.setter = function(name) {
  var target = this.target;
  Object.defineProperty(this.proto, name, {
    set: function(val){
      return (this[target][name] = val);
    },
    configurable:true
  });
  return this;
};
Delegator.prototype.access = function(name) {
  return this.getter(name).setter(name);
};

class A {
  name = "123";
  fly() {
    console.log("fly !!!");
  }
}
class B {}
parent={}
a=new A()
b=new B()

Delegator(b, 'a').method('fly').access("name");
b.a=a;
b.fly()
console.log(b.name);
module.exports = Delegator;
