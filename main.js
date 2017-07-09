const Discord = require('discord.js');
const config = require('./config.json');
const packageData = require('./package.json');
const constants = require('./misc/constants.json');
const autoFunctions = require('./commands/AutoFunctions.js');
const commandDefiner = require('./commands/CommandDefiner.js');
const language = require('./lang/language.js');

const winston = require('winston');

const fs = require('fs');
const env = process.env.NODE_ENV || 'production';
const logDir = 'logs';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const tsFormat = () => (new Date()).toLocaleTimeString();

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: env === 'development' ? 'debug' : 'info'
    }),
    new (require('winston-daily-rotate-file'))({
      filename: `${logDir}/.log`,
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      level: env === 'development' ? 'debug' : 'info'
    })
  ]
});

let client = new Discord.Client();
// trash
const rules = require('./misc/rules.json');
const games = ['KRUPT·E DoubleX', '>|rnbf!++', '0K.ruptixx', 'kwas w/ ♥',
  '༼ つ ◕_◕ ༽つ'];

client.login(config.token);

client.once('ready', () => {
  logger.info(`${packageData.name} is ready!`);
  logger.info(
    `${packageData.author} built me! [bld ` +
    `${packageData.version} | passed]`);
  client.user.setGame(games[Math.floor(Math.random() * 6)]);
});

client.on('reconnecting', () => {
  logger.info(
    `\x1b[32m${constants.STATUS}\x1b[0m"${packageData.name}" ` +
    `\x1b[42mreconnected\x1b[0m`);
});

client.on('disconnecting', () => {
  logger.info(
    `\x1b[32m${constants.STATUS}\x1b[0m"${packageData.name}" ` +
    `\x1b[41mdisconnected\x1b[0m`);
});

client.on('message', message => {
  logger.info(
    `\x1b[36m${constants.MESSAGEcnsl}\x1b[0m"${message.content}"` +
    ` /// Author: ` +
    `"(${message.author.id})${message.author.username}"`);

  if (message.content.startsWith(config.prefix)) { commandDefiner.commandParse(message, client); }
  if (!message.author.bot) { autoFunctions.checkProfanity(message); }
});

client.on('presenceUpdate', (oldMember, newMember) => {
  let oldStatus = oldMember.presence.game !== null
    ? oldMember.presence.game.name
    : 'null';
  let newStatus = newMember.presence.game !== null
    ? newMember.presence.game.name
    : 'null';
  logger.info(
    `\x1b[35m${constants.MEMBERcnsl}\x1b[0m"(${newMember.user.id}` +
    `)${newMember.user.username}" changed status from "${oldStatus}" ` +
    `to "${newStatus}"`);
  autoFunctions.checkStream(oldMember, newMember);
});

client.on('guildMemberAdd', member => {
  logger.info(
    `\x1b[35m${constants.USERcnsl}\x1b[0m**NEW** ` +
    `"(${member.user.id})${member.user.username}" has joined ` +
    `"${member.guild.name}"`);
  if (member.user.bot === false) {
    const welcome = language.getPhrase('WelcomeNewUser');
    const joined = language.getPhrase('JoinedThisServer');
    member.guild.defaultChannel.send(`${welcome}!\n${member.user} ${joined}`);
    member.send(
      `${language.getPhrase('RulesOf')} ***` +
      `${member.guild.name}***\`\`\`${rules.rules.en}\`\`\``);
  }
});

setInterval(() => {
  if (new Date().getMinutes() === 0) {
    client.user.setGame(games[Math.floor(Math.random() * 6)]);
  }
}, 60000);

client.on('error', e => logger.error(e));
client.on('warn', w => logger.warn(w));
if (env === 'development') {
  client.on('debug', d => logger.debug(d));
}

module.exports.logger = logger;
