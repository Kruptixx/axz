const profanity = require('../misc/profanity.json');
const service = require('../main/service.js');
const language = require('../lang/language.js');

module.exports.AutoFunctions = class {
  static checkProfanity (msg, client) {
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
            )}: $lang[i]}`
          );
          return;
        }
      }
    }

    if (msg.author.id !== client.user.id && !msg.author.bot) {
      setLang(profanity.profanity.en);
      setLang(profanity.profanity.ru);
      setLang(profanity.profanity.de);
      setLang(profanity.profanity.fr);
      setLang(profanity.profanity.es);
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
