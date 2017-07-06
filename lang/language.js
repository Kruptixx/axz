const fs = require('fs');
const path = require('path');
const langFilePath = path.join(__dirname, 'en.lang');
const standartLang = JSON.parse(fs.readFileSync(langFilePath, 'utf8'));

const defaultError = 'ERROR: PHRASE N/A';

module.exports.errorMessage = defaultError;

module.exports.getPhrase = (phrase, lang, errorMessage = defaultError) => {
  let currentLang;

  try {
    currentLang = JSON.parse(fs.readFileSync(`./lang/${lang}.lang`, 'utf8'));
  } catch (error) {
    console.error(error);
    currentLang = standartLang;
  }

  return currentLang[phrase] || errorMessage;
};
