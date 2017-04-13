const constants = require("../misc/constants.json");
const config = require("../config.json");
const commands = require("./commands.json");
const rules = require("../misc/rules.json");

module.exports.CommandDefiner = class {

    static commandParse(_msg, _client, _msgSession) {
        let fields = _msg.content.toLowerCase().split(constants.SPACE);
        // fields[0] - command
        // fields[1] - main parameter (not requared)
        // fields[2+] - additional parameters
        let pattern = new RegExp("^PREFIX[a-zA-Zа-яА-ЯёЁ]".replace(/PREFIX/,
                                 config.prefix), "gi");
        if (pattern.test(fields[0])) {
            switch(fields[0].substr(config.prefix.length,
                   fields[0].length - 1).toLowerCase()) {
            case commands.TEST: //this.Commands.TEST
                if (enoughArgs(fields.length - 1) && _msg.author.id === config.authorid) {
                    _msg.channel.sendMessage("Tested! Short info of ***" +
                    config.fullname + "***```Status:\nconnected\nbuild passed\n" + config.version + "\ncurrent prefix - " +
                    config.prefix + "\nmessages this session - " +
                    _msgSession + "```");
                } else {
                    _msg.channel.sendMessage("Avaliable only for creator - <@!" + config.authorid + ">");
                }
                break;
            case commands.AUTHOR:
                if (enoughArgs(fields.length - 1)) {
                    _msg.channel.sendMessage(config.author);
                } else {
                    _msg.channel.sendMessage("Example command (no args avaliable)```!!author```");
                }
                break;
            case commands.SETGAME:
                if (_msg.author.id === config.authorid) {
                    _client.user.setGame(_msg.content.substr(config.prefix.length + commands.SETGAME.length + 1, _msg.content.length - 1));
                } else {
                    _msg.channel.sendMessage("Avaliable only for creator - <@!" + config.authorid + ">");
                }
                break;
            case commands.PLAYERS: // special mentions searcher
                if (enoughArgs(fields.length - 1, 1)) {
                    if ((_msg.mentions.roles.array().length === 1) && (_msg.mentions.everyone === false)) {
                        if (_msg.mentions.roles.first().hoist === false) {
                            _msg.channel.sendMessage("Last mentions:\n" +
                            lastMentions(_msg.mentions.roles.first(),
                                         _msg.channel));
                        }
                    }
                } else {
                    _msg.channel.sendMessage("Example command```!!players @game```");
                }
                break;
            case commands.RULES:
                if (enoughArgs(fields.length - 1)) {
                    _msg.member.sendMessage("Rules of ***" + _msg.guild.name +
                                            "***```" + rules.rules.en + "```");
                } else {
                    _msg.channel.sendMessage("Example command (no args avaliable)```!!rules```");
                }
                break;
            case commands.RULESTO:
                // dont work for @here
                // removed for remaking
                break;
            case commands.ROBOT:
                let str = "";
                let strBin = "";
                str = _msg.content.substr(config.prefix.length + commands.SAY.length + 1, _msg.content.length - 1);
                for (let i = 0; i < str.length; ++i) {
                    strBin += str[i].charCodeAt(0).toString(2);
                }
                if (strBin.length < 2000) {
                    _msg.channel.sendMessage(strBin);
                }
                break;
            case commands.SAY:
                str = "";
                str = _msg.content.substr(config.prefix.length + commands.SAY.length + 1, _msg.content.length - 1);
                _msg.guild.defaultChannel.sendMessage(str);
                break;
            case commands.HELP:
                // work in progress
                break;
            default:
                _msg.channel.sendMessage("No avaliable command! Type ***!!help*** for info");
            }
        }

        function enoughArgs(_curNumber, _maxNumber = 0) {
            if (_curNumber !== _maxNumber) {
                return false;
            }
            return true;
        }

        function lastMentions(_thing, _channel, _times = 10) {
            let timesCounter = 0;
            let str = "";
            // if (channel.messages !== null)
            for (let i = 1; i < _channel.messages.array().length; ++i) {
                console.log(_channel.messages.array().length);
                if (timesCounter < _times) {
                    console.log(timesCounter);
                    if (typeof thing === typeof _msg.guild.roles.first()) {
                        console.log(typeof thing === typeof _msg.guild.roles.first());
                        if ((_channel.messages.array()[i].mentions.roles.get(_thing.id) === _thing) &&
                         (_channel.messages.array()[i].author.id !== _client.user.id)) {
                            str += "Author: " +
                            _channel.messages.array()[i].author + " | Date: " +
                            _channel.messages.array()[i].createdAt.toDateString() +
                            "\n";
                            timesCounter++;
                            continue;
                        }
                        continue;
                    }
                    if (typeof thing === typeof _msg.guild.users.first()) {
                        if ((_channel.messages.array()[i].mentions.users.get(_thing.id) === _thing) &&
                         (_channel.messages.array()[i].author.id !== _client.user.id)) {
                            str += "Author: " +
                            _channel.messages.array()[i].author + " | Date: " +
                            _channel.messages.array()[i].createdAt.toDateString() +
                            "\n";
                            timesCounter++;
                        }
                    }
                } else {
                    return str;
                }
            }
            if (str !== "") {
                return str;
            }
            return "No matches";
        }
    }
};
