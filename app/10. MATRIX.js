// Author: Jacob Jan Tuinstra

/**
* Create a matrix, that's optionally restricted by row's and column's and optionally sorted by a range of column's
*
* @param {A2:B26} range data range
* @param {(number|object)} opt_row use curly brackets to add an object 1 or {1,1,2,3}
* @param {(number|object)} opt_col use curly brackets to add an object 1 or {1,1,2,3}
* @param {(boolean|object)} opt_sort use curly brackets to add an object TRUE|FALSE or 1,TRUE,2,FALSE
* @return A the modified matrix
* @customfunction
*/
function MATRIX(range, opt_row, opt_col, opt_sort) {
  var arg = arguments;

  // data
  if (arg[0]) {
    var argLen = arguments.length;
    if (argLen === 1) {
      return Array.isArray(arg[0]) ? range : arg[0];
    } else {
      var rowOutput, colOutput, sortOutput;
    }
  } else {
    return;
  }

  // row
  if (arg[1]) {
    var rowCheck = typeof (arg[1]);

    if (rowCheck === 'string') {
      var strValue, strCheck;
      try {
        strValue = Number(arg[1]);
        strCheck = 'number';
      } catch (e) {
        strType = JSON.parse(arg[1].replace("{", "[").replace("}", "]"));
        strCheck = 'array';
      }
      arg[1] = strValue;
    }

    return strCheck;

    if (outOfBounds(arg[1], rLen) === 'Ok') {
      var rowData = range, rLen = rowData.length;

      switch (rowCheck) {
        case 'string':
          rowOutput = rowData.filter(function (d, i) {
            return strCheck !== 'number' ? arg[1].indexOf(i + 1) !== -1 : (i + 1) !== arg[1];
          });
          break;
        case 'number':
          var row;
          rowData.some(function (d, i) {
            row = (i + 1) === arg[1] ? [d] : null;
            return (i + 1) === arg[1];
          });
          rowOutput = row;
          break;
        case 'object':
          rowOutput = arg[1][0].map(function (c) {
            return rowData[c - 1];
          });
          break;
      }
    }
    if (argLen === 2) {
      return rowOutput;
    }
  } else {
    if (argLen === 2) {
      return range;
    } else {
      rowOutput = range;
    }
  }

  // column
  if (arg[2]) {
    var colCheck = checkInput(arg[2]), colData = arg[1] ? rowOutput : range, colDataLen = colData[0].length;
    switch (colCheck) {
      case "number":
        if (arg[2] > colDataLen) {
          throw "The column evaluates to an out-of-bounds range. Please choose the parameter to be smaller than " + (colDataLen + 1) + ".";
          return;
        } else {
          colOutput = colData.map(function (d) {
            return d[arg[2] - 1];
          });
        }
        break;
      case "object":
        colOutput = colData.map(function (d) {
          return arg[2][0].map(function (c) {
            return d[c - 1];
          });
        });
        break;
      default:
        throw 'Input parameters must be an object or single number';
        return;
    }
    if (argLen === 3) {
      return colOutput;
    }
  } else {
    if (argLen === 3) {
      return rowOutput;
    } else {
      colOutput = rowOutput;
    }
  }

  // sorting variables
  var typesAsc = ['number', 'object', 'string', 'boolean', 'error', 'empty'];
  var typesDsc = ['error', 'boolean', 'string', 'object', 'number', 'empty'];
  var errTypes = ['#N/A', '#NAME?', '#REF!', '#VALUE!', '#NUM!', '#NULL!', '#DIV/0!', '#ERROR!', ''];
  var sortOrder, orderType, multiple = false, sortData, rLenCol = colOutput[0].length;

  // boolean sort
  if (arg[3].length === 0 && typeof (arg[3]) === 'string' && argLen === 4) {
    return colOutput;
  } else {
    if (typeof (arg[3]) === 'boolean') {
      sortOrder = arg[3] == true ? typesAsc : typesDsc;
      orderType = arg[3] == true ? true : false;
    } else {
      throw "The fourth parameter expects a boolean value only. But '" + arg[3] + "' is a " + typeof (arg[3]) + " and cannot be coerced to a boolean.";
      return;
    }
  }

  // multiple column sort
  if (argLen > 4) {
    if ((argLen % 2) === 0) {
      throw "All arguments after the fourth position are to be inputted as pairs.";
      return;
    } else {
      var args = Array.apply(null, arg).slice(3), num, ind, max = 1, dub = 0;

      var checkNum = args.some(function (val, i, arr) {
        num = val, ind = i, max = max >= val ? max : val;
        return typeof (val) === ['number', 'boolean'][i % 2];
      });

      var nth = stringifyNumber(ind + 3);
      if (checkNum === false && max === 1) {
        throw "The " + nth + " parameter expects " + (ind % 2 === 0 ? "number values" : "boolean input") + ". But '" + num + "' cannot be coerced to a " + (ind % 2 === 0 ? "number" : "boolean") + ".";
        return;
      }

      if (checkNum === true && max > 1) {
        throw "The " + nth + " parameter (" + num + ") evaluates to an out-of-bounds range. Please choose the parameter to be smaller than " + (rLenCol + 1) + ".";
        return;
      }

      // add code to cope with duplicate column numbers
      // if(checkNum === true && dub > 1) {
      //   throw "Duplicate column numbers have been found. Please make sure all pairs are unique.";
      //   return;
      // }

      multiple = true;
      orderType = arg;
    }
  }

  //return colOutput;

  var typeMapped = colOutput.map(function (row, i) {
    if (multiple == true) {
      sortOrder = (arg[(i * 2) + 3] === i && arg[(i * 2) + 4] == false) ? typesDsc : typesAsc;
    }
    return row.map(function (cell, j) {
      var type = typeof (cell), indxOf = sortOrder.indexOf(type);
      if (type === 'string' && errTypes.indexOf(cell) !== -1) {
        var errIndex = sortOrder.indexOf('error');
        indxOf = cell == '' ? 5 : errIndex;
      }
      return { index: i, srt: indxOf, value: indxOf === 2 ? cell.toLowerCase() : cell };
    })
  });

  //  return typeMapped.map ( function (row, i) {
  //    return row.map ( function (cell, j) {
  //      return cell.srt + " ;" + cell.value;
  //    })
  //  });

  var typeSorted = typeMapped.deepTypeSort(rLenCol);

  //  return typeMapped.map ( function (row, i) {
  //    return row.map ( function (cell, j) {
  //      return cell.srt + " ;" + cell.value;
  //    })
  //  });

  var valueSorted = typeSorted.deepValueSort(orderType, rLenCol);

  return valueSorted.map(function (row, i) {
    return row.map(function (cell, j) {
      return colOutput[cell.index][j];
    })
  });
}

