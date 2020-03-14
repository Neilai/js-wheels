// function sort(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     let minIndex = i;
//     for (let j = i + 1; j < arr.length; j++) {
//       if (arr[j] < arr[i]) minIndex = j;
//     }
//     [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
//     console.log("min", minIndex);
//   }
// }
// arr = [5, 4, 3, 2, 10, 22];
// sort(arr);
// console.log(arr);
function test(val){
  this.val=val;
}
function Singleton(xxx) {
  var ins;
  return function(...args) {
    if (ins) return ins;
    else return ins=new xxx(...args);
  };
}
x=Singleton(test)
console.log(new x("a"));
console.log(new x("b"));
