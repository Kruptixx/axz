// *****************************************************
// Main part of Discord bot named axz
// *****************************************************
const Discord = require("discord.js");
const config = require("./config.json");
const constants = require("./misc/constants.json");
const rules = require("./misc/rules.json");
const autoFunctions = require("./commands/AutoFunctions.js");
const commandDefiner = require("./commands/CommandDefiner.js");
const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");
const client = new Discord.Client();
var messagesThisSession = 0;
//module.exports.client;

client.login(config.token);

client.on("ready", () => {
    console.log(`\x1b[32m${constants.STATUS}\x1b[0m${config.name} is ` +
                `alive!\n${config.author} built me! [bld ${config.version} |` +
                ` passed]`);
    client.user.setGame("govnokod for everyone");
    //client.user.setStatus("online"); //online/offline/dnd/invisible
});

client.on("reconnecting", () => {
    console.log(`\x1b[32m${constants.STATUS}\x1b[0m"${config.name}" ` +
                `\x1b[42mreconnected\x1b[0m`);
});

client.on("disconnecting", () => {
    console.log(`\x1b[32m${constants.STATUS}\x1b[0m"${config.name}" ` +
                `\x1b[41mdisconnected\x1b[0m`);
});

client.on("message", (message) => {
    console.log(`\x1b[36m${constants.MESSAGEcnsl}\x1b[0m"${message.content}"` +
                ` /// Author: ` +
                `"(${message.author.id})${message.author.username}"`);
    messagesThisSession++;
    if (!message.content.startsWith(prefix)) {
        commandDefiner.CommandDefiner.commandParse(message, client, messagesThisSession);
    }
    autoFunctions.AutoFunctions.checkProfanity(message, client);
});

// client.on("messageUpdate", (oldMessage, newMessage) => {
//
// });

// client.on("guildMemberUpdate", (oldMember, newMember) => {
//
// });

client.on("presenceUpdate", (oldMember, newMember) => {
    autoFunctions.AutoFunctions.checkStream(oldMember, newMember);
});

// client.on("userUpdate", (oldUser, newUser) => {
//
// });

client.on("guildMemberAdd", (member) => {
    console.log(`\x1b[35m${constants.USERcnsl}\x1b[0m**NEW** ` +
                `"(${member.user.id})${member.user.username}" has joined ` +
                `"${member.guild.name}"`);
    if (member.user.bot === false) {
        member.guild.defaultChannel.sendMessage(`Welcome new user!\n` +
                                                `${member.user} has ` +
                                                `joined this server`);
        member.sendMessage("Rules of ***" + member.guild.name +
                            "***```" + rules.rules.en + "```");
    }
});

client.on('error', (e) => console.error(e));
client.on('warn', (e) => console.warn(e));
client.on('debug', (e) => console.info(e));
