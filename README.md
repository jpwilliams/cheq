# cheq

[![Build Status](https://api.travis-ci.org/jpwilliams/cheq.svg)](https://travis-ci.org/jpwilliams/cheq) [![Coverage Status](https://coveralls.io/repos/github/jpwilliams/cheq/badge.svg?branch=master)](https://coveralls.io/github/jpwilliams/cheq?branch=master) [![Dependencies](https://img.shields.io/david/jpwilliams/cheq.svg)]()

```
cheq's a lovely little module
That helps with making sure
That variable A and connection B
Are always there for more

Whether they die from one big error
Or just simply time out
cheq's here to help them get back up
So there's no need to pout
```

## No but really

`cheq`'s small and provides a wee little interface to consistently regenerate something should it error or, well, anything really. Have an example.

``` js
var cheq = require('cheq')

cheq.register('db', function (done, retry) {
    mydb.getConnection(done)
    mydb.onError(retry)
})

cheq('db').doMyQuery()
cheq('db').saveMyData()
cheq('db').makeMeASandwich()
```

Nice and simple. The above example is making sure that the DB connection is there and working before we try to use it.

If the DB connection were to die, the connection would be created again and any calls to it would wait until the new connection was up before trying to use it.

## Just in case

Most database libraries worth their salt do have built in retrying and, for the most part, throwing an error and killing your application upon losing connection to a database is usually desired, so, like, don't go crazy and think you should use this for databases. *You probably shouldn't.*

I mostly use it for queuing up tasks for non-crucial data flows when conditions can be a bit more fluid than usual.

If you do come up with some crazy use case that this doesn't quite support, PR that thang!