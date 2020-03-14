// function run(fn) {
//   var gen = fn();

//   function next(err, data) {
//     var result = gen.next(data);
//     if (result.done) return;
//     result.value(next);
//   }

//   next();
// }

// function* g() {
//   // ...
// }

// run(g);