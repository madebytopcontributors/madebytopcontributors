// Author: Jacob Jan Tuinstra

function JSSORT(range) {
  var arg = arguments;
  
  // data
  if(arg[0]) {
    var argLen = arg.length;
    if(argLen === 1) {
      return (Array.isArray(arg[0])) ? range.sort() : arg[0];
    } 
  } else { 
    return;
  }
}