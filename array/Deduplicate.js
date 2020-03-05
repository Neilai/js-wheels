let array = [1, 2, 1, "3", "3", 0, 1];
handle(array); // [1, 2, '3', 0]
array.reduce((accumulator, v, i) => {
  !accumulator.includes(currentValue) && accumulator.push(currentValue);
  return accumulator;
}, []);
