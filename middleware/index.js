const jwt = require('jsonwebtoken')

module.exports = {

    auth: (req, res, next) => {

        const { authorization } = req.headers

        if (authorization) {

            jwt.verify(authorization, process.env.JWT_SECRET, (err, decoded) => {

                if (err || !decoded) {

                    req.authorized = false

                    return next()

                }

                req.authorized = true
                req.decoded = decoded

                next()

            })

        } else {

            req.authorized = false
            return next()

        }

    },

}
