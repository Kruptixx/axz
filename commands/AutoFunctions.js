const profanity = require('../misc/profanity.json');
const service = require('../main/service.js');
const language = require('../lang/language.js');

module.exports.AutoFunctions = class {
  static checkProfanity (msg, client) {
    function passThroughtLangs () {
      function setLang (lang) {
        for (let i = 0; i < lang.length; ++i) {
          let patternStr =
            "(^|[0-9\\-!\\$%№\\^\\&\\*\\(\\)_\\+\\|~\\\"=\\'`\\{\\}\\[\\]:/;\\<\\>\\?,\\.@#]|\\s)SAMPLE([0-9\\-!\\$%№\\^\\&\\*\\(\\)_\\+\\|~\\\"=\\'`\\{\\}\\[\\]:/;\\<\\>\\?,\\.@#\\s]|$)";
          let pattern = new RegExp(patternStr.replace(/SAMPLE/, lang[i]), 'g');
          if (pattern.test(msg.content.toLowerCase())) {
            msg.channel.sendMessage(
              `${language.Language.getPhrase('Profanity')}!\n` +
              `${language.Language.getPhrase('Perpetrator')}: ` +
              `${msg.author} | ${language.Language.getPhrase('Time')}` +
              `: ${msg.createdAt} | ${language.Language.getPhrase(
                'ReasonWord'
              )}: ${lang[i]}`
            );
            return true;
          }
        }
        return false;
      }

      for (let i = 0; i < arguments.length; ++i) {
        if (setLang(arguments[i])) {
          return;
        }
      }
    }

    if (msg.author.id !== client.user.id && !msg.author.bot) {
      passThroughtLangs(
        profanity.profanity.en,
        profanity.profanity.ru,
        profanity.profanity.de,
        profanity.profanity.fr,
        profanity.profanity.es
      );
    }
  }

  static checkStream (oldMember, newMember) {
    if (
      newMember.presence.game !== null &&
      !newMember.user.bot &&
      oldMember.presence.game !== newMember.presence.game &&
      newMember.presence.game.streaming
    ) {
      try {
        newMember.guild.defaultChannel.sendMessage(
          `@here\n***` +
          `${language.Language.getPhrase('Stream').toUpperCase()}` +
          `***\n\n${newMember.user} ` +
          `${language.Language.getPhrase('StartedStreaming')} *` +
          `${newMember.presence.game.name}*\n` +
          `${language.Language.getPhrase('WatchOn')} ` +
          `${newMember.presence.game.url !== null
            ? service.Service.shortLink(newMember.presence.game.url)
            : 'N/A'}`
        );
      } catch (e) {
        console.log('Error: ' + e);
      }
    }
  }
};
