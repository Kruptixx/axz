const fs = require('fs');
const path = require('path');
const langFilePath = path.join(__dirname, 'en.lang');
const standartLang = JSON.parse(fs.readFileSync(langFilePath, 'utf8'));

module.exports.getPhrase = (phrase, lang) => {
  let errorMessage = 'ERROR: PHRASE N/A';
  let currentLang;

  try {
    currentLang = JSON.parse(fs.readFileSync(`./lang/${lang}.lang`, 'utf8'));
  } catch (err) {
    //log about error
    currentLang = standartLang;
  }

  return currentLang[phrase] || standartLang[phrase] || errorMessage;
};
