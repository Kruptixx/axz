const config = require("../config.json");
const profanity = require("../misc/profanity.json");
const rules = require("../misc/rules.json");
const service = require("../main/service.js");

module.exports.AutoFunctions = class {

    static checkProfanity(_msg, _client) {
        function _setLang(_lang) {
            for (let i = 0; i < _lang.length; ++i) {
                let patternStr = "(^|[0-9\\-!\\$%№\\^\\&\\*\\(\\)_\\+\\|~\\\"=\\\'`\\{\\}\\[\\]:/;\\<\\>\\?,\\.@#]|\\s)SAMPLE([0-9\\-!\\$%№\\^\\&\\*\\(\\)_\\+\\|~\\\"=\\\'`\\{\\}\\[\\]:/;\\<\\>\\?,\\.@#\\s]|$)";
                let pattern = new RegExp(patternStr.replace(/SAMPLE/,
                     _lang[i]), "g"); // "gi"
                if (pattern.test(_msg.content.toLowerCase())) {
                    _msg.channel.sendMessage("Profanity!\nPerpetrator: " +
                    _msg.author + " | Time: " + _msg.createdAt +
                    " | Reason word: " + _lang[i]);
                    return;
                }
            }
        }

        if ((_msg.author.id !== _client.user.id) &&
            (_msg.author.bot === false)) {
            // *** ENG WORDS PROFANITY ***
            _setLang(profanity.profanity.en);
            // *** RUS WORDS PROFANITY ***
            _setLang(profanity.profanity.ru);
            // *** GER WORDS PROFANITY ***
            _setLang(profanity.profanity.de);
            // *** FRA WORDS PROFANITY ***
            _setLang(profanity.profanity.fr);
            // *** SPA WORDS PROFANITY ***
            _setLang(profanity.profanity.es);
        }
    }

    static checkStream(_oldMember, _newMember) {
        if ((_newMember.presence.game !== null) &&
            (_newMember.user.bot === false) &&
            (_oldMember.presence.game !== _newMember.presence.game) &&
            (_newMember.presence.game.streaming === true)) {
            try {
                _newMember.guild.defaultChannel.sendMessage("@here\n***STREAM***\n\n" +
                    _newMember.user + " just started streaming *" +
                    _oldMember.presence.game.name + "*\nWatch on " +
                    (_newMember.presence.game.url !== null ?
                    service.Service.shortLink(_newMember.presence.game.url) :
                    "N/A"));
            } catch (e) {
                console.log("Error: " + e);
            }
        }
    }
};
