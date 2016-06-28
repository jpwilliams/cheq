function register (event, arg, work) {
    var self = this

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

    
}

module.exports = register