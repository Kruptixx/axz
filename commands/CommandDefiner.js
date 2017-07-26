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

const test = msg => {
  if (msg.author.id === config.authorid) {
    msg.channel.send(`TEST done`);
  } else {
    msg.channel.send(language.getPhrase('AvaliableCreator'));
  }
};

const author = (msg, _, fields) => {
  if (service.enoughArgs(fields.length - 1)) {
    msg.channel.send(packageData.author);
  } else {
    msg.channel.send(language.getHelpExample(commands.AUTHOR));
  }
};

const setGame = (msg, client, fields) => {
  if (msg.author.id === config.authorid) {
    if (service.enoughArgs(fields.length - 1, 1, 'max')) {
      client.user.setGame(
        msg.content.substr(
          config.prefix.length + commands.SETGAME.length + 1,
          msg.content.length - 1));
    } else {
      msg.channel.send(language.getHelpExample(commands.SETGAME, 'en', '*new game*'));
    }
  } else {
    msg.channel.send(language.getPhrase('AvaliableCreator'));
  }
};

const showRules = (msg, _, fields) => {
  if (service.enoughArgs(fields.length - 1)) {
    msg.member.send(
      `${language.getPhrase('RulesOf')} ***` +
      `${msg.guild.name}***\`\`\`${rules.rules.en}\`\`\``);
  } else {
    msg.channel.send(language.getHelpExample(commands.RULES));
  }
};

const weather = (msg, _, fields) => {
  const send = m => msg.reply(m);
  const sendError = (e) => msg.reply(language.getPhrase('NoWeather'));
  const sities = fields.slice(1);
  Promise.all(sities.map(getWeather))
  .then(p => p.map(formatWeatherOutput))
  .then(send)
  .catch(sendError);
};

const say = msg => {
  if (msg.author.id === config.authorid) {
    let strSay = msg.content.substr(
      config.prefix.length + commands.SAY.length + 1,
      msg.content.length - 1);
    msg.guild.defaultChannel.send(strSay);
  } else {
    msg.channel.send(language.getPhrase('AvaliableCreator'));
  }
};

const help = msg => {
  msg.channel.send(language.getPhrase('NotACommand'));
};

const commandsList = {
  [commands.TEST]: test,
  [commands.AUTHOR]: author,
  [commands.SETGAME]: setGame,
  [commands.RULES]: showRules,
  [commands.WEATHER]: weather,
  [commands.SAY]: say,
  [commands.HELP]: help
};

module.exports.commandParse = (msg, client) => {
  const pattern = new RegExp(
    '^PREFIX[a-zA-Zа-яА-ЯёЁ]'.replace(/PREFIX/, config.prefix), 'gi');
  if (pattern.test(msg.content)) {
    const fields = msg.content.toLowerCase().split(constants.SPACE);
    const command = fields[0].substr(config.prefix.length, fields[0].length - 1).toLowerCase();
    const action = commandsList[command];
    if (action) {
      action(msg, client, fields);
    } else {
      msg.channel.send(
        `${language.getPhrase('NACommand')}! ` +
        `${language.getPhrase('TypeWRT')} ***` +
        `${config.prefix}${commands.HELP}*** ` +
        language.getPhrase('ForInfo'));
    }
  }
};
