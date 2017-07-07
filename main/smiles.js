module.exports.Smiles = class {
  static shortCountrySmile (country) {
    return ':flag_' + country.toLowerCase() + ':';
  }

  static weatherSmile (weather) {
    let smile = ':';
    switch (weather.toLowerCase()) {
      case 'sunny': case 'clear': case 'sun':
        smile += 'sunny';
        break;
      case 'rain': case 'rainy':
        smile += 'cloud_rain';
        break;
      case 'thunderstorm':
        smile += 'thunder_cloud_rain';
        break;
      case 'thunder':
        smile += 'cloud_lightning';
        break;
      case 'patches fog mist':
        smile += 'fog';
        break;
      case 'partly cloudy':
        smile += 'partly_sunny';
        break;
      case 'scattered clouds':
        smile += 'white_sun_small_cloud';
        break;
      case 'clouds': case 'mostly cloudy': case 'overcast':
        smile += 'cloud';
        break;
      case 'snow':
        smile += 'cloud_snow';
        break;
      default:
        smile += 'sun_with_face';
    }
    return smile + ':';
  }
};
