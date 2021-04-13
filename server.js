const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const fetch = require('node-fetch')
require('dotenv').config()

const schema = buildSchema(`
    enum Units {
        standard
        metric
        imperial
    }
    type Weather {
        temperature: Float!
        description: String!
        feels_like: Float!
        temp_min: Float!
        temp_max: Float!
        pressure: Float!
        humidity: Float!
    }

    type Query {
        getWeather(zip: Int!, units: Units): Weather!
    }
`)

const root = {
    getWeather: async ({ zip, units = 'imperial' }) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?zip=${ zip }&appid=${ process.env.OPENWEATHERMAP_API_KEY }&units=${ units }`
        const res = await fetch(url)
        const json = await res.json()
        return {
            temperature: json.main.temp,
            description: json.weather[0].description,
            feels_like: json.main.feels_like,
            temp_min: json.main.temp_min,
            temp_max: json.main.temp_max,
            pressure: json.main.pressure,
            humidity: json.main.humidity
        }
    }
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
    console.log('Server running on port: ' + port)
})
