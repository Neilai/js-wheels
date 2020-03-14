var items = [5,3,7,6,2,9];
function swap(items, leftIndex, rightIndex){
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}
function partition(items, left, right) {
    var pivot   = items[Math.floor((right + left) / 2)], //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(items, left, right) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort(items, index, right);
        }
    }
    return items;
}
// first call to quick sort
var sortedArray = quickSort(items, 0, items.length - 1);
console.log(sortedArray); //prints [2,3,5,6,7,9]


// function qSort3(arr) {       //三路快排
//     if(arr.length == 0) {
//         return [];
//     }
//     var left = [];
//     var center = [];
//     var right = [];
//     var pivot = arr[0];    //偷懒，直接取第一个,实际取值情况 参考[快速排序算法的优化思路总结]
//     for(var i = 0; i < arr.length; i++) {      
//         if(arr[i] < pivot) {
//             left.push(arr[i]);
//         } else if(arr[i] == pivot) {
//             center.push(arr[i]);
//         } else {
//             right.push(arr[i]);
//         }
//     }
//     return [...qSort3(left), ...center, ...qSort3(right)];
// }
