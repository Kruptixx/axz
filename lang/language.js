const prefix = require('../config.json').prefix;
const stdLang = require('../config.json').standartLanguage;
const constants = require('../misc/constants.json');

const fs = require('fs');
const path = require('path');
const langFilePath = path.join(__dirname, `${stdLang}.lang`);
const standartLang = JSON.parse(fs.readFileSync(langFilePath, 'utf8'));


const getPhrase = (phrase, lang = stdLang) => {
  let currentLang;

  try {
    currentLang = JSON.parse(fs.readFileSync(`./lang/${lang}.lang`, 'utf8'));
  } catch (err) {
    //log about error
    currentLang = standartLang;
  }

  return currentLang[phrase] || standartLang[phrase] || constants.ERRORmsg;
};

const getHelpExample = (commandName, lang = stdLang,
                                 args = null) => {

  return getPhrase('ExampleCommand', lang) +
    ((args === null || args === undefined) ?
        ` (${getPhrase('NoArgs', lang)})` : '') +
    `\`\`\`${prefix}${commandName} ${args || ''}\`\`\``
};

module.exports = {
  getPhrase,
  getHelpExample
};