//function TEST() {
//  var text = "{1,2}";
//  var text3 = Logger.log(arguments[0]);
//var text2 = text.replace("{","[").replace("}","]");
//Logger.log(text2);
//var text1 = "[1,2]";
//Logger.log(JSON.parse(text2));


//  .map( function (d) {
//    Logger.log(d);
//    return
//  });
//}



// https://stackoverflow.com/a/20426113/1536038
function stringifyNumber(n) {
  var special = ['zeroth', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth',
    'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
  var deca = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];
  return n < 20 ? special[n] : ((n % 10 === 0) ? deca[Math.floor(n / 10) - 2] + 'ieth' : deca[Math.floor(n / 10) - 2] + 'y-' + special[n % 10]);
}

function checkInput(opt) {
  var t = typeof (opt);
  if (t === 'object') {
    return Object.keys(opt[0]).some(function (key) {
      return isNaN(opt[0][key]);
    }) == false ? 'object' : false;
  } else if (t === 'number') {
    return 'number';
  } else if (t === 'string') {
    return 'string';
  } else {
    return false;
  }
}

function outOfBounds(par, len) {
  var typePar = typeof (par), errorText = "The row evaluates to an out-of-bounds range. Please choose the parameter to be smaller than " + (len + 1) + ".";

  switch (typePar) {
    case 'number':
      if (Array.isArray(par)) {
        if (par.some(function (d) {
          return par > len;
        }) == false) {
          throw errorText;
          return;
        }
      } else {
        if (par > len) {
          throw errorText;
          return;
        }
      }
      break;
    case 'object':
      if (Object.keys(par[0]).some(function (key) {
        return par[0][key] > len;
      }) == false) {
        throw errorText;
        return;
      }
      break;
  }
  return 'Ok';
}


//http://stackoverflow.com/questions/2784230/javascript-how-do-you-sort-an-array-on-multiple-columns
Array.prototype.deepTypeSort = function (L) {
  var numberSort = function (a, b) {
    return a.srt - b.srt;
  }
  this.sort(function (a, b) {
    var tem = 0, indx = 0;
    while (tem == 0 && indx < L) {
      tem = numberSort(a[indx], b[indx]);
      indx += 1;
    }
    return tem;
  });
  return this;
}

//https://stackoverflow.com/questions/10951167/sorting-in-javascript-with-special-characters
Array.prototype.deepValueSort = function (orderType, rLenCol) {
  var itm, blnType = typeof (orderType), L = blnType === 'boolean' ? rLenCol : orderType.length - 1;
  var alphabet = '_-;:!¡¿.‘’"()[]{}¶@*/&#%`^©+×<=>¬|~¤$¥€01½¼²2³3¾456789abcdefghijklmnopqrstuvwxyz';

  var valueSort = function (a, b, sort) {
    var sa = a.srt, sb = b.srt;
    if (sa === sb) {
      a = a.value, b = b.value;
      if (sa === 0 || sa === 3 || sa === 1 || sa === 4) {
        return sort == true ? a - b : b - a;
      }

      if (sa === 2) {
        var index_a = alphabet.indexOf(a[0]), index_b = alphabet.indexOf(b[0]);
        if (index_a === -1 || index_b === -1) {
          return sort == true ? a.localeCompare(b) : b.localeCompare(a);
        } else {
          if (index_a === index_b) {
            return sort == true ? (a < b ? -1 : 1) : (a > b ? -1 : 1);
          } else {
            return sort == true ? index_a - index_b : index_b - index_a;
          }
        }
        return 0;
      }
    } else {
      return 0;
    }
  }
  this.sort(function (a, b) {
    var tem = 0, indx = 0, sort;
    while (tem === 0 && indx < L) {
      if (blnType === 'boolean') {
        sort = orderType;
        tem = valueSort(a[indx], b[indx], sort);
        indx += 1;
      } else {
        itm = orderType[indx + 3] - 1;
        sort = orderType[indx + 4];
        tem = valueSort(a[itm], b[itm], sort);
        indx += 2;
      }
    }
    return tem;
  });
  return this;
}
