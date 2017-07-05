const constants = require('../misc/constants.json');
const config = require('../config.json');
const packageData = require('../package.json');
const commands = require('./commands.json');
const rules = require('../misc/rules.json');
const language = require('../lang/language.js');
const getWeather = require('./weather').getWeather;

const enoughArgs = (amount, expected = 0) => amount === expected;

module.exports.commandParse = (msg, client) => {
  let fields = msg.content.toLowerCase().split(constants.SPACE);
  let pattern = new RegExp(
    '^PREFIX[a-zA-Zа-яА-ЯёЁ]'.replace(/PREFIX/, config.prefix),
    'gi'
  );
  if (pattern.test(fields[0])) {
    switch (fields[0]
      .substr(config.prefix.length, fields[0].length - 1)
      .toLowerCase()) {
      case commands.AUTHOR:
        if (enoughArgs(fields.length - 1)) {
          msg.channel.sendMessage(packageData.author);
        } else {
          msg.channel.sendMessage(
            `${language.getPhrase('ExampleCommand')} (` +
            `${language.getPhrase('NoArgs')})` +
            `\`\`\`${config.prefix}${commands.AUTHOR}\`\`\``
          );
        }
        break;
      case commands.SETGAME:
        if (msg.author.id === config.authorid) {
          client.user.setGame(
            msg.content.substr(
              config.prefix.length + commands.SETGAME.length + 1,
              msg.content.length - 1
            )
          );
        } else {
          msg.channel.sendMessage(
            `${language.getPhrase('AvaliableCreator')}`
          );
        }
        break;
      case commands.RULES:
        if (enoughArgs(fields.length - 1)) {
          msg.member.sendMessage(
            `${language.getPhrase('RulesOf')} ***` +
            `${msg.guild.name}***\`\`\`${rules.rules.en}\`\`\``
          );
        } else {
          msg.channel.sendMessage(
            `${language.getPhrase('ExampleCommand')} (` +
            `${language.getPhrase('NoArgs')})` +
            `\`\`\`${config.prefix}${commands.RULES}\`\`\``
          );
        }
        break;
      case commands.RULESTO:
        break;
      case commands.WEATHER:
        const send = m => msg.reply(JSON.stringify(m));
        const sendError = (e) => msg.reply('Weather forecast not found');
        const sities = fields.slice(1);
        Promise.all(sities.map(getWeather))
        .then(send)
        .catch(sendError);
        break;
      case commands.SAY:
        let strSay = msg.content.substr(
          config.prefix.length + commands.SAY.length + 1,
          msg.content.length - 1
        );
        msg.guild.defaultChannel.sendMessage(strSay);
        break;
      case commands.HELP:
        if (enoughArgs(fields.length - 1, 1)) {
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
                `${language.getPhrase('NotACommand')}`
              );
          }
        }
        // TODO
        break;
      default:
        msg.channel.sendMessage(
          `${language.getPhrase('NACommand')}! ` +
          `${language.getPhrase('TypeWRT')} ***` +
          `${config.prefix}${commands.HELP}*** ${language.getPhrase(
            'ForInfo'
          )}`
        );
    }
  }
};
