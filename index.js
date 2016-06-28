module.exports = (function () {
    console.log('Making instance of Cheq')

    return new require('./lib/cheq')
})()