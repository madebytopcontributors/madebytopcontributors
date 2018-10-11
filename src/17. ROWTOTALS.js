// Author: Adam Luske

/**
 * Returns aggregations of rows in a multi-column range or array.
 *
 * @param {9} function_code Represents the function required to aggregate rows (1 = AVERAGE, 2 = COUNT, 3 = COUNTA, 4 = MAX, 5 = MIN, 6 = PRODUCT, 7 = STDEV, 8 = STDEVP, 9 = SUM, 10 = VAR, 11 = VARP).
 * @param {A:E} range The range or array over which to calculate the row aggregations.
 * @param {"Total"} header [optional] Header to be returned in the first cell of output. 
 * @customfunction
 */

function ROWTOTAL(function_code, range, header) {
  
  function_code = parseInt(function_code, 10);
  if (isNaN(function_code) || function_code < 1 || function_code > 11) {
     return 'Error: invalid function code';
  }
  if (range === undefined) {
    return 'Error: range or array not specified';
  }
  if (Object.prototype.toString.call(range) !== '[object Array]') {
    range = [[range]];
  }
  
  var offset = new Date().getTimezoneOffset() / 1440;
  
  var counta = function(row) {
    return row.reduce(function(a, e) {
      return a + (e !== "");
    }, 0);
  }
  
  var clean = function(row) {
    return row.reduce(function(a, e) {
      var type = Object.prototype.toString.call(e);
      return type === '[object Date]' ?
        a.concat((e.getTime() / 86400000) + 25569 - offset) :
        type === '[object Number]' ? a.concat(e) : a;
    }, []);
  }
  
  var sum = function(row) {
    return row.reduce(function(a, e) {
      return a += e;
    }, 0);
  }
  
  var headerRow = (header === undefined ? [] : [[header]]),
      noDataReturn = true,
      blankRows = [],
      values, rowAverage, rowSum, rowCount;
  
  for (var i = range.length - 1; i >= 0; i--) {
    if (counta(range[i]) > 0) {
      break;
    }
    blankRows.push([]);
    range.pop();
  }
  
  switch (function_code) {
      
    case 1:  // AVERAGE
      return headerRow.concat(range.map(function(row) {
        values = clean(row);
        rowCount = values.length;
        return [rowCount ? sum(values) / rowCount : null];
      }), blankRows);
      
    case 2:  // COUNT
      return headerRow.concat(range.map(function(row) {
        return [clean(row).length];
      }), blankRows);
      
    case 3:  // COUNTA
      return headerRow.concat(range.map(function(row) {
        return [counta(row)];
      }), blankRows);
      
    case 4:  // MAX
      return headerRow.concat(range.map(function(row) {
        values = clean(row);
        return [values.length ? values.reduce(function(a, e) {
          return e > a ? e : a;
        }, values[0]) : null];
      }), blankRows);
      
    case 5:  // MIN
      return headerRow.concat(range.map(function(row) {
        values = clean(row);
        return [values.length ? values.reduce(function(a, e) {
          return e < a ? e : a;
        }, values[0]) : null];
      }), blankRows);
      
    case 6:  // PRODUCT
      return headerRow.concat(range.map(function(row) {
        values = clean(row);
        return [values.length ? values.reduce(function(a, e) {
          return a *= e;
        }, 1) : 0];
      }), blankRows);
      
    case 7:  // STDEV
      return headerRow.concat(range.map(function(row) {
        values = clean(row);
        rowCount = values.length;
        if (rowCount > 1) {
          rowAverage = sum(values) / rowCount;
          return [Math.sqrt(sum(values.map(function(e) {
            return Math.pow(e - rowAverage, 2);
          })) / (rowCount - 1))];
        } else {
          return [null];
        }
      }), blankRows);
      
    case 8:  // STDEVP
      return headerRow.concat(range.map(function(row) {
        values = clean(row);
        rowCount = values.length;
        if (rowCount) {
          rowAverage = sum(values) / rowCount;
          return [Math.sqrt(sum(values.map(function(e) {
            return Math.pow(e - rowAverage, 2);
          })) / rowCount)];
        } else {
          return [null];
        }
      }), blankRows);
      
    case 9:  // SUM
      return headerRow.concat(range.map(function(row) {
        values = clean(row);
        return [sum(values)];
      }), blankRows);
      
    case 10:  // VAR
      return headerRow.concat(range.map(function(row) {
        values = clean(row);
        rowCount = values.length;
        if (rowCount > 1) {
          rowAverage = sum(values) / rowCount;
          return [sum(values.map(function(e) {
            return Math.pow(e - rowAverage, 2);
          })) / (rowCount - 1)];
        } else {
          return [null];
        }
      }), blankRows);
      
    case 11:  // VARP
      return headerRow.concat(range.map(function(row) {
        values = clean(row);
        rowCount = values.length;
        if (rowCount) {
          rowAverage = sum(values) / rowCount;
          return [sum(values.map(function(e) {
            return Math.pow(e - rowAverage, 2);
          })) / rowCount];
        } else {
          return [null];
        }
      }), blankRows);
      
  }
  
}