// 1.把模拟位置的操作改用记录index change代替，先遍历新的，再遍历旧的
var diff = function(oldList, newList) {
  var changes = [];
  // 计算change对oldList未比较元素index的影响，是个区间
  // 因为移动我前面的元素到更前面，并不影响我的index
  // move时，只影响<=lastIndex的index
  // 用<=index: delta表示
  var maxLength = Math.max(oldList.length, newList.length);
  var oldIndexChanges = new Array(maxLength).fill(0);
  // 修正前的index
  var _index;

  // 遍历新的，找出 增/移
  newList.forEach(function(item, i) {
    var index = oldList.indexOf(item);
    if (index === -1) {
      // 增
      changes.push({
        type: "insert",
        index: i,
        item: item
      });
      // insert影响oldList中后面所有元素的index
      oldIndexChanges[maxLength - 1]++;
    } else {
      _index = index;
      // 修正old index
      // 从index数到头，求sum delta
      index += oldIndexChanges.reduce(function(acc, delta, idx) {
        if (idx >= index) return acc + delta;
        else return acc;
      });
      // 移
      if (index !== i) {
        var step = {
          type: "move",
          from: index,
          to: i
        };
        changes.push(step);
        if (index > i) {
          // move影响oldList中<=from的元素
          oldIndexChanges[_index]++;
        } else {
          // from 不可能小于 to
          // 因为是从前往后扫过来的，[0, to-1]位置确定，不会从前面取元素
          console.error("impossible");
        }
      }
    }
  });

  // 遍历旧的，找出 删
  // 计算总delta
  // 经过insert和move之后，将被删除的元素一定在最后面，受所有index change影响
  console.log(oldIndexChanges);
  var indexDelta = oldIndexChanges.reduce(function(acc, delta) {
    return acc + delta;
  });
  console.log(indexDelta);
  oldList.forEach(function(item, i) {
    if (newList.indexOf(item) === -1) {
      // 修正old index
      i += indexDelta;
      changes.push({
        type: "remove",
        index: i
      });
    }
  });

  return changes;
};

// 2.模拟patch
var showSteps = function(changes) {
  changes.forEach(function(change) {
    switch (change.type) {
      case "insert":
        console.log(
          "insert " + change.item + " before " + oldList[change.index]
        );
        oldList.splice(change.index, 0, change.item);
        break;
      case "remove":
        console.log("remove " + oldList[change.index]);
        oldList.splice(change.index, 1);
        break;
      case "check":
        console.log("check " + oldList[change.index] + " for update");
        break;
      case "move":
        console.log(
          "move " + oldList[change.from] + " to " + oldList[change.to]
        );
        move(oldList, change.from, change.to);
        break;
      default:
        cosole.error("not here");
        break;
    }
    console.log(oldList);
  });
};
var move = function(list, from, to) {
  var item = list.splice(from, 1);
  if (from > to) list.splice(to, 0, item[0]);
  else list.splice(to - 1, 0, item[0]);
};
var oldList = [1, 2, 3, 7, 4];
var newList = [1, 4, 5, 3, 7, 6];
showSteps(diff(oldList, newList));
