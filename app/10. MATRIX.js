// Author: Jacob Jan Tuinstra

/**
 * Create a matrix, that's optionally restricted by row's and column's and optionally sorted by a range of column's
 *
 * @param {A2:B26} range The data to be sorted
 * @param {(number|object|string)} opt_row Use a number (1) or range ({1,2,3}) to include, convert the input ("1" or "{1,2,3}") into a string to exclude
 * @param {(number|object|string)} opt_col Use a number (1) or range ({1,2,3}) to include, convert the input ("1" or "{1,2,3}") into a string to exclude
 * @param {(boolean|number)} opt_sort Use TRUE|FALSE or 1,TRUE,2,FALSE
 * @return The modified range
 * @customfunction
 */
function MATRIX(range, opt_row, opt_col, opt_sort) {
  var arg = arguments;
  
  // data
  if(arg[0]) {
    var argLen = arg.length; 
    if(argLen === 1) {
      return Array.isArray(arg[0]) ? range : arg[0];
    } else {
      var rowOutput, colOutput, sortOutput;
    }    
  } else { 
    return;
  }
    
  // row  
  if(arg[1]) {
    rowOutput = checkandprocess(arg[1], range, 'row');
    if(argLen === 2) {
      return rowOutput;
    }
  } else {
    if(argLen === 2) {
      return range;
    } else {
      rowOutput = range;
    }
  }
    
  // column
  if(arg[2]) {
    colOutput = checkandprocess(arg[2], rowOutput, 'column');    
    if(argLen === 3) {
      return transposeArray(colOutput);
    }
  } else {
    if(argLen === 3) {
      return rowOutput;
    } else {
      colOutput = transposeArray(rowOutput);
    }
  }
  
  // sorting variables
  if(argLen >= 4) {
    var typesAsc = ['number', 'object', 'string', 'boolean', 'error', 'empty']; 
    var typesDsc = ['error', 'boolean', 'string', 'object', 'number', 'empty'];
    var errTypes = ['#N/A', '#NAME?', '#REF!', '#VALUE!', '#NUM!', '#NULL!', '#DIV/0!', '#ERROR!', '']; 
    var sortP = Array.apply(null, arg).slice(3), sLen = sortP.length, sortB = false, rLenCol = colOutput.length;
  }
  
  // boolean sort  
  if(argLen === 4) {  
    var sType = typeof(sortP[0]);  
    if(sLen === 1 && sType !== 'boolean') {
      throw "The fourth parameter expects a boolean value only. But '" + sortP[0] + "' is a " + sType + " and cannot be coerced to a boolean.";
      return;
    } else if(sLen === 0 && sType === 'string') {
      return colOutput;
    } else {
      sortB = true;
    }
  }
  
  // multiple column sort
  if(argLen > 4) {        
    if((argLen % 2) === 0) {
      throw "All arguments after the fourth position are to be inputted as pairs.";
      return;
    } else {
      sortP.forEach ( function (val, i, arr) {
        var t = typeof(val), nth = stringifyNumber(i + 3);
        if(i % 2 === 0) {
          if(t === 'number') {
            if(val <= rLenCol) {
              if(arr.indexOf(val) !== i) {                 
                throw "Duplicate column numbers have been found. Please make sure all column numbers are unique.";
                return;
              }
            } else {
              throw "The " + nth + " parameter (" + val + ") evaluates to an out-of-bounds range. Please choose the parameter to be smaller than " + (rLenCol + 1) + ".";
              return;
            }
          } else {
            throw "The " + nth + " parameter expects number values only. But " + val + "' cannot be coerced to a number.";
            return;
          } 
        } else {
          if(t !== 'boolean') {
            throw "The " + nth + " parameter expects boolean values only. But " + val + "' cannot be coerced to a boolean.";
            return;
          }
        }
      });
    }
  }  
  
  var typeMapped = colOutput.map ( function (row, i) {
    var sOrder, errIndex, s;
    if(sortB === true) {
      sOrder = sortP[0];
    } else {
      var colIndex = sortP.indexOf(i + 1);
      sOrder = colIndex !== -1 ? sortP[colIndex + 1] : null; 
    }
    if(typeof(sOrder) !== null) {
      s = sOrder === true ? typesAsc : typesDsc;
      errIndex = sOrder === true ? 0 : 4;
    }
    return row.map ( function (cell, j) { 
      var type = typeof(cell), indxOf = s.indexOf(type);
      if(type === 'string' && errTypes.indexOf(cell) !== -1) {
        var errIndex = s.indexOf('error');
        indxOf = cell == '' ? 5 : errIndex;
      }
      return sOrder !== null ? { index: j, srt: indxOf, value: indxOf === 2 ? cell.toLowerCase() : cell } : { index: j, srt: 6 };
    })
  });    
  
  var typeSorted = transposeArray(typeMapped).deepTypeSort(rLenCol);  
  var valueSorted = typeSorted.deepValueSort(rLenCol, sortP);
  
  range = arg[1] || arg[2] ? transposeArray(colOutput) : range;  
  return valueSorted.map ( function (row, i) {
    return row.map ( function (cell, j) {  
      return range[cell.index][j];
    })
  });
}

