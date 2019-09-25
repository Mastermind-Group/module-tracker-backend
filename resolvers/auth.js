const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../model')

module.exports = {

    createUser: async args => {

        try {

            if (args.inUser.username === undefined) throw new Error('Must have username')

            const check = await User.findOne({ username: args.inUser.username })

            if (check) {
                throw new Error(`'${args.inUser.username}' already exists. Please try logging in.`)
            }

            args.inUser.password = bcrypt.hashSync(args.inUser.password, 12)

            const user = new User({
                username: args.inUser.username,
                password: args.inUser.password
            })

            await user.save()

            const token = jwt.sign({
                _id: user.id,
                username: user.username
            }, process.env.JWT_SECRET, { expiresIn: '2h' })

            return {
                token,
                _id: user.id
            }

        } catch (err) {

            throw err

        }

    },

    login: async ({ username, password }) => {

        const user = await User.findOne({ username })

        if (!user || username === undefined) throw new Error(`'${username}' does not match a user in the database. Please try again.`)

        if (bcrypt.compareSync(password, user.password)) {

            const token = jwt.sign({
                _id: user.id,
                username: user.username
            }, process.env.JWT_SECRET, { expiresIn: '2h' })

            return {
                token,
                _id: user.id
            }

        } else throw new Error('Invalid credentials. Please try again.')

    },

}
