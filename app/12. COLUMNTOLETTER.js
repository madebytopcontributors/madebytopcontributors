// Author: Adam Lusk

function columnToLetter(column) {
  var temp, letter = '';
  while (column > 0) {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

// JJ; throw error for NAN
// add range?
// is this also working for a very large range, like 114352345643245?
