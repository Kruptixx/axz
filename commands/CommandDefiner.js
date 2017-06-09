const constants = require('../misc/constants.json')
const config = require('../config.json')
const packageData = require('../package.json')
const commands = require('./commands.json')
const rules = require('../misc/rules.json')
const service = require('../main/service.js')
const smiles = require('../main/smiles.js')
const language = require('../lang/language.js')

module.exports.CommandDefiner = class {
  static commandParse (_msg, _client, _msgSession) {
    let fields = _msg.content.toLowerCase().split(constants.SPACE)
        // fields[0] - command
        // fields[1] - main parameter (not requared)
        // fields[2+] - additional parameters
    let pattern = new RegExp('^PREFIX[a-zA-Zа-яА-ЯёЁ]'.replace(/PREFIX/,
                                 config.prefix), 'gi')
    if (pattern.test(fields[0])) {
      switch (fields[0].substr(config.prefix.length,
                   fields[0].length - 1).toLowerCase()) {
        case commands.TEST: // this.Commands.TEST
          if (enoughArgs(fields.length - 1) &&
                  _msg.author.id === config.authorid) {
            _msg.channel.sendMessage(`Tested! Short info of ***` +
                      `${config.fullname}***\`\`\`Status:\nconnected\n` +
                      `${packageData.version}\ncurrent prefix - ${config.prefix}\n` +
                      `messages this session - ${_msgSession}\`\`\``)
          } else {
            _msg.channel.sendMessage(`${language.Language
                      .getPhrase('AvaliableCreator')}`)
          }
          break
        case commands.AUTHOR:
          if (enoughArgs(fields.length - 1)) {
            _msg.channel.sendMessage(packageData.author)
          } else {
            _msg.channel.sendMessage(`${language.Language
                      .getPhrase('ExampleCommand')} (` +
                      `${language.Language.getPhrase('NoArgs')})` +
                      `\`\`\`${config.prefix}${commands.AUTHOR}\`\`\``)
          }
          break
        case commands.SETGAME:
          if (_msg.author.id === config.authorid) {
            _client.user.setGame(_msg.content
                      .substr(config.prefix.length + commands.SETGAME.length +
                        1, _msg.content.length - 1))
          } else {
            _msg.channel.sendMessage(`${language.Language
                      .getPhrase('AvaliableCreator')}`)
          }
          break
        case commands.PLAYERS: // special mentions searcher
          if (enoughArgs(fields.length - 1, 1)) {
            if (_msg.mentions.roles.array().length === 1 &&
                      !_msg.mentions.everyone) {
              if (!_msg.mentions.roles.first().hoist) {
                _msg.channel.sendMessage('Last mentions:\n' +
                            lastMentions(_msg.mentions.roles.first(),
                                         _msg.channel))
              }
            }
          } else {
            _msg.channel.sendMessage(`${language.Language
                      .getPhrase('ExampleCommand')}\`\`\`` +
                      `${config.prefix}${commands.PLAYERS} @game\`\`\``)
          }
          break
        case commands.RULES:
          if (enoughArgs(fields.length - 1)) {
            _msg.member.sendMessage(`${language.Language
                      .getPhrase('RulesOf')} ***` +
                      `${_msg.guild.name}***\`\`\`${rules.rules.en}\`\`\``)
          } else {
            _msg.channel.sendMessage(`${language.Language
                      .getPhrase('ExampleCommand')} (` +
                      `${language.Language.getPhrase('NoArgs')})` +
                      `\`\`\`${config.prefix}${commands.RULES}\`\`\``)
          }
          break
        case commands.RULESTO:
                // dont work for @here
                // removed for remaking
          break
        case commands.WEATHER:
          if (fields[1] !== undefined) {
            weather()
          } else {
            _msg.channel.sendMessage(`${language.Language
                      .getPhrase('ExampleCommand')}\`\`\`${config.prefix}` +
                      `${commands.WEATHER} *city* *[, country]*\`\`\``)
          }
          break
        case commands.ROBOT:
          let strBin = ''
          let strRob = _msg.content.substr(config.prefix.length +
                                        commands.ROBOT.length + 1,
                                        _msg.content.length - 1)
          for (let i = 0; i < strRob.length; ++i) {
            strBin += strRob[i].charCodeAt(0).toString(2)
          }
          if (strBin.length < 2000) {
            _msg.channel.sendMessage(strBin)
          }
          break
        case commands.SAY:
          let strSay = _msg.content.substr(config.prefix.length +
                        commands.SAY.length + 1,
                        _msg.content.length - 1)
          _msg.guild.defaultChannel.sendMessage(strSay)
          break
        case commands.HELP:
          if (enoughArgs(fields.length - 1, 1)) {
            switch (fields[1]) {
              case commands.SAY:

                break
              case commands.WEATHER:

                break
              case commands.ROBOT:

                break
              case commands.RULES:

                break
              case commands.AUTHOR:

                break
              default:
                _msg.channel.sendMessage(`${language.Language
                          .getPhrase('NotACommand')}`)
            }
          }
                // work in progress
          break
        default:
          _msg.channel.sendMessage(`${language.Language
                  .getPhrase('NACommand')}! ` +
                  `${language.Language.getPhrase('TypeWRT')} ***` +
                  `${config.prefix}${commands.HELP}*** ${language.Language
                    .getPhrase('ForInfo')}`)
      }
    }

    function enoughArgs (_curNumber, _maxNumber = 0) {
      if (_curNumber !== _maxNumber) {
        return false
      }
      return true
    }

    function lastMentions (_thing, _channel, _times = 10) {
      let timesCounter = 0
      let str = ''
            // if (channel.messages !== null)
      for (let i = 1; i < _channel.messages.array().length; ++i) {
        console.log(_channel.messages.array().length)
        if (timesCounter < _times) {
          console.log(timesCounter)
          if (typeof thing === typeof _msg.guild.roles.first()) {
            if (_channel.messages.array()[i].mentions.roles.get(_thing.id) === _thing &&
                         _channel.messages.array()[i].author.id !== _client.user.id) {
              str += 'Author: ' +
                            _channel.messages.array()[i].author + ' | Date: ' +
                            _channel.messages.array()[i].createdAt.toDateString() +
                            '\n'
              timesCounter++
              continue
            }
            continue
          }
          if (typeof thing === typeof _msg.guild.users.first()) {
            if (_channel.messages.array()[i].mentions.users.get(_thing.id) === _thing &&
                         _channel.messages.array()[i].author.id !== _client.user.id) {
              str += 'Author: ' +
                            _channel.messages.array()[i].author + ' | Date: ' +
                            _channel.messages.array()[i].createdAt.toDateString() +
                            '\n'
              timesCounter++
            }
          }
        } else {
          return str
        }
      }
      if (str !== '') {
        return str
      }
      return 'No matches'
    }

    function weather () {
      let request = require('request')
      let cheerio = require('cheerio')
      let site = 'wunderground.com'
      request(`http://www.google.com/search?q=${_msg.content
              .substr(config.prefix.length + commands.WEATHER.length +
                1, _msg.content.length).replace(/\s/, '+')}` +
              `&as_sitesearch=${site}`,
              function (error, response, body) {
                console.log('statusCode:', response &&
                    response.statusCode)
                if (!error && body !== null) {
                  let $ = cheerio.load(body)
                  let links = $('.r a')

                  if (links[0] !== null && links[0] !== undefined) {
                    var url = $(links[0]).attr('href')
                    url = url.replace('/url?q=', '').split('&')[0]
                    request(url, function (suberror, subresponse, subbody) {
                      if (!error && body !== null && (new RegExp(`www.` + site + `/[a-zA-Z]{2}/([a-zA-Z]{2}/)?[a-zA-Z\\-]`, 'gi')).test(url)) {
                        console.log('SUBstatusCode:', subresponse && subresponse.statusCode)
                        let $page = cheerio.load(subbody)
                        let urlItems = service.Service.shortLink(url)
                                    .replace(`www.${site}/`, '').split('/')
                        let country = urlItems[0]
                        let city = urlItems[urlItems.length - 1]
                                    .replace('-', ' ') + ', '
                        city = city[0].toUpperCase() +
                                    city.substr(1, city.length)
                        let state = ''
                        if (urlItems.length === 3) {
                          state = urlItems[1] + ', '
                        }
                        let temperature = $page("[data-variable='temperature'] .wx-value")
                                    .html()
                        let tempFeels = $page("[data-variable='feelslike'] .wx-value")
                                    .html()
                        let tempUnit = $page("[data-variable='temperature'] .wx-unit")
                                    .html().replace('&nbsp;', '°')
                                    .replace('&#xB0;', '°')
                        let temperature1 = tempUnit === '°C'
                                   ? (Math.floor((parseInt(temperature) * 1.8 + 32)).toString() + '°F')
                                   : (Math.floor(((parseInt(temperature) - 32) / 1.8)).toString() + '°C')
                        let tempFeels1 = tempUnit === '°C'
                                   ? (Math.floor((parseInt(tempFeels) * 1.8 + 32)).toString() + '°F')
                                   : (Math.floor(((parseInt(tempFeels) - 32) / 1.8)).toString() + '°C')
                        let weather = $page("[data-variable='condition'] .wx-value")
                                    .html()
                        let humidity = $page("[data-variable='humidity'] .wx-value")
                                    .html()
                        let percip = $page('.percip-link')
                                    .html()
                        let wind = $page("[data-variable='wind_speed'] .wx-value")
                                    .html()

                        _msg.channel.sendMessage(`${language.Language.getPhrase('WeatherFor')} **${city}${state.toUpperCase()}${country.toUpperCase()}**` +
                                    ` ${smiles.Smiles.shortCountrySmile(country)}\n**${language.Language.getPhrase('Weather')}**: ` +
                                    `${weather} ${smiles.Smiles.weatherSmile(weather)}\n**${language.Language.getPhrase('Temperature')}**: ` +
                                    `${temperature}${tempUnit} | ${temperature1}\n**${language.Language.getPhrase('FeelsLike')}**: ` +
                                    `${tempFeels}${tempUnit} | ${tempFeels1}\n**${language.Language.getPhrase('WindSpeed')}**: ` +
                                    `${wind} km/h\n**${language.Language.getPhrase('Humidity')}**: ${humidity}%\n**` +
                                    `${language.Language.getPhrase('Precipitation')}**: ${percip}%`)
                                  // _client.on("message", (message) => {
                                  //     message.react(":hugging:");
                                  // });
                      } else {
                        console.log('suberror:', suberror)
                        _msg.channel.sendMessage(`${language.Language
                                    .getPhrase('NoResults')}`)
                      }
                    })
                  }
                } else {
                  console.log('error:', error)
                  _msg.channel.sendMessage(`${language.Language
                        .getPhrase('NoResults')}`)
                }
              })
    }
  }
}
