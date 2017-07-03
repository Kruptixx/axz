const fs = require('fs');
const path = require('path');
const _gnrlangName = 'en';
const langFilePath = path.join(__dirname, _gnrlangName + '.lang');
const standartLang = JSON.parse(fs.readFileSync(langFilePath, 'utf8'));
let currentLang = standartLang;

module.exports.Language = class {
  static setLanguage (lang) {
    switch (lang) {
      case 'ru':
        currentLang = JSON.parse(fs.readFileSync('./lang/ru.lang', 'utf8'));
        break;
      case 'de':
        currentLang = JSON.parse(fs.readFileSync('./lang/de.lang', 'utf8'));
        break;
      case 'en':
      default:
        currentLang = JSON.parse(fs.readFileSync('./lang/en.lang', 'utf8'));
    }
  }

  static getPhrase (phrase) {
    if (currentLang.hasOwnProperty(phrase) && currentLang !== standartLang) {
      return currentLang[phrase];
    } else if (standartLang.hasOwnProperty(phrase)) {
      return standartLang[phrase];
    } else {
      return 'ERROR: PHRASE N/A';
    }
  }
};

module.exports.LanguageType = class {
  constructor (currentLang, generalLang) {
    this.currentLang = currentLang;
    this.generalLang = generalLang;
  }

  get GetLang () {
    return this.lang;
  }

  set SetCurrentLang (lang) {
    this.currentLang = lang;
  }

  set SetGeneralLang (lang) {
    this.generalLang = lang;
  }
};
