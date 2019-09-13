/**
* Presents the text as individual characters vertically. Use the TRANSPOSE formula to present them horizontally. 
* @param {A2:B26} text Text to be processed
* @return separated characters
* @customfunction
*/
function TEXT2CHARACTER(text) {
  return text.toString().split("");
} 

/**
 * Write the string backwards
 *
 * @param {A2:B26} textrange Text to be rearranged
 * @return The reversed presentation of the text
 * @customfunction
 */
function TEXT2REVERSE(textrange) {
  textrange = textrange.map ? textrange : [[textrange]];
  return textrange.map ( function (row) {
    return row.map ( function (cell) {
      return cell.length > 0 ? cell.split('').reverse().join('') : null;
    })
  })
}