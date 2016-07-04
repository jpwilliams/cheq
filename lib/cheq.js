var EventEmitter = require('eventemitter3')

function Cheq () {
    return require('./perform')
}

module.exports = (function () {
    return Cheq()
})()