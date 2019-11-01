/* globals isNumeric_ */

// Author: Jacob Jan Tuinstra

var Util = (function(util) {
  util.ss = function() {
    return SpreadsheetApp.getActiveSpreadsheet();
  };
  util.sh = function() {
    return util.ss().getActiveSheet();
  };
  util.maxrows = function() {
    return util.sh().getMaxRows();
  };
  util.maxcols = function() {
    return util.sh().getMaxColumns();
  };
  util.ssname = function() {
    return util.ss().getName();
  };
  util.shname = function() {
    return util.sh().getName();
  };
  util.shs = function() {
    return util.ss().getSheets();
  };
  util.shindex = function() {
    return util.sh().getIndex();
  };
  util.shLoc = function() {
    return util.ss().getSpreadsheetLocale();
  };
  util.shtimezone = function() {
    return util.ss().getSpreadsheetTimeZone();
  };
  util.ssurl = function() {
    return util.ss().getUrl();
  };
  util.ssid = function() {
    return util.ss().getId();
  };

  return util;
})({});

/* exported UTIL_CELLSREMAININGSHEET */
/**
 * Show the remaining cells in the active sheet
 *
 * @return Total un-used cell count
 * @customfunction
 */
function UTIL_CELLSREMAININGSHEET() {
  return (
    Util.maxrows() * Util.maxcols() -
    Util.sh()
      .getSheetValues(1, 1, -1, -1)
      .reduce(function(a, r) {
        return (
          a +
          r.filter(function(e) {
            return e;
          }).length
        );
      }, 0)
  );
}

/* exported UTIL_CELLSREMAININGSPREADSHEET */
/**
 * Show the remaining cells throughout the whole spreadsheet
 *
 * @return Total un-used cell count
 * @customfunction
 */
function UTIL_CELLSREMAININGSPREADSHEET() {
  return Util.shs().reduce(function(b, sh) {
    return (
      b +
      (sh.getMaxRows() * sh.getMaxColumns() -
        sh.getSheetValues(1, 1, -1, -1).reduce(function(a, r) {
          return (
            a +
            r.filter(function(e) {
              return e;
            }).length
          );
        }, 0))
    );
  }, 0);
}

/* exported UTIL_CELLSTOSPREADSHEETLIMIT */
/**
 * Show the remaining cells counted towards the 5 million cell limit
 *
 * @return Cells remaining
 * @customfunction
 */
function UTIL_CELLSTOSPREADSHEETLIMIT() {
  return 5000000 - UTIL_CELLSREMAININGSPREADSHEET();
}

/* exported UTIL_SPREADSHEETNAME */
/**
 * Show the spreadsheet name
 *
 * @return Spreadsheet name
 * @customfunction
 */
function UTIL_SPREADSHEETNAME() {
  return Util.ssname();
}

/* exported UTIL_SHEETNAME */
/**
 * Show the sheet name in the active sheet
 *
 * @param {number} index [optional] The index of the sheet
 * @return Sheet name
 * @customfunction
 */
function UTIL_SHEETNAME(index) {
  if (isNumeric_(index)) {
    if (index <= Util.shs().length - 1 && index >= 0) {
      return Util.shs()[index].getName();
    } else {
      throw new Error('index out of bound');
    }
  } else {
    return Util.shname();
  }
}
/* exported UTIL_TOTALSHEETS */
/**
 * Show the number of sheets present in the spreadsheet
 *
 * @return Sum of sheets
 * @customfunction
 */
function UTIL_TOTALSHEETS() {
  return Util.shs().length;
}

/* exported UTIL_SHEETINDEX */
/**
 * Show the index of the active sheet (1-based)
 *
 * @return The active sheet index
 * @customfunction
 */
function UTIL_SHEETINDEX() {
  return Util.shindex();
}

/* exported UTIL_COUNTFORMULAS */
/**
 * Calculate the number of formulas used in the range
 *
 * @param {A2:B26} A1notation [optional] default value is sheet
 * @return Sum of formulas used in range
 * @customfunction
 */
function UTIL_COUNTFORMULAS(A1notation) {
  if (typeof A1notation !== 'string') {
    throw new Error('Please input a correct A1 notation.');
  } else {
    var data = A1notation
      ? Util.sh().getRange(A1notation)
      : Util.sh().getDataRange();
    return data.getFormulas().reduce(function(row, formulas) {
      return (
        row +
        formulas.reduce(function(cell, formula) {
          return cell + (formula ? 1 : 0);
        }, 0)
      );
    }, 0);
  }
}

/* exported UTIL_FORMULATEXT */
/**
 * == UPDATE ==
 * Google Sheets has FORMULATEXT natively available.
 * Retrieve the text of the formula used
 * @param {string} A1notation "A1" or "A1:A5"
 * @return Range of formula text
 * @customfunction
 */
function UTIL_FORMULATEXT(A1notation) {
  return Util.ss()
    .getRange(A1notation)
    .getFormulas();
}

/* exported UTIL_REVERSETEXT */
/**
 * Write the string backwards
 *
 * @param {A2:B26} textrange Text to be rearranged
 * @return The reversed presentation of the text
 * @customfunction
 */
function UTIL_REVERSETEXT(textrange) {
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

/* exported UTIL_VALUESHEETS */
/**
 * Retrieve a value throughout all sheets
 *
 * @param {"A1"} textrange A1 notation to be fetched
 * @return A range of values fetched throughout all sheets
 * @customfunction
 */
function UTIL_VALUESHEETS(textrange) {
  return Util.shs().map(function(sh) {
    return sh.getRange(textrange).getValue();
  });
}

/* exported UTIL_GETLOCALE */
/**
 * Write the sheets locale
 *
 * @return The sheets locale
 * @customfunction
 */
function UTIL_GETLOCALE() {
  return Util.shLoc();
}

/* exported UTIL_GETIMEZONE */
/**
 * Write the sheets time zone
 *
 * @return The sheets time zone
 * @customfunction
 */
function UTIL_GETIMEZONE() {
  return Util.shtimezone();
}

/* exported UTIL_GETURL */
/**
 * Write the spreadsheet url
 *
 * @return The spreadsheet url
 * @customfunction
 */
function UTIL_GETURL() {
  return Util.ssurl();
}

/* exported UTIL_GETID */
/**
 * Write the spreadsheet id
 *
 * @return The spreadsheet id
 * @customfunction
 */
function UTIL_GETID() {
  return Util.ssid();
}

/* exported UTIL_SHEETS */
/**
 *
 * @return {Array.<Array>}
 * @customfunction
 */
function UTIL_SHEETS(method) {
  var methodName = 'get' + method[0].toUpperCase() + method.slice(1);
  return Util.shs().map(function(sh) {
    return sh[methodName]();
  });
}
