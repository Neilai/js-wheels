let array = [1, [1, 2, 3], [1, [2, {}]]];
function flatern(arr) {
  let res = [];
  arr.map(v => {
    if (Array.isArray(v)) {
      res=res.concat(flatern(v));
    } else res.push(v);
  });
  return res;
}
console.log(flatern(array));

// const handle = array =>
//   array.reduce(
//     (accumulator, currentValue) =>
//       accumulator.concat(
//         Array.isArray(currentValue) ? handle(currentValue) : currentValue
//       ),
//     []
//   );
// handle(array); // [ 1, 1, 2, 3, 1, 2, {} ]
