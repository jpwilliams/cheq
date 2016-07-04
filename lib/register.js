var debug = require('debug')('cheq:register')

var _emitter
var _events
var perform

function register (event, arg, work) {
    if (!event) {
        throw new Error('No event given')
    }

    if (typeof event !== 'string') {
        throw new Error('Event given is invalid; must be a string')
    }

    if (typeof work !== 'function') {
        if (typeof arg === 'function') {
            work = arg
            arg = undefined
        } else {
            throw new Error('Work function given is invalid or missing')
        }
    }

    if (_events[event]) {
        debug('Overwriting task: "' + event + '"')
    } else {
        debug('Registering new task: "' + event + '"')
    }

    _events[event] = {work: work}
    _emitter.once(event, _events[event].work)

    try {
        if (_emitter._events['_done:' + event]) {
            perform(event, function () {})
        }
    } catch (e) {}
}

module.exports = function (func) {
    perform = func
    _events = func._events
    _emitter = func._emitter

    return register 
}