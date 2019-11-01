// https://stackoverflow.com/a/20426113/1536038
function stringifyNumber(n) {
  var special = [
    'zeroth',
    'first',
    'second',
    'third',
    'fourth',
    'fifth',
    'sixth',
    'seventh',
    'eighth',
    'ninth',
    'tenth',
    'eleventh',
    'twelfth',
    'thirteenth',
    'fourteenth',
    'fifteenth',
    'sixteenth',
    'seventeenth',
    'eighteenth',
    'nineteenth'
  ];
  var deca = [
    'twent',
    'thirt',
    'fort',
    'fift',
    'sixt',
    'sevent',
    'eight',
    'ninet'
  ];
  return n < 20
    ? special[n]
    : n % 10 === 0
      ? deca[Math.floor(n / 10) - 2] + 'ieth'
      : deca[Math.floor(n / 10) - 2] + 'y-' + special[n % 10];
}

// https://stackoverflow.com/a/13241545/1536038
function transposeArray(a) {
  return Object.keys(a[0]).map(function(c) {
    return a.map(function(r) {
      return r[c];
    });
  });
}

// https://stackoverflow.com/questions/9716468
function isNumeric_(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

//https://medium.com/@jeffrey.allen.lewis/javascript-algorithms-explained-binary-search-25064b896470
function binarySearch_(array, target){
  var startIndex = 0;
  var endIndex = array.length - 1;
  while(startIndex <= endIndex) {
    var middleIndex = Math.floor((startIndex + endIndex) / 2);
    var arrMid = array[middleIndex];
    if(target === arrMid) {
      return middleIndex;
    }
    if(target > arrMid) {
      startIndex = middleIndex + 1;
    }
    if(target < arrMid) {
      endIndex = middleIndex - 1;
    }
  }
  throw 'Error';
}