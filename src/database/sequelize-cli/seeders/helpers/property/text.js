const striptags = require('striptags');
const { decode } = require('html-entities');

function cleanText(text = '') {
  return decode(
    striptags(text)
  )
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeString(text = '') {

  return cleanText(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

module.exports = {
  cleanText,
  normalizeString,
};