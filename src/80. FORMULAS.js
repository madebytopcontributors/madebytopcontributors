/* exported TEXT2CHARACTER, TEXT2REVERSE, TRANSLITERATE, RETRANSLITERATE */
/* globals translit */

/**
 * Presents the text as individual characters vertically. Use the TRANSPOSE formula to present them horizontally.
 * @param {A2:B26} text Text to be processed
 * @return separated characters
 * @customfunction
 */
function TEXT2CHARACTER(text) {
  return text.toString().split('');
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
  return textrange.map(function(row) {
    return row.map(function(cell) {
      return cell.length > 0
        ? cell
            .split('')
            .reverse()
            .join('')
        : null;
    });
  });
}

/**
 * Transliterates a word into its Latin alphabet
 * @param {"Сарафан"|A1:A4} string A string fo trinsliteration
 * @param {5} language A number of language. System A = 1-Diacritic; system B = 2-Belarusian, 3-Bulgarian, 4-Macedonian, 5-Russian, 6-Ukrainian
 * @customfunction
 */
function TRANSLITERATE(string, language) {
  var str = string;
  var typ = language;
  return translit(str, typ);
}

/**
 * Retransliterates of the word in Cyrillic spelling
 * @param {"Sarafan"|A1:A4} string A string fo trinsliteration
 * @param {5} language A number of language. System A = 1-Diacritic; system B = 2-Belarusian, 3-Bulgarian, 4-Macedonian, 5-Russian, 6-Ukrainian
 * @customfunction
 */
function RETRANSLITERATE(string, language) {
  var str = string;
  var typ = language;
  return translit(str, -1 * typ);
}
