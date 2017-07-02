const fs = require('fs');
const path = require('path');
const _gnrlangName = 'en';
const langFilePath = path.join(__dirname, _gnrlangName + '.lang');
const standartLang = JSON.parse(fs.readFileSync(langFilePath, 'utf8'));
let currentLang = standartLang;

module.exports.Language = class {
  static setLanguage (_lang) {
    switch (_lang) {
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

  static getPhrase (_phrase) {
    if (currentLang.hasOwnProperty(_phrase) && currentLang !== standartLang) {
      return currentLang[_phrase];
    } else if (standartLang.hasOwnProperty(_phrase)) {
      return standartLang[_phrase];
    } else {
      return 'ERROR: PHRASE N/A';
    }
  }
};

module.exports.LanguageType = class {
  constructor (_currentLang, _generalLang) {
    this.currentLang = _currentLang;
    this.generalLang = _generalLang;
  }

  get GetLang () {
    return this.lang;
  }

  set SetCurrentLang (_value) {
    this.currentLang = _value;
  }

  set SetGeneralLang (_value) {
    this.generalLang = _value;
  }
};
