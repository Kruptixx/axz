// *****************************************************
// Main part of Discord bot named axz / R<nd0m E40
// *****************************************************
const Discord = require('discord.js')
const config = require('./config.json')
const packageData = require('./package.json')
const constants = require('./misc/constants.json')
const rules = require('./misc/rules.json') // delete
const autoFunctions = require('./commands/AutoFunctions.js')
const commandDefiner = require('./commands/CommandDefiner.js')
const language = require('./lang/language.js')
const client = new Discord.Client()
// trash
var messagesThisSession = 0
const games = [
  'KRUPT·E DoubleX',
  '>|rnbf!++',
  '0K.ruptixx',
  'kwas w/ ♥',
  '༼ つ ◕_◕ ༽つ'
]

client.login(config.token)

client.once('ready', () => {
  console.log(
    `\x1b[32m${constants.STATUS}\x1b[0m${packageData.name} is ` +
      `\x1b[42malive\x1b[0m!\n${packageData.author} built me! [bld ` +
      `${packageData.version} | passed]`
  )
  client.user.setGame(games[Math.floor(Math.random() * 6)])
  // client.user.setStatus("online"); //online/offline/dnd/invisible
})

client.on('reconnecting', () => {
  console.log(
    `\x1b[32m${constants.STATUS}\x1b[0m"${packageData.name}" ` +
      `\x1b[42mreconnected\x1b[0m`
  )
})

client.on('disconnecting', () => {
  console.log(
    `\x1b[32m${constants.STATUS}\x1b[0m"${packageData.name}" ` +
      `\x1b[41mdisconnected\x1b[0m`
  )
})

client.on('message', message => {
  console.log(
    `\x1b[36m${constants.MESSAGEcnsl}\x1b[0m"${message.content}"` +
      ` /// Author: ` +
      `"(${message.author.id})${message.author.username}"`
  )
  messagesThisSession++
  if (message.content.startsWith(config.prefix)) {
    commandDefiner.CommandDefiner.commandParse(
      message,
      client,
      messagesThisSession
    )
  }
  autoFunctions.AutoFunctions.checkProfanity(message, client)
})

// client.on("messageUpdate", (oldMessage, newMessage) => {
//
// });

// client.on("guildMemberUpdate", (oldMember, newMember) => {
//
// });

client.on('presenceUpdate', (oldMember, newMember) => {
  let oldStatus = oldMember.presence.game !== null
    ? oldMember.presence.game.name
    : 'null'
  let newStatus = newMember.presence.game !== null
    ? newMember.presence.game.name
    : 'null'
  console.log(
    `\x1b[35m${constants.MEMBERcnsl}\x1b[0m"(${newMember.user.id}` +
      `)${newMember.user.username}" changed status from "${oldStatus}" ` +
      `to "${newStatus}"`
  )
  autoFunctions.AutoFunctions.checkStream(oldMember, newMember)
})

// client.on("userUpdate", (oldUser, newUser) => {
//
// });

client.on('guildMemberAdd', member => {
  console.log(
    `\x1b[35m${constants.USERcnsl}\x1b[0m**NEW** ` +
      `"(${member.user.id})${member.user.username}" has joined ` +
      `"${member.guild.name}"`
  )
  if (member.user.bot === false) {
    member.guild.defaultChannel.sendMessage(
      `${language.Language.getPhrase('WelcomeNewUser')}!\n${member.user} ` +
        `${language.Language.getPhrase('JoinedThisServer')}`
    )
    member.sendMessage(
      `${language.Language.getPhrase('RulesOf')} ***` +
        `${member.guild.name}***\`\`\`${rules.rules.en}\`\`\``
    )
  }
})

// set new game status every hour
setInterval(() => {
  if (new Date().getMinutes() === 0) {
    client.user.setGame(games[Math.floor(Math.random() * 6)])
  }
}, 60000)

// console logs with misc
client.on('error', e => console.error(e))
client.on('warn', e => console.warn(e))
client.on('debug', e => console.info(e))
