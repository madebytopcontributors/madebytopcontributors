'use strict';

/**
 * globals
 */

var MATRIX_TEXT = 'MATRIX formula';
var SQL_TEXT = 'SQL JOIN formulas';
var CONST_TEXT = 'CONSTANT formulas';
var UTIL_TEXT = 'UTILITIES formulas';
var ROWTOTALS_TEXT = 'ROWTOTAL formula';
var BRAILLEMORSE_TEXT = 'BRAILLE & MORSE formulas';
var JS_TEXT = 'JAVASCRIPT formulas';
var FORMULAS_TEXT = 'Formulas';
var LEVENSHTEIN_TEXT = 'LEVENSHTEIN distance formula';
var WHATSNEW_TEXT = "What's new";
var PRIVACY_POLICY_TEXT = 'Privacy policy';
var STD_WIDTH = 645;
var STD_HEIGHT = 450;

/**
 * Adds menu item
 */
function onOpen(e) {
  var app = SpreadsheetApp.getUi();
  app
    .createAddonMenu()
    .addItem(MATRIX_TEXT, 'matrixInfo')
    .addItem(SQL_TEXT, 'sqlJoinsInfo')
    .addItem(CONST_TEXT, 'constantsInfo')
    .addItem(ROWTOTALS_TEXT, 'rowtotalsInfo')
    .addItem(BRAILLEMORSE_TEXT, 'braillemorseInfo')
    .addItem(LEVENSHTEIN_TEXT, 'levenshteinInfo')
    .addItem(JS_TEXT, 'jsInfo')
    .addItem(FORMULAS_TEXT, 'formulas')
    .addItem(UTIL_TEXT, 'utilInfo')
    .addSeparator()
    .addItem(WHATSNEW_TEXT, 'whatsnewInfo')
    .addItem(PRIVACY_POLICY_TEXT, 'privacypolicyInfo')
    .addToUi();
}

/**
 * Runs when installed
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * The best way to create a modal window with description of module is create a html file with markdown content.
 * Naming convention. Please, create the file name with '.MD' suffix. Example "10. MATRIX.gs" "10. MATRIX.MD.html"
 */

/**
 * Opens dialog for MATRIX custom formula
 */
function matrixInfo() {
  showDialog(include_('10. MATRIX.MD'), MATRIX_TEXT, STD_WIDTH, STD_HEIGHT);
}

/**
 * Opens dialog for SQL JOINS custom formula
 */
function sqlJoinsInfo() {
  showDialog(include_('11. SQLJOINS.MD'), SQL_TEXT, STD_WIDTH, STD_HEIGHT);
}

/**
 * Opens dialog for Constant custom formula
 */
function constantsInfo() {
  showDialog(include_('12. CONSTANTS.MD'), CONST_TEXT, STD_WIDTH, 500);
}

/**
 * Opens dialog for Utilities custom formula
 */
function utilInfo() {
  showDialog(include_('13. UTILITIES.MD'), UTIL_TEXT, STD_WIDTH, 550);
}

/**
 * Opens dialog for ROW Totals custom formula
 */
function rowtotalsInfo() {
  showDialog(include_('17. ROWTOTALS.MD'), ROWTOTALS_TEXT, STD_WIDTH, 530);
}

/**
 * Opens dialog for the Morse code converter custom formula
 */
function braillemorseInfo() {
  showDialog(
    include_('14. BRAILLEMORSE.MD'),
    BRAILLEMORSE_TEXT,
    STD_WIDTH,
    530
  );
}

/**
 * Opens dialog for the Levenshtein distance custom formula
 */
function levenshteinInfo() {
  showDialog(include_('18. LEVENSHTEIN.MD'), LEVENSHTEIN_TEXT, STD_WIDTH, 350);
}

/**
 * Opens dialog for the Java Script custom formulas
 */
function jsInfo() {
  showDialog(include_('19. JAVASCRIPT.MD'), JS_TEXT, STD_WIDTH, 350);
}

/**
 * Opens dialog for the Java Script custom formulas
 */
function formulas() {
  showDialog(includeMD_('80. FORMULAS.MD'), FORMULAS_TEXT, STD_WIDTH, 350);
}

/**
 * Opens dialog to present what's new
 */
function whatsnewInfo() {
  showDialog(include_('97. WHATSNEW.MD'), WHATSNEW_TEXT, STD_WIDTH, 500);
}

/**
 * Opens dialog for the privacy policy
 */
function privacypolicyInfo() {
  showDialog(
    include_('98. PRIVACY_POLICY.MD'),
    PRIVACY_POLICY_TEXT,
    STD_WIDTH,
    330
  );
}

/**
 * Opens a dialog
 */
function showDialog(markdown, title, width, height) {
  width = width || 645;
  height = height || 450;
  var html = HtmlService.createTemplateFromFile('03. DIALOG');
  html.markdown = markdown;
  SpreadsheetApp.getUi().showModalDialog(
    html
      .evaluate()
      .setWidth(width)
      .setHeight(height),
    title
  );
}

/**
 * Returns content of a project file. The Best Practices https://developers.google.com/apps-script/guides/html/best-practices
 * @param {string} filename The file name.
 * @returns {string} The complete URL.
 * @private
 */
function include_(filename) {
  return HtmlService.createTemplateFromFile(filename)
    .evaluate()
    .getContent();
}

function includeMD_(filename) {
  var locale = Session.getActiveUserLocale();
  var htmlTemplate;
  try {
    var title = Utilities.formatString(
      '%s.%s.MD',
      filename.split(/\.md/i)[0],
      locale
    );
    htmlTemplate = HtmlService.createTemplateFromFile(title);
  } catch (err) {
    htmlTemplate = HtmlService.createTemplateFromFile(filename);
  }
  return htmlTemplate.evaluate().getContent();
}
