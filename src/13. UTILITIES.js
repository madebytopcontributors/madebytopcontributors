// Author: Jacob Jan Tuinstra

var Util = (function() {
  'use strict';
  var util = {};
  
  util.ss = SpreadsheetApp.getActiveSpreadsheet();
  util.sh = util.ss.getActiveSheet();
  util.maxRows = util.sh.getMaxRows();
  util.maxColumns = util.sh.getMaxColumns();
  util.ssname = util.ss.getName();
  util.shname = util.sh.getName();
  util.shs = util.ss.getSheets();
  util.shindex = util.sh.getIndex();
  util.locale = util.ss.getSpreadsheetLocale();
  
  util.cellsremainingsheet = function () {
    return (Util.maxRows * Util.maxColumns) - Util.sh.getSheetValues(1, 1, -1, -1).reduce ( function (a, r) {
      return a + r.filter( function (e) {
        return e;
      }).length;
    }, 0);
  }
  
  return util;
})();

  if(Util.locale === "nl_NL") {
    /**
    * Test Nederlands
    *
    * @return Total un-used cell count
    * @customfunction
    */
    function UTIL_BESCHIKBARECELLENINTAB() {
      Util.cellsremainingsheet;
    }
  } else {
    /**
    * Show the remaining cells in the active sheet  
    *
    * @return Total un-used cell count
    * @customfunction
    */
    function UTIL_CELLSREMAININGSHEET() {
      Util.cellsremainingsheet;
    }
  }
    
  
  
  
///**
//* Show the remaining cells in the active sheet  
//*
//* @return Total un-used cell count
//* @customfunction
//*/
//function UTIL_CELLSREMAININGSHEET() {
//  return (Util.maxRows * Util.maxColumns) - Util.sh.getSheetValues(1, 1, -1, -1).reduce ( function (a, r) {
//    return a + r.filter( function (e) {
//      return e;
//    }).length;
//  }, 0);   
//}

/**
 * Show the remaining cells throughout the whole spreadsheet  
 *
 * @return Total un-used cell count
 * @customfunction
 */
function UTIL_CELLSREMAININGSPREADSHEET() {
  return Util.shs.reduce ( function (b, sh) {
    return b + ((sh.getMaxRows() * sh.getMaxColumns()) - sh.getSheetValues(1, 1, -1, -1).reduce ( function (a, r) {
      return a + r.filter( function (e) {
        return e;
      }).length;
    }, 0));
  }, 0);
}

/**
 * Show the remaining cells counted towards the 2 million cell limit  
 *
 * @return Cells remaing
 * @customfunction
 */
function UTIL_CELLSTOSPREADSHEETLIMIT() {
  return 2000000 - UTIL_CELLSREMAININGSPREADSHEET();
}

/**
 * Show the spreadsheet name 
 *
 * @return Spreadsheet name
 * @customfunction
 */
function UTIL_SPREADSHEETNAME() {
  return Util.ssname;
}

/**
 * Show the sheet name in the active sheet
 *
 * @return Sheet name
 * @customfunction
 */
function UTIL_SHEETNAME() {
  return Util.shname;
}

/**
 * Show the number of sheets present in the spreadsheet
 *
 * @return Sum of sheets
 * @customfunction
 */
function UTIL_TOTALSHEETS() {
  return Util.shs.length;
}

/**
 * Show the index of the active sheet (1-based)
 *
 * @return The active sheet index
 * @customfunction
 */
function UTIL_SHEETINDEX() {
  return Util.shindex;
}

/**
 * Write the string backwards
 *
 * @param {A2:B26} textrange Text to be rearranged
 * @return The reversed presentation of the text
 * @customfunction
 */
function UTIL_REVERSETEXT(textrange) {
  textrange = textrange.map ? textrange : [[textrange]];
  return textrange.map ( function (row) {
    return row.map ( function (cell) {
      return cell.length > 0 ? cell.split('').reverse().join('') : null;
    })
  })
}

/**
 * Calculate the number of formulas used in the range
 *
 * @param {A2:B26} A1notation [optional] default value is sheet 
 * @return Sum of formulas used in range
 * @customfunction
 */
function UTIL_COUNTFORMULAS(A1notation) {
  if(typeof A1notation !== 'string') {
    throw "Please input a correct A1 notation.";
  } else {
    var data = A1notation ? Util.sh.getRange(A1notation) : Util.sh.getDataRange();  
    return data.getFormulas().reduce ( function ( row, formulas ) {
      return row + formulas.reduce ( function ( cell, formula ) {
        return cell + (formula ? 1 : 0);
      }, 0)
    }, 0)
  }
}

/**
 * Retrieve the text of the formula used
 * @param {A2:B26} A1notation "A1" or "A1:A5"
 * @return Range of formula text
 * @customfunction
 */
function UTIL_FORMULATEXT(A1notation) {
  return Util.ss.getRange(A1notation).getFormulas();
}