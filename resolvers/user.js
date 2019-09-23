const { User } = require('../model')

module.exports = {

    users: async _ => await User.find()

}
