// *****************************************************
// Main part of Discord bot named axz
// *****************************************************
const Discord = require("discord.js");
const config = require("./config.json");
const constants = require("./misc/constants.json");
const autoFunctions = require("./commands/AutoFunctions.js");
const commandDefiner = require("./commands/CommandDefiner.js");
const client = new Discord.Client();
//module.exports.client;

client.login(config.token);

client.on("ready", () => {
    console.log(constants.STATUS + config.name + " is alive!" + "\n" + config.author + " built me! [bld " + config.version + " | passed]");
    client.user.setGame("govnokod for everyone");
    //client.user.setStatus("online"); //online/offline/dnd/invisible
});

client.on("reconnecting", () => {
    console.log(constants.STATUS + config.name + " reconnected");
});

client.on("disconnecting", () => {
    console.log(constants.STATUS + config.name + " disconnected");
});

client.on("message", (message) => {
    console.log(message.content);
    commandDefiner.CommandDefiner.commandParse(message, client);
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
