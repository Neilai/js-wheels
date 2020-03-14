function sort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let j = i;
    for (; j > 0; j--) {
      if (arr[j - 1] < current) arr[j] = arr[j - 1];
      else break;
    }
    arr[j] = current;
  }
  return arr;
}
console.log(sort([1, 2, 3, 4, 5, 6, 11, 10]));
