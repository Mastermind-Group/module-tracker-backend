require('dotenv').config()

const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const gqlHttp = require('express-graphql')

const port = process.env.PORT || 5000

const server = express()
server.use(helmet())
server.use(morgan('dev'))
server.use(cors())
server.use(require('./middleware').auth)
server.use(express.json())

server.use('/graphql', gqlHttp({
    schema: require('./schema'),
    rootValue: require('./resolvers'),
    graphiql: true
}))

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@gqltest-dbk60.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(_ => server.listen(port, _ => console.log(`\n=============================\n Server running on port ${port} \n=============================\n`)))
    .catch(err => console.error(err))
