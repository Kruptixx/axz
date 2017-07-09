const constants = require('../misc/constants.json');
const config = require('../config.json');
const packageData = require('../package.json');
const commands = require('./commands.json');
const service = require('../main/service.js');
const language = require('../lang/language.js');
const getWeather = require('./weather').getWeather;
const formatWeatherOutput = require('./weather').formatWeatherOutput;
// trash
const rules = require('../misc/rules.json');

module.exports.commandParse = (msg, client) => {
  let fields = msg.content.toLowerCase().split(constants.SPACE);
  let pattern = new RegExp(
    '^PREFIX[a-zA-Zа-яА-ЯёЁ]'.replace(/PREFIX/, config.prefix), 'gi');
  if (pattern.test(fields[0])) {
    switch (fields[0]
      .substr(config.prefix.length, fields[0].length - 1)
      .toLowerCase()) {
      case commands.TEST:
        if (msg.author.id === config.authorid) {
          msg.channel.send(`TEST done`);
        } else {
          msg.channel.send(`${language.getPhrase('AvaliableCreator')}`);
        }
        break;
      case commands.AUTHOR:
        if (service.enoughArgs(fields.length - 1)) {
          msg.channel.send(packageData.author);
        } else {
          msg.channel.send(language.getHelpExample(commands.AUTHOR));
        }
        break;
      case commands.SETGAME:
        if (msg.author.id === config.authorid) {
          if (service.enoughArgs(fields.length - 1, 1, 'max')) {
            client.user.setGame(
              msg.content.substr(
                config.prefix.length + commands.SETGAME.length + 1,
                msg.content.length - 1));
          } else {
            msg.channel.send(
              language.getHelpExample(commands.SETGAME, 'en', '*new game*'));
          }
        } else {
          msg.channel.send(`${language.getPhrase('AvaliableCreator')}`);
        }
        break;
      case commands.RULES:
        if (service.enoughArgs(fields.length - 1)) {
          msg.member.send(
            `${language.getPhrase('RulesOf')} ***` +
            `${msg.guild.name}***\`\`\`${rules.rules.en}\`\`\``);
        } else {
          msg.channel.send(language.getHelpExample(commands.RULES));
        }
        break;
      case commands.RULESTO:
        break;
      case commands.WEATHER:
        const send = m => msg.reply(m);
        const sendError = (e) => msg.reply('Weather forecast not found');
        const sities = fields.slice(1);
        Promise.all(sities.map(getWeather))
        .then(p => p.map(formatWeatherOutput))
        .then(send)
        .catch(sendError);
        break;
      case commands.SAY:
        if (msg.author.id === config.authorid) {
          let strSay = msg.content.substr(
            config.prefix.length + commands.SAY.length + 1,
            msg.content.length - 1);
          msg.guild.defaultChannel.send(strSay);
        } else {
          msg.channel.send(`${language.getPhrase('AvaliableCreator')}`);
        }
        break;
      case commands.HELP:
        if (service.enoughArgs(fields.length - 1, 1)) {
          switch (fields[1]) {
            case commands.SAY:
              break;
            case commands.WEATHER:
              break;
            case commands.RULES:
              break;
            case commands.RULESTO:
              break;
            case commands.MAXZ:
              break;
            case commands.AUTHOR:
              break;
            case undefined:
              // general info about all commands
              break;
            default:
              msg.channel.send(language.getPhrase('NotACommand'));
          }
        }
        break;
      default:
        msg.channel.send(
          `${language.getPhrase('NACommand')}! ` +
          `${language.getPhrase('TypeWRT')} ***` +
          `${config.prefix}${commands.HELP}*** ` +
          `${language.getPhrase('ForInfo')}`);
    }
  }
};
