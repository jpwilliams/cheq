var EventEmitter = require('eventemitter3')

function Cheq () {
    var ret = require('./perform')
    
    ret.register = require('./register')
    ret._events = {}
    ret._emitter = new EventEmitter()

    return ret
}

module.exports = (function () {
    return new Cheq()
})()