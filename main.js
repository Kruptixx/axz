// *****************************************************
// Main part of Discord bot named axz
// *****************************************************
const Discord = require("discord.js");
const config = require("./config.json");
const constants = require("./misc/constants.json");
const coms = require("./commands/commands.json");
const autoFunctions = require("./commands/AutoFunctions.js");
const commandDefiner = require("./commands/CommandDefiner.js");
const client = new Discord.Client();
// module.exports.client;

client.login(config.token);

client.on("ready", () => {
    console.log(constants.STATUS + config.name + " is alive!" + "\nKruptixx built me! [bld 0.1b | passed]");
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
    message.channel.sendMessage(commandDefiner.CommandDefiner.commandParse(message.content));
    if (message.content.startsWith(config.prefix + coms.RULES))
        message.member.sendMessage("There's no rules for you! Do what you want and be free!");
    if (message.content.startsWith(config.prefix + coms.RULESTO)) {
        let msg = "";
        let fields = message.content.split(constants.SPACE);
        for (let i = 2; i < fields.length; ++i)
            msg += fields[i] + " ";
        if (msg != "")
            msg += "// ";
        if (message.mentions != null) {
            message.guild.member(message.mentions.users.first()).user.sendMessage(msg + "There's no rules for you! Do what you want and be free!");
        } else {
            message.channel.sendMessage("No user found");
        }
    }
    autoFunctions.AutoFunctions.checkProfanity(message);
});

//client.on("messageUpdate", (oldMessage, newMessage) => {
//
//});

//client.on("guildMemberUpdate", (oldMember, newMember) => {
//
//});

client.on("presenceUpdate", (oldMember, newMember) => {
    let str1 = oldMember.presence.game !== null ? oldMember.presence.game.name : "null";
    let str2 = newMember.presence.game !== null ? newMember.presence.game.name : "null";
    console.log("updated guild " + newMember.user + "\n" + str1 + " | " + str2);
    console.log(newMember.guild.defaultChannel.toString());
    
    autoFunctions.AutoFunctions.checkStream(oldMember, newMember);
});

// client.on("userUpdate", (oldUser, newUser) => {
//
// });
