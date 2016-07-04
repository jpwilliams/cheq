var debug = require('debug')('cheq')

module.exports = (function () {
    debug('Cheq\'s being required')

    return require('./lib/cheq')
})()