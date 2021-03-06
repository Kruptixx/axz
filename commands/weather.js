const axios = require('axios');
const getFlag = require('../main/smiles').getFlag;
const getWeatherIcon = require('../main/smiles').getWeatherIcon;
const language = require('../lang/language.js');
const url = require('../config.json').weather.url;
const appid = require('../config.json').weather.appid;

module.exports.getWeather = city =>
  axios.get(url, { params: { appid, q: city } }).then(r => r.data);

const round = x => Math.round(x * 100) / 100;

const kelvinsToCelsius = k => round(k - 273.15);

const kelvinsToFahrenheit = k => round(k * 9 / 5 - 459.67);

module.exports.formatWeatherOutput = w =>
`${language.getPhrase('WeatherFor')} **${w.name}, ${w.sys.country}** ${getFlag(w.sys.country)}
**${language.getPhrase('Weather')}:**${w.weather.map(i => ' ' + i.description + ' ' + getWeatherIcon(i.icon))}
**${language.getPhrase('Temperature')}:** ${kelvinsToCelsius(w.main.temp)}°C | ${kelvinsToFahrenheit(w.main.temp)}°F
**${language.getPhrase('WindSpeed')}:** ${w.wind.speed} ${language.getPhrase('meter')}/${language.getPhrase('sec')}
**${language.getPhrase('Humidity')}:** ${w.main.humidity}%
**${language.getPhrase('Cloudiness')}:** ${w.clouds.all}%
**${language.getPhrase('AtmPressure')}:** ${w.main.pressure} ${language.getPhrase('hPa')}\n`;
