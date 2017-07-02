const profanity = require('../misc/profanity.json')
const service = require('../main/service.js')
const language = require('../lang/language.js')

module.exports.AutoFunctions = class {
  static checkProfanity (_msg, _client) {
    function _setLang (_lang) {
      for (let i = 0; i < _lang.length; ++i) {
        let patternStr =
          "(^|[0-9\\-!\\$%№\\^\\&\\*\\(\\)_\\+\\|~\\\"=\\'`\\{\\}\\[\\]:/;\\<\\>\\?,\\.@#]|\\s)SAMPLE([0-9\\-!\\$%№\\^\\&\\*\\(\\)_\\+\\|~\\\"=\\'`\\{\\}\\[\\]:/;\\<\\>\\?,\\.@#\\s]|$)"
        let pattern = new RegExp(patternStr.replace(/SAMPLE/, _lang[i]), 'g') // "gi"
        if (pattern.test(_msg.content.toLowerCase())) {
          _msg.channel.sendMessage(
            `${language.Language.getPhrase('Profanity')}!\n` +
            `${language.Language.getPhrase('Perpetrator')}: ` +
            `${_msg.author} | ${language.Language.getPhrase('Time')}` +
            `: ${_msg.createdAt} | ${language.Language.getPhrase(
              'ReasonWord'
            )}: ${_lang[i]}`
          )
          return
        }
      }
    }

    if (_msg.author.id !== _client.user.id && !_msg.author.bot) {
      _setLang(profanity.profanity.en)
      _setLang(profanity.profanity.ru)
      _setLang(profanity.profanity.de)
      _setLang(profanity.profanity.fr)
      _setLang(profanity.profanity.es)
    }
  }

  static checkStream (_oldMember, _newMember) {
    if (
      _newMember.presence.game !== null &&
      !_newMember.user.bot &&
      _oldMember.presence.game !== _newMember.presence.game &&
      _newMember.presence.game.streaming
    ) {
      try {
        _newMember.guild.defaultChannel.sendMessage(
          `@here\n***` +
          `${language.Language.getPhrase('Stream').toUpperCase()}` +
          `***\n\n${_newMember.user} ` +
          `${language.Language.getPhrase('StartedStreaming')} *` +
          `${_newMember.presence.game.name}*\n` +
          `${language.Language.getPhrase('WatchOn')} ` +
          `${_newMember.presence.game.url !== null
            ? service.Service.shortLink(_newMember.presence.game.url)
            : 'N/A'}`
        )
      } catch (e) {
        console.log('Error: ' + e)
      }
    }
  }
}
