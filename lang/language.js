const fs = require("fs");
var _gnrlangName = "en"; // primary [general] language is eng
var standartLang = JSON.parse(fs.readFileSync(`./lang/${_gnrlangName}.lang`,
                              "utf8"));
var currentLang = standartLang;

module.exports.Language = class {

    static setLanguage(_lang) {
        switch (_lang) {
        case "ru":
            currentLang = JSON.parse(fs.readFileSync("./lang/ru.lang", "utf8"));
            break;
        case "de":
            currentLang = JSON.parse(fs.readFileSync("./lang/de.lang", "utf8"));
            break;
        case "en":
            currentLang = JSON.parse(fs.readFileSync("./lang/en.lang", "utf8"));
            break;
        default: case _gnrlangName:
            currentLang = standartLang;
        }
    }

    static getPhrase(_phrase) {
        if (currentLang.hasOwnProperty(_phrase) && currentLang !== standartLang) {
            return currentLang[_phrase];
        } else if (standartLang.hasOwnProperty(_phrase)) {
            return standartLang[_phrase];
        } else {
            return "ERROR: PHRASE N/A";
        }
    }
};


// self.class.prototype of current language
// gonna be added later
module.exports.LanguageType = class {

    constructor(_currentLang, _generalLang) {
        this.currentLang  = _currentLang;
        this.generalLang  = _generalLang;
    }

    // gets only current lang
    get GetLang() {
        return this.lang;
    }
    set SetCurrentLang(_value) {
        this.currentLang = _value;
    }
    set SetGeneralLang(_value) {
        this.generalLang = _value;
    }

    GetPhrase(_phrase) {

    }

    _switchlang(_lang) {

    }
};
