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

function JS_XLOOKUP(value, lookup_array, return_array, opt_match_mode, opt_search_mode) {
  opt_search_mode = opt_search_mode || 1;
  opt_match_mode = opt_match_mode || 1;
  var searchAbs = Math.abs(opt_search_mode);
  var matchAbs = Math.abs(opt_match_mode);
  
  // check the data types
  if(searchAbs || matchAbs) {
  
    // check if all values are strings
    var wildcardCheck = false;
    if(lookup_array_transposed.every ( function (value) { 
        return typeof value === 'string'; 
      })) {
      wildcardCheck = 'string';
    } else {
      if(lookup_array_transposed.every ( function (value) { 
          return typeof value === 'number'; 
        })) {
        wildcardCheck = 'numeric';
      }
    }
  }

  /*** opt_search_mode ***/ 
  // binary search
  if(searchAbs === 2) {
    
    // create lookup_return_array
    lookup_array.forEach( function (d, i) {
      return_array[i].unshift(d);
    });
    
    // sort lookup_return_array on first column only ascendingly
    return_array.sort( function (a, b) {
      return a[0] - b[0];
    });
    
    // sort lookup_return_array on first column only descendingly
    if(opt_search_mode === -2) {
      return_array.sort( function (a, b) {
        return b[0] - a[0];
      });
    }
    
    // update lookup_array and modify return_array
    lookup_array.forEach( function (d, i) { 
      lookup_array[i][0] = return_array[i][0];
      return_array[i].shift(); 
    }); 
  }
  
  // create the transposed lookup_array and index
  var return_array_index = 0;
  var lookup_array_transposed = transposeArray(lookup_array)[0];

  /*** opt_match_mode ***/ 
  // match or next lower/larger next
  if(matchAbs === 1) {  
    if(wildcardCheck === 'string') {
      var levenshtein_array = LEVENSHTEINDISTANCE(JS_MAP(value, "cell", lookup_array.length), lookup_array);
      return_array_index = levenshtein_array.indexOf(Math.min.apply(null, levenshtein_array));
    }
  }

  /*** opt_match_mode ***/ 
  // wild card === TEXT ONLY
  if(matchAbs === 2) {      
    if(wildcardCheck === 'string') {
      var rgxStr;
      if(value.indexOf('~') !== -1) {
        rgxStr = value.replace(/\~\?/, '\\?');
        rgxStr = rgxStr.replace(/\~\*/, '\\*');
        rgxStr = rgxStr.replace(/\~\~/, '\\~');
      } else if(value.indexOf('?') !== -1) {
        rgxStr = value.replace(/\?/g, '\.');
      } else if(value.indexOf('*') !== -1) {
        rgxStr = value.replace(/\*/ , '\.+');
      }
      value = lookup_array_transposed.filter ( function (val) {
        return val.match(rgxStr);
      })[0];
    } else if(wildcardCheck === 'numeric') {
      if(value.indexOf('>=') === -1 && value.indexOf('<=') === -1 && value.indexOf('>') === -1 && value.indexOf('<') === -1) {
        if(value.indexOf('<>') !== -1) {
          value = String(value).replace(/<>/,'!=');
        } else if(value.indexOf('=') !== -1) {
          value = String(value).replace(/=/,'==');
        } else {
          throw 'No wildcard/boolean found';
          return;
        }          
      }        
      value = lookup_array_transposed.filter ( function (val) {
        return val + value;
      })[0];
    } else {
      throw 'Range not all text/number';
      return;
    }
  }
     
  // first / last un-sorted and both binary queries
  if(searchAbs === 1) {
    return_array_index = opt_search_mode === 1 ? lookup_array_transposed.indexOf(value) : lookup_array_transposed.lastIndexOf(value);
  } 
  
  // both binary queries
  if(searchAbs === 2) {
    return_array_index = binarySearch_(lookup_array_transposed, value);
  } 
    
  // show the outcome
  if(return_array_index === -1) {
    throw '#N/A';
  } else {
    return return_array.filter( function (row, i) {
      return i === return_array_index;
    });
  }
}
                             
