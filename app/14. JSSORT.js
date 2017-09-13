// Author: Jacob Jan Tuinstra

/**
 * Sort a range by using a JavaScript sort 
 *
 * @param {A2:B26} range The data to be sorted
 * @param {(boolean|number)} opt_sort Use TRUE|FALSE or 1,TRUE,2,FALSE
 * @return The sorted range
 * @customfunction
 */

function JSSORT(range) {
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
}
