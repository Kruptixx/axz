const axios = require('axios');
const url = require('../config.json').weather.url;
const appid = require('../config.json').weather.appid;

module.exports.getWeather = q =>
  axios.get(url, { params: { appid, q } }).then(r => r.data);
