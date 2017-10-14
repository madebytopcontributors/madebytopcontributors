'use strict';

/**
* globals
*/

var MATRIX_TEXT  = 'MATRIX formula';
var SQL_TEXT = 'SQL Joins formula';
var PRIVACY_POLICY_TEXT = 'Privacy policy';
var STD_WIDTH = 645;
var STD_HEIGHT = 450;

/**
* Adds menu item 
*/
function onOpen(e) {
  SpreadsheetApp.getUi().createAddonMenu()
  .addItem(MATRIX_TEXT, 'matrixInfo')
  .addItem(SQL_TEXT, 'sqlJoinsInfo')
  .addSeparator()
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
* Opens dialog for the privacy policy JOINS custom formula
*/
function privacypolicyInfo() {
  showDialog(include_('98. PRIVACY_POLICY.MD'), PRIVACY_POLICY_TEXT, STD_WIDTH, STD_HEIGHT);
}

/**
* Opens a dialog for SQL JOINS custom formulas
*/
function showDialog(markdown, title, width, height) {
  width = width || 645;
  height = height || 450;
  var html = HtmlService.createTemplateFromFile('03. DIALOG');
  html.markdown = markdown;
  SpreadsheetApp.getUi().showModalDialog(html.evaluate().setWidth(width).setHeight(height), title);
}

/**
* Returns content of a project file. The Best Practices https://developers.google.com/apps-script/guides/html/best-practices
* @param {string} filename The file name.
* @returns {string} The complete URL.
* @private
*/
function include_(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent();
}