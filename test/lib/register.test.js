var register = require('../../lib/register')

describe('lib/register.js', function () {
    it('should throw if no event given', function () {
        expect(register.bind(register)).to.throw('No event given')
    })

    it('should throw if event is not a string', function () {
        expect(register.bind(register, 1234)).to.throw('Event given is invalid')
    })

    it('should throw if no work function given', function () {
        expect(register.bind(register, 'working')).to.throw('Work function given is invalid')
    })

    it('should throw if work function given is not a function', function () {
        expect(register.bind(register, 'working', 'notafunc')).to.throw('Work function given is invalid')
    })

    it('should accept being given just an event and a function', function () {
        expect(register.bind(register, 'working', function () {})).to.not.throw()
    })

    it('should allow any arg to be passed', function () {
        expect(register.bind(register, 'working', {"an":"arg"}, function () {})).to.not.throw()
    })
})