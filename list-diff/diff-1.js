var diff = function(oldList, newList) {
    var changes = [];
    // 镜像，模拟位置
    var _oldList = oldList.slice();
    oldList.forEach(function(item, i) {
        if (newList.indexOf(item) === -1) {
            changes.push({
                type: 'remove',
                index: i
            });
            _oldList.splice(i, 1);
        }
    });
    newList.forEach(function(item, i) {
        var index = _oldList.indexOf(item);
        if (index === -1) {
            changes.push({
                type: 'insert',
                index: i,
                item: item
            });
            _oldList.splice(i, 0, item);
        }
        else {
            if (index !== i) {
                var step = {
                    type: 'move',
                    from: index,
                    to: i
                };
                changes.push(step);
                move(_oldList, step.from, step.to);
            }
        }
    });
    return changes;
};
var move = function(list, from, to) {
    var item = list.splice(from, 1);
    if (from > to)
        list.splice(to, 0, item[0]);
    else
        list.splice(to - 1, 0, item[0]);
};