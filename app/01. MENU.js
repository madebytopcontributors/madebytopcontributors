'use strict';

/**
* globals
*/
var JJ = 'Jacob Jan Tuinstra';
var AL = 'Adam Lusk';

/**
* Adds menu item
*/
function onOpen(e) {
  SpreadsheetApp.getUi().createAddonMenu()
    .addItem('MATRIX', 'matrixInfo')
    .addItem('SQL JOINS', 'sqlJoinsInfo')
    .addItem('COLUMN TO LETTER', 'columnToLetterInfo')
    .addItem('LETTER TO COLUMN', 'letterToColumnInfo')
    .addToUi();
}

/**
* Runs when installed
*/
function onInstall(e) {
  onOpen(e);
}

/**
* Opens dialog for MATRIX custom formula
*/
function matrixInfo() {
  showDialog(JJ);
}

/**
* Opens dialog for SQL JOINS custom formula
*/
function sqlJoinsInfo() {
  showDialog(JJ);
}

/**
* Opens dialog for column to letter custom formula
*/
function columnToLetterInfo() {
  showDialog(AL);
}

/**
* Opens dialog for letter to column custom formula
*/
function letterToColumnInfo() {
  showDialog(AL);
}

/**
* Opens a dialog for SQL JOINS custom formulas
*/
function showDialog(name) {
  var html = HtmlService.createHtmlOutputFromFile('03. DIALOG')
    .setWidth(500)
    .setHeight(300);
  SpreadsheetApp.getUi().showModalDialog(html, 'Information');
}
