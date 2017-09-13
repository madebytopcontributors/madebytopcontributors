// Author: Jacob Jan Tuinstra

/**
 * Create a matrix, that's re-arranged by row or column
 *
 * @param {A2:B26} range The data to be sorted
 * @param {(number|object)} current Use a number (1) or range ({1,2,3}) to set the current positions
 * @param {(number|object|string)} wanted Use a number (1) or range ({1,2,3}) or the words "beginning, end" to set the wanted positions
 * @param {boolean} row_col Use TRUE|FALSE to indicate row or column positions
 * @return The modified matrix
 * @customfunction
 */
function SHIFTER(range, current, wanted, row_col) {
  row_col = row_col || false;
}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
function checkShifter() {

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
  