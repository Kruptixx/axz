const constants = require("../misc/constants.json");
const commands = require("./commands.json");

module.exports.CommandDefiner = class {

    static commandParse(string) {
        console.log(string);
        let fields = string.toLowerCase().split(constants.SPACE);
        // fields[0] - command
        // fields[1] - main parameter (not requared)
        // fields[2+] - additional parameters
        if (fields[0].length > 2 && fields[0].charAt(0) === "!" && fields[0].charAt(1) === "!") {
            switch(fields[0].substr(2, fields[0].length - 1)) {
            case commands.TEST: //this.Commands.TEST
                return "tested!";
            case commands.AUTHOR:
                return "Kruptixx";
            case commands.RULES:
                break;
            case commands.RULESTO:
                return "Rules sent to current user";
            default:
                return "No avaliable command";
            }
        }
    }
};
