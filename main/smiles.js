module.exports.getFlag = (country) => ':flag_' + country.toLowerCase() + ':';

module.exports.getWeatherIcon = (weather) => {
  const iconList = {
    '01d': ':sunny:',
    '01n': ':sunny:',
    '02d': ':partly_sunny:',
    '02n': ':partly_sunny:',
    '03d': ':white_sun_cloud:',
    '03n': ':white_sun_cloud:',
    '04d': ':cloud:',
    '04n': ':cloud:',
    '09d': ':cloud_rain:',
    '09n': ':cloud_rain:',
    '10d': ':white_sun_rain_cloud:',
    '10n': ':white_sun_rain_cloud:',
    '11d': ':thunder_cloud_rain:',
    '11n': ':thunder_cloud_rain:',
    '13d': ':cloud_snow:',
    '13n': ':cloud_snow:',
    '50d': ':fog:',
    '50n': ':fog:'
  };
  return iconList[weather] || ':sun_with_face:';
};
