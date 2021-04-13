const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
require('dotenv').config()

const schema = buildSchema(`
    # schema here
    type Test {
        message: String!
    }
`)

const root = {
    // resolvers here
}

const app = express()

// Define a route for GraphQL
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}))

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log('Server running on port:' + port)
})
