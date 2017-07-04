const fs = require('fs');
const path = require('path');
const langFilePath = path.join(__dirname, 'en.lang');
const standartLang = JSON.parse(fs.readFileSync(langFilePath, 'utf8'));
const defaultErrorMessage = 'ERROR: PHRASE N/A';

let currentLang = standartLang;

module.exports.errorMessage = defaultErrorMessage;

module.exports.getPhrase = (phrase, errorMessage = defaultErrorMessage) => {
  if (currentLang !== standartLang) {
    return currentLang[phrase] || errorMessage;
  } else {
    return standartLang[phrase] || errorMessage;
  }
};
