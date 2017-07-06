const profanity = require('../misc/profanity.json');
const service = require('../main/service.js');
const language = require('../lang/language.js');

module.exports.checkProfanity = (msg) => {
  function passThroughtLangs () {
    function setLang (lang) {
      for (let i = 0; i < lang.length; ++i) {
        let patternStr =
          "(^|[0-9\\-!\\$%№\\^\\&\\*\\(\\)_\\+\\|~\\\"=\\'`\\{\\}\\[\\]:/;\\<\\>\\?,\\.@#]|\\s)SAMPLE([0-9\\-!\\$%№\\^\\&\\*\\(\\)_\\+\\|~\\\"=\\'`\\{\\}\\[\\]:/;\\<\\>\\?,\\.@#\\s]|$)";
        let pattern = new RegExp(patternStr.replace(/SAMPLE/, lang[i]), 'g');
        if (pattern.test(msg.content.toLowerCase())) {
          msg.channel.sendMessage(
            `${language.getPhrase('Profanity')}!\n` +
            `${language.getPhrase('Perpetrator')}: ` +
            `${msg.author} | ${language.getPhrase('Time')}` +
            `: ${msg.createdAt} | ${language.getPhrase('ReasonWord')}:`+
            ` ${lang[i]}`);
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

  passThroughtLangs(
    profanity.profanity.en,
    profanity.profanity.ru,
    profanity.profanity.de,
    profanity.profanity.fr,
    profanity.profanity.es);
};

module.exports.checkStream = (oldMember, newMember) => {
  if (newMember.presence.game !== null &&
    !newMember.user.bot &&
    oldMember.presence.game !== newMember.presence.game &&
    newMember.presence.game.streaming) {
    try {
      newMember.guild.defaultChannel.sendMessage(
        `@here\n***` +
        `${language.getPhrase('Stream').toUpperCase()}` +
        `***\n\n${newMember.user} ` +
        `${language.getPhrase('StartedStreaming')} *` +
        `${newMember.presence.game.name}*\n` +
        `${language.getPhrase('WatchOn')} ` +
        `${newMember.presence.game.url !== null
          ? service.shortLink(newMember.presence.game.url)
          : 'N/A'}`);
    } catch (e) {
      console.log('Error: ' + e);
    }
  }
};
