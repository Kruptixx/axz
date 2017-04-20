


module.exports.Smiles = class {

    static countrySmile(_country) {
        let smile = ":flag_";

        switch (_country.toLowerCase()) {
        case "us": case "usa": case "united states":
            smile += "us:";
            break;
        case "ru": case "russia": case "russian federation":
            smile += "ru:";
            break;
        case "by": case "belarus": case "republic of belarus":
            smile += "by:";
            break;
        case "de": case "germany": case "federal republic of germany":
            smile += "de:";
            break;
        case "ua": case "ukraine":
            smile += "ua:";
            break;
        case "pl": case "poland": case "republic of poland":
            smile += "pl:";
            break;
        default:
            smile = ":rainbow_flag:";
        }
        return smile;
    }

    static shortCountrySmile(_country) {
        return ":flag_" + _country.toLowerCase() + ":";
    }

    static weatherSmile(_weather) {
        let smile = "";
        switch (_weather.toLowerCase()) {
        case "sunny": case "clear": case "sun":
            smile = ":sunny:";
            break;
        case "rain": case "rainy":
            smile = ":cloud_rain:";
            break;
        case "thunderstorm":
            smile = ":thunder_cloud_rain:";
            break;
        case "thunder":
            smile = ":cloud_lightning:";
            break;
        case "patches fog mist":
            smile = ":fog:";
            break;
        case "partly cloudy":
            smile = ":partly_sunny:";
            break;
        case "scattered clouds":
            smile = ":white_sun_small_cloud:";
            break;
        case "clouds": case "mostly cloudy": case "overcast":
            smile = ":cloud:";
            break;
        case "snow":
            smile = ":cloud_snow:";
            break;
        default:
            smile = ":sun_with_face:";
        }
        return smile;
    }
};
