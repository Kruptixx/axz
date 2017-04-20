// just test | useless
var events = require("events");
exports.DateEvent = function(interval, caller_name) {
    this.interval = interval;
    this.caller_name = caller_name;
    this.goForvard = function() {
        var me = this;

        setInterval(function() {
            me.emit("everyHour", me.caller_name);
        }, me.interval);
    };
};
exports.DateEvent.prototype = new events.EventEmitter;
