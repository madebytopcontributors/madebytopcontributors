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
  });
}

function TRANSLITERATE(wordrange, language, system) {
  wordrange = wordrange.map ? wordrange : [[wordrange]];
  
  var transliterate = {};
  switch(language) {
    case 'russian':
      // https://www.loc.gov/catdir/cpso/romanization/russian.pdf
      transliterate = {'А':'A','Б':'B','В':'V','Г':'G','Д':'D','Е':'E','Ё':'Ë','Ж':'Zh','З':'Z','И':'I','І':'Ī','Й':'Ĭ','К':'K','Л':'L','М':'M','Н':'N','О':'O','П':'P','Р':'R','С':'S','Т':'T','У':'U','Ф':'F','Х':'Kh','Ц':'Ts','Ч':'Ch','Ш':'Sh','Щ':'Shch','Ъ':'ʺ','Ы':'Y','Ь':'ʹ','Ѣ':'ie','Э':'Ė','Ю':'IU','Я':'IA','Ѳ':'Ḟ','Ѵ':'Ẏ','а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'ë','ж':'zh','з':'z','и':'i','і':'ī','й':'ĭ','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ъ':'ʺ','ы':'y','ь':'ʹ','ѣ':'ie','э':'ė','ю':'iu','я':'ia','ѳ':'ḟ','ѵ':'ẏ'};
      break;
    case 'belarusian':
      // http://www.loc.gov/catdir/cpso/romanization/belarusian.pdf
      transliterate = {'А':'A','Б':'B','В':'V','Г':'H','Ґ':'G','Д':'D','Е':'E','Ё':'Io','Ж':'Zh','З':'Z','И':'Ī','Ї':'Ï','І':'I','Й':'Ĭ','К':'K','Л':'L','М':'M','Н':'N','О':'O','П':'P','Р':'R','С':'S','Т':'T','У':'U','Ў':'Ŭ','Ф':'F','Х':'Kh','Ц':'Ts','Ч':'Ch','Ш':'Sh','Щ':'Shch','Ъ':'ʺ','Ы':'Y','Ь':'ʹ','Ѣ':'Ě','Э':'Ė','Ю':'IU','Я':'IA','а':'a','б':'b','в':'v','г':'h','ґ':'g','д':'d','е':'e','ё':'io','ж':'zh','з':'z','и':'ī','ї':'ï','і':'i','й':'ĭ','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ў':'ŭ','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'shch','ъ':'ʺ','ы':'y','ь':'ʹ','ѣ':'ě','э':'ė','ю':'iu','я':'ia'};
      break;
    case 'ukrainian':
      // http://www.loc.gov/catdir/cpso/romanization/ukrainia.pdf
      transliterate = {'А':'A','Б':'B','В':'V','Г':'H','Ґ':'G','Д':'D','Е':'E','Є':'Ie','Ж':'Zh','З':'Z','И':'Y','І':'I','Ї':'Ï','Й':'Ĭ','К':'K','Л':'L','М':'M','Н':'N','О':'O','П':'P','Р':'R','С':'S','Т':'T','У':'U','Ф':'F','Х':'Kh','Ц':'ц','Ч':'Ch','Ш':'Sh','Щ':'Shch','Ь':'ʹ','Ю':'IU','Я':'IA','а':'a','б':'b','в':'v','г':'h','ґ':'g','д':'d','е':'e','є':'ie','ж':'zh','з':'z','и':'y','і':'i','ї':'ï','й':'ĭ','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'kh','':'','ч':'ch','ш':'sh','щ':'shch','ь':'ʹ','ю':'iu','я':'ia','ч':'ch','ш':'sh','щ':'shch','ъ':'ʺ','ы':'y','ь':'ʹ','ѣ':'ě','э':'ė','ю':'iu','я':'ia'};
      break;
    case 'bulgarian':
      // http://www.loc.gov/catdir/cpso/romanization/bulgarian.pdf
      transliterate = {'А':'A','Б':'B','В':'V','Г':'G','Д':'D','Е':'E','Ж':'Zh','З':'Z','И':'I','Й':'Ĭ','К':'K','Л':'L','М':'M','Н':'N','О':'O','П':'P','Р':'R','С':'S','Т':'T','У':'U','Ф':'F','Х':'Kh','Ц':'Ts','Ч':'Ch','Ш':'Sh','Щ':'Sht','Ъ':'Ŭ','Ь':'ʹ','Ѣ':'Ie','Ю':'ю','Ю':'IU','Я':'IA','а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ж':'zh','з':'z','и':'i','й':'ĭ','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts','ч':'ch','ш':'sh','щ':'sht','ъ':'ŭ','ь':'ʹ','ѣ':'ie','':'','ю':'iu','я':'ia'};
      break;
  }
  
  return wordrange.map ( function (row) {
    return row.map ( function (word) {
      return word.split('').map( function (char) { 
        return transliterate[char] || char; 
      }).join('')
    })
  });
}
