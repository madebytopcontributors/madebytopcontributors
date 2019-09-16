// Author: Jacob Jan Tuinstra

/**
* Display the range, mapped as you would do in JavaScript. 
* @param {A1} range The range or array to be mapped
* @param {"cell + 2"} operation internal keys are; cell, row index = i, column index = j
* @param {2} iterator [optional] The number of times to iterate (only for single cells)
* return mapped range
* @customfunction
*/
function JS_MAP(range, operation, iterator) {
  range = range.map ? range : [[range]];
  if(iterator && typeof iterator === "number") {
    range = Array.apply(null, Array(iterator)).map(function (val) {
      return range[0];
    });
  }

  return range.map ( function (row, i) {
    return row.map ( function (cell, j) {
      return eval(!operation ? "cell" : operation); 
    })
  });
}

/**
* Display the range, sorted either ascendingly or descendingly. 
* @param {A:E} range The range or array to be sorted
* @param {true|false} sort_order [optional] omitted or true = ascendingly, false = descendingly
* return sorted range
* @customfunction
*/
function JS_SORT(range, sort_order) { 
  return arguments.length === 1 ? range.sort() : (sort_order.length === 0 || sort_order !== false ? range.sort() : range.sort().reverse());
}