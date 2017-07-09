const axios = require('axios');
const getFlag = require('../main/smiles').getFlag;
const getWeatherIcon = require('../main/smiles').getWeatherIcon;
const url = require('../config.json').weather.url;
const appid = require('../config.json').weather.appid;

module.exports.getWeather = city =>
  axios.get(url, { params: { appid, q: city } }).then(r => r.data);

const round = x => Math.round(x * 100) / 100;

const kelvinsToCelsius = k => round(k - 273.15);

const kelvinsToFahrenheit = k => round(k * 9 / 5 - 459.67);

module.exports.formatWeatherOutput = w =>
`Weather for **${w.name}, ${w.sys.country}** ${getFlag(w.sys.country)}
**Weather:**${w.weather.map(i => ' ' + i.description + ' ' + getWeatherIcon(i.icon))}
**Temperature:** ${kelvinsToCelsius(w.main.temp)}°C | ${kelvinsToFahrenheit(w.main.temp)}°F
**Wind speed:** ${w.wind.speed} meter/sec
**Humidity:** ${w.main.humidity}%
**Cloudiness:** ${w.clouds.all}%
**Atmospheric pressure:** ${w.main.pressure} hPa`;
