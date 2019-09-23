const authRes = require('./auth')
const userRes = require('./user')

module.exports = {
    ...authRes,
    ...userRes
}
