// just test | useless
var events = require('events')
exports.DateEvent = function (interval, callerName) {
  this.interval = interval
  this.callerName = callerName
  this.goForvard = function () {
    var me = this

    setInterval(function () {
      me.emit('everyHour', me.callerName)
    }, me.interval)
  }
}
exports.DateEvent.prototype = new events.EventEmitter()