// https://stackoverflow.com/a/20426113/1536038
function stringifyNumber(n) {
  var special = ['zeroth','first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 
    'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
  var deca = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];
  return n < 20 ? special[n] : ((n % 10 === 0) ? deca[Math.floor(n / 10) - 2] + 'ieth' : deca[Math.floor(n / 10) - 2] + 'y-' + special[n % 10]);
}

function checkandprocess(par, range, kind) {
  var typePar = typeof(par), type = false;
  
  // convert into strings
  if(typePar === 'object' || typePar === 'number') {    
    par = typePar === 'object' ? JSON.parse('[' + par + ']') : par;
    type = true;
  } else if(typePar === 'string' && isNaN(par) === true ) {
    par = JSON.parse(par.replace("{","[").replace("}","]"));
  } else if(typePar === 'boolean') {
    throw "The " + kind + " parameter expects string, object or number values only. But '" + par + "' is a " + typePar + " and cannot be coerced to the previous mentioned types.";
    return;
  }
  
  // check for out-of-bounds
  var len = kind === 'row' ? range.length : range[0].length;
  var errorText = "The " + kind + " value(s) evaluates to an out-of-bounds range. Please choose the parameter to be smaller than " + (len + 1) + ".";
  if(arr) {
    if(len > Math.max(par)) { 
      throw errorText;
      return;
    } 
  } else {
    if(par > len) {
      throw errorText;
      return;
    }
  } 
  
  // process data  
  var data = kind === 'row' ? range : transposeArray(range), arr = Array.isArray(par), output = [];
  if(arr) {
    if(type === true) {
      par.forEach ( function (d) {
        output.push(data[d - 1]);
      });
    } else {
      //https://stackoverflow.com/a/9425230/1536038
      for(var i = par.length - 1; i >= 0; i--) {
        data.splice((par[i] - 1), 1);
      }
      output = data;
    }
  } else {
    if(type === true) {
      output.push(data[par - 1]);      
    } else {
      data.splice((Number(par) - 1), 1);
      output = data;      
    }
  }
  return output; 
}

//https://stackoverflow.com/a/13241545/1536038
function transposeArray(a) {
  return Object.keys(a[0]).map( function (c) {
    return a.map( function (r) {
      return r[c];
    });
  });
} 

//http://stackoverflow.com/questions/2784230/javascript-how-do-you-sort-an-array-on-multiple-columns
Array.prototype.deepTypeSort = function(L) {
  var numberSort = function (a, b) {
    return a.srt - b.srt;
  } 
  this.sort ( function (a, b) {
    var tem = 0, indx = 0;
    while(tem == 0 && indx < L) {
      tem = numberSort(a[indx], b[indx]); 
      indx += 1;         
    }
    return tem;
  });
  return this;
}

//https://stackoverflow.com/questions/10951167/sorting-in-javascript-with-special-characters
Array.prototype.deepValueSort = function(rLenCol, sortP) {
  var col, sLen = sortP.length, L = rLenCol;   
  var alphabet = '_-;:!¡¿.‘’"()[]{}¶@*/&#%`^©+×<=>¬|~¤$¥€01½¼²2³3¾456789abcdefghijklmnopqrstuvwxyz';        
  var valueSort = function (a, b, sort) {
    var sa = a.srt, sb = b.srt;
    if(sa === sb) {
      a = a.value, b = b.value;
      if(sa !== 2) {
        if(sa === 6) {
          return 0;
        }        
        return sort == true ? a - b : b - a;
      }        
      if(sa === 2) {
        var index_a = alphabet.indexOf(a[0]), index_b = alphabet.indexOf(b[0]);
        if(index_a === -1 || index_b === -1) {
          return sort == true ? a.localeCompare(b) : b.localeCompare(a);
        } else {  
          if(index_a === index_b) { 
            if(a < b) {
              return -1;
            } else if(a > b) {
              return 1;
            }
            return 0;
          } else {
            return sort == true ? index_a - index_b : index_b - index_a;
          }
        } 
      }
    } 
  }
  this.sort ( function (a, b) {
    var tem = 0, indx = 0, sort;
    while(tem === 0 && indx < L) {
      if(sLen === 1) {   
        sort = sortP[0];
      } else {
        var colIndx = sortP.indexOf(indx + 1);
        if(colIndx !== -1) {          
          indx = sortP[colIndx] - 1;
          sort = sortP[colIndx + 1];
        } 
      }   
      tem = valueSort(a[indx], b[indx], sort); 
      indx += 1;
    }
    return tem;
  });
  return this;
}