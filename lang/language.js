const fs = require('fs');
const path = require('path');
const langFilePath = path.join(__dirname, 'en.lang');
const standartLang = JSON.parse(fs.readFileSync(langFilePath, 'utf8'));
const constants = require('../misc/constants.json');

module.exports.getPhrase = (phrase, lang) => {
  let currentLang;

  try {
    currentLang = JSON.parse(fs.readFileSync(`./lang/${lang}.lang`, 'utf8'));
  } catch (err) {
    //log about error
    currentLang = standartLang;
  }

  return currentLang[phrase] || standartLang[phrase] || constants.ERRORmsg;
};
