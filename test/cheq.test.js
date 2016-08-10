var cheq = require('../index')
var async = require('async')

describe('Cheq', function () {
    it('should expose the cheq function', function () {
        expect(cheq).to.be.a('function')
    })

    it('should expose thre register function', function () {
        expect(cheq.register).to.be.a('function')
    })

    describe('Registering', function () {
        it('should throw if no event given', function () {
            expect(cheq.register.bind(this)).to.throw('No event given')
        })

        it('should throw if event is not a string', function () {
            expect(cheq.register.bind(this, 1234)).to.throw('Event given is invalid')
        })

        it('should throw if no work function given', function () {
            expect(cheq.register.bind(this, 'working')).to.throw('Work function given is invalid')
        })

        it('should throw if work function given is not a function', function () {
            expect(cheq.register.bind(this, 'working', 'notafunc')).to.throw('Work function given is invalid')
        })

        it('should accept being given just an event and a function', function () {
            expect(cheq.register.bind(this, 'working', function () {})).to.not.throw()
        })

        it('should allow any arg to be passed', function () {
            expect(cheq.register.bind(this, 'working', {"an":"arg"}, function () {})).to.not.throw()
        })
    })

    describe('Usage', function () {
        it('should throw if no event given', function () {
            expect(cheq.bind(this)).to.throw('No event given')
        })

        it('should throw if event is not a string', function () {
            expect(cheq.bind(this, 1234)).to.throw('Event given is invalid')
        })

        it('should throw if no work function given', function () {
            expect(cheq.bind(this, 'working')).to.throw('Callback function given is invalid')
        })

        it('should throw if work function given is not a function', function () {
            expect(cheq.bind(this, 'working', 'notafunc')).to.throw('Callback function given is invalid')
        })

        it('should accept being given just an event and a function', function () {
            expect(cheq.bind(this, 'working', function () {})).to.not.throw()
        })

        it('should return the {"foo":"bar"} object to both callbacks', function (done) {
            var counter = 0

            function foo (next) {
                cheq('test', function (err, obj) {
                    expect(err).to.equal(null)
                    expect(obj).to.be.an('object')
                    expect(obj).to.include.keys('foo')
                    expect(obj.foo).to.equal('bar')

                    counter = counter + 1

                    return next()
                })
            }

            cheq.register('test', function (done) {
                setTimeout(function () {
                    return done(null, {foo: 'bar'})
                })
            })

            async.parallel([foo, foo], function () {
                expect(counter).to.equal(2)

                return done()
            })
        })

        it('should increment the counter to three after retrying', function (done) {
            this.slow(1000)
            var counter = 0

            function foo (next) {
                cheq('test2', function (err, obj) {
                    expect(err).to.equal(null)
                    expect(obj).to.be.an('object')
                    expect(obj).to.include.keys('foo')
                    expect(obj.foo).to.equal('bar')

                    counter = counter + 1

                    return next()
                })
            }

            cheq.register('test2', function (done, retry) {
                setTimeout(function () {
                    return done(null, {foo: 'bar'})
                }, 50)

                if (counter === 0) {
                    setTimeout(function () {
                        return retry()
                    }, 100)
                }
            })

            async.parallel([
                function (next) {
                    setTimeout(function () {
                        foo(next)
                    })
                },

                function (next) {
                    setTimeout(function () {
                        foo(next)
                    }, 75)
                },

                function (next) {
                    setTimeout(function () {
                        foo(next)
                    }, 125)
                }
            ], function () {
                expect(counter).to.equal(3)

                return done()
            })
        })

        it('should run as normal if register added after call', function (done) {
            cheq('test3', function (err, obj) {
                expect(err).to.equal(null)
                expect(obj).to.be.an('object')
                expect(obj).to.include.keys('foo')
                expect(obj.foo).to.equal('bar')

                return done()
            })

            setTimeout(function () {
                cheq.register('test3', function (done) {
                    return done(null, {foo: 'bar'})
                })
            }, 50)
        })
    })
})