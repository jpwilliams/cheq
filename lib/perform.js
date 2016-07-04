var debug = require('debug')('cheq:perform')
var EventEmitter = require('eventemitter3')

function perform (event, callback) {
    var self = perform

    if (!event) {
        throw new Error('No event given')
    }

    if (typeof event !== 'string') {
        throw new Error('Event given is invalid; must be a string')
    }

    if (typeof callback !== 'function') {
        throw new Error('Callback function given is invalid or missing')
    }

    debug('"' + event + '" triggered')

    if (self._events[event] && self._events[event].result) {
        debug('"' + event + '" fulfilled for 1 requester; was already present')

        return callback.apply(callback, self._events[event].result)
    }

    var done_code = '_done:' + event
    self._emitter.once(done_code, callback)

    self._emitter.emit(event, function done () {
        var requesters = self._emitter._events[done_code] ? (self._emitter._events[done_code].length || 1) : 0
        debug('"' + event + '" fulfilled for ' + requesters + ' requester' + ((requesters > 1 || requesters < 1) ? 's' : ''))

        self._events[event].result = Array.prototype.slice.call(arguments)
        self._emitter.emit.apply(self._emitter, [done_code].concat(self._events[event].result))
    }, function retry () {
        debug('"' + event + '" died; being retried')
        self._emitter.once(event, self._events[event].work)
        delete self._events[event].result
        perform(event, function () {})
    })
}

perform._events = {}
perform._emitter = new EventEmitter()
perform.register = require('./register')(perform)

module.exports = perform