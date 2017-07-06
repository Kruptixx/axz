const constants = require('../misc/constants.json');
const config = require('../config.json');
const packageData = require('../package.json');
const commands = require('./commands.json');
const rules = require('../misc/rules.json');
const service = require('../main/service.js');
const language = require('../lang/language.js');
const getWeather = require('./weather').getWeather;
const formatWeatherOutput = require('./weather').formatWeatherOutput;

module.exports.commandParse = (msg, client) => {
  let fields = msg.content.toLowerCase().split(constants.SPACE);
  let pattern = new RegExp(
    '^PREFIX[a-zA-Zа-яА-ЯёЁ]'.replace(/PREFIX/, config.prefix),'gi');
  if (pattern.test(fields[0])) {
    switch (fields[0]
      .substr(config.prefix.length, fields[0].length - 1)
      .toLowerCase()) {
      case commands.AUTHOR:
        if (service.enoughArgs(fields.length - 1)) {
          msg.channel.sendMessage(packageData.author);
        } else {
          msg.channel.sendMessage(
            `${language.getPhrase('ExampleCommand')} (` +
            `${language.getPhrase('NoArgs')})` +
            `\`\`\`${config.prefix}${commands.AUTHOR}\`\`\``);
        }
        break;
      case commands.SETGAME:
        if (msg.author.id === config.authorid) {
          if (service.enoughArgs(fields.length - 1, 1, 'inf')) {
            client.user.setGame(
              msg.content.substr(
                config.prefix.length + commands.SETGAME.length + 1,
                msg.content.length - 1));
          } else {
            msg.channel.sendMessage(
              `${language.getPhrase('ExampleCommand')}` +
              `\`\`\`${config.prefix}${commands.SETGAME} *new game*\`\`\``);
          }
        } else {
          msg.channel.sendMessage(
            `${language.getPhrase('AvaliableCreator')}`);
        }
        break;
      case commands.RULES:
        if (service.enoughArgs(fields.length - 1)) {
          msg.member.sendMessage(
            `${language.getPhrase('RulesOf')} ***` +
            `${msg.guild.name}***\`\`\`${rules.rules.en}\`\`\``);
        } else {
          msg.channel.sendMessage(
            `${language.getPhrase('ExampleCommand')} (` +
            `${language.getPhrase('NoArgs')})` +
            `\`\`\`${config.prefix}${commands.RULES}\`\`\``);
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
        let strSay = msg.content.substr(
          config.prefix.length + commands.SAY.length + 1,
          msg.content.length - 1);
        msg.guild.defaultChannel.sendMessage(strSay);
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
            case commands.AUTHOR:
              break;
            default:
              msg.channel.sendMessage(
                `${language.getPhrase('NotACommand')}`);
          }
        }
        // TODO
        break;
      default:
        msg.channel.sendMessage(
          `${language.getPhrase('NACommand')}! ` +
          `${language.getPhrase('TypeWRT')} ***` +
          `${config.prefix}${commands.HELP}***` +
          ` ${language.getPhrase('ForInfo')}`);
    }
  }
};
